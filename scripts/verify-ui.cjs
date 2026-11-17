const fs = require("fs");
const path = require("path");
const cp = require("child_process");
const assert = require("assert/strict");

const os = require("os");
const base = process.argv[2] || "http://127.0.0.1:8080";
const output = process.argv[3] || path.join(os.tmpdir(), "alorferi-ui-results.json");
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "alorferi-chrome-"));
const chromeBin =
    process.env.CHROME_BIN ||
    [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/usr/bin/google-chrome",
        "/usr/bin/chromium",
        "/usr/bin/chromium-browser",
    ].find((p) => fs.existsSync(p));
if (!chromeBin) throw new Error("Install Chrome or set CHROME_BIN.");
const chrome = cp.spawn(
    chromeBin,
    [
        "--headless=new",
        "--no-first-run",
        "--no-default-browser-check",
        "--disable-background-networking",
        "--disable-sync",
        "--remote-debugging-port=0",
        "--remote-debugging-address=127.0.0.1",
        "--user-data-dir=" + profile,
        "about:blank",
    ],
    { stdio: ["ignore", "ignore", "pipe"] }
);
let chromeErrors = "";
chrome.stderr.on("data", (x) => (chromeErrors += x));
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
let socket;
const results = [];
const errors = [];
const warnings = [];
const requests = [];
const redirects = [];
let canceledInterceptions = 0;
const company = {
    about: "https://about.alorferi.com/",
    careers: "https://about.alorferi.com/careers",
    contact: "https://about.alorferi.com/contact",
};
let scenario = { login: "ok", profile: "ok", registration: "ok" };
let requestStart = 0;
const heldProfiles = [];
const fixturePassword = "Reader-Test-Only-92";
const user = {
    surname: "Fixture",
    nickname: "",
    gender: "o",
    dob: "1990-01-01",
    id: 987654,
    first_name: "Recovery",
    last_name: "Fixture",
    name: "Recovery Fixture",
    username: "recovery-fixture",
    photo_url: null,
    cover_photo_url: null,
};
const fixtureLibrary = {
    id: 765432,
    name: "Cleanup Fixture Library",
    unique_name: "cleanup-fixture-library",
    about: "A library kept working after unused-file cleanup.",
    email: "library@example.test",
    phone: "",
    mobile: "",
    post_code: "",
    founded_at: "2020-01-01",
    govt_reg_no: "",
    total_books: 1,
    total_members: 1,
    total_regular_news_papers: 0,
    total_regular_magazines: 0,
    opening_time_at: "09:00",
    closing_time_at: "17:00",
    logo_url: null,
    address: { house: "", village: "Fixture Village", police_station: null, district: null, post_code: null },
};
const fixtureReader = { ...user, id: 987655, first_name: "Cleanup", surname: "Reader", name: "Cleanup Reader" };
const fixtureMember = {
    id: 4567,
    library_id: fixtureLibrary.id,
    user_id: user.id,
    first_name: "Cleanup",
    surname: "Member",
    nickname: "",
    photo_url: null,
    member_code: "MEMBER-CLEANUP-1",
    total_reading_books: 0,
    total_has_read_books: 1,
    roles: [],
};
const fixtureCourse = {
    id: 12345,
    title: "Fixture Training",
    slug: "fixture-training",
    image_url: "/fixture-course.png",
    pre_title: "Learn together",
    post_title: "A training course",
    color_background: "#f8f9fa",
    color_title: "#343a40",
    color_subtitle: "#6c757d",
    discount: 0,
    starts_at: "2030-01-01",
    days_and_time: "Saturday 10:00",
    actual_fee: 0,
    list_fee: 0,
    duration: 1,
};
const paginated = (data) => ({
    data,
    links: null,
    meta: {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: data.length,
        from: data.length ? 1 : null,
        to: data.length,
    },
});
async function main() {
    let port;
    for (let i = 0; i < 100; i++) {
        try {
            port = fs.readFileSync(path.join(profile, "DevToolsActivePort"), "utf8").split("\n")[0];
            break;
        } catch {}
        if (chrome.exitCode !== null) throw new Error("Chrome exited: " + chromeErrors.slice(-1500));
        await delay(100);
    }
    if (!port) throw new Error("Chrome debugging port unavailable: " + chromeErrors.slice(-1500));
    const targets = await (await fetch("http://127.0.0.1:" + port + "/json/list")).json();
    const target = targets.find((x) => x.type === "page");
    socket = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
        socket.onopen = resolve;
        socket.onerror = reject;
    });
    let sequence = 0;
    let loadCount = 0;
    const pending = new Map();
    function send(method, params = {}) {
        const id = ++sequence;
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                pending.delete(id);
                reject(new Error("CDP timeout: " + method));
            }, 30000);
            pending.set(id, { resolve, reject, timeout });
            socket.send(JSON.stringify({ id, method, params }));
        });
    }
    async function replyApi(requestId, status, body) {
        try {
            await send("Fetch.fulfillRequest", {
                requestId,
                responseCode: status,
                responseHeaders: [
                    { name: "Content-Type", value: "application/json" },
                    { name: "Access-Control-Allow-Origin", value: new URL(base).origin },
                    {
                        name: "Access-Control-Allow-Headers",
                        value: "authorization,content-type,ot-code,x-requested-with",
                    },
                    { name: "Access-Control-Allow-Methods", value: "GET,POST,PUT,PATCH,DELETE,OPTIONS" },
                ],
                body: status === 204 ? "" : Buffer.from(JSON.stringify(body)).toString("base64"),
            });
        } catch (e) {
            if (!e.message.includes("Invalid InterceptionId.")) throw e;
        }
    }
    socket.onmessage = async (event) => {
        const message = JSON.parse(event.data);
        if (message.method === "Page.loadEventFired") loadCount++;
        if (message.id) {
            const p = pending.get(message.id);
            if (!p) return;
            clearTimeout(p.timeout);
            pending.delete(message.id);
            if (message.error) p.reject(new Error(JSON.stringify(message.error)));
            else p.resolve(message.result);
            return;
        }
        if (message.method === "Runtime.exceptionThrown")
            errors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
        if (message.method === "Runtime.consoleAPICalled" && ["error", "warning"].includes(message.params.type)) {
            warnings.push(message.params.args.map((a) => a.value || a.description).join(" "));
        }
        if (message.method === "Fetch.requestPaused") {
            const { requestId, request, resourceType } = message.params;
            try {
                if (
                    (["XHR", "Fetch"].includes(resourceType) || request.method === "OPTIONS") &&
                    request.url.includes("/api/")
                ) {
                    const pathname = new URL(request.url).pathname;
                    const header = (name) =>
                        Object.entries(request.headers).find(([key]) => key.toLowerCase() === name)?.[1];
                    const data = request.postData && request.method !== "OPTIONS" ? JSON.parse(request.postData) : null;
                    requests.push({
                        path: pathname,
                        method: request.method,
                        data: data ? { ...data, password: data.password ? "[redacted]" : undefined } : null,
                        code: header("ot-code"),
                        authorization: header("authorization"),
                    });
                    if (request.method === "OPTIONS") return await replyApi(requestId, 204, null);
                    if (pathname.endsWith("/api/auth/login")) {
                        if (scenario.login === "network")
                            return await send("Fetch.failRequest", { requestId, errorReason: "ConnectionFailed" });
                        if (scenario.login === "invalid")
                            return await replyApi(requestId, 401, { error: "invalid_grant" });
                        if (scenario.login === "fields")
                            return await replyApi(requestId, 422, {
                                errors: { username: ["This account could not be found."] },
                            });
                        if (scenario.login === "rate") return await replyApi(requestId, 429, { message: "Slow down" });
                        return await replyApi(requestId, 200, { data: { token: "reader-fixture-token" } });
                    }
                    if (pathname.endsWith("/api/auth/me")) {
                        if (scenario.profile === "hold") {
                            heldProfiles.push(requestId);
                            return;
                        }
                        if (scenario.profile === "fail")
                            return await replyApi(requestId, 503, { message: "Fixture profile unavailable" });
                        return await replyApi(requestId, 200, { data: { attributes: user } });
                    }
                    if (pathname.endsWith("/api/auth/register-with-username")) {
                        if (scenario.registration === "fields")
                            return await replyApi(requestId, 422, {
                                errors: { username: ["This email is already registered."] },
                            });
                        if (scenario.registration === "otc") {
                            if (header("ot-code") === "012345") return await replyApi(requestId, 200, { status: "OK" });
                            return await replyApi(requestId, 200, {
                                status: header("ot-code") ? "OTC_REJECTED" : "OTC_GENERATED",
                                data: { otc_expired_after_in_seconds: header("ot-code") ? 1 : 30 },
                            });
                        }
                        return await replyApi(requestId, 200, { status: "OK" });
                    }
                    if (scenario.course && pathname === "/api/courses")
                        return await replyApi(requestId, 200, paginated([fixtureCourse]));
                    if (scenario.course && pathname === "/api/courses/" + fixtureCourse.id)
                        return await replyApi(requestId, 200, { data: fixtureCourse });
                    if (scenario.course && pathname === "/api/my-course-orders/" + fixtureCourse.id)
                        return await replyApi(requestId, 404, { message: "Not enrolled" });
                    if (scenario.course && pathname === "/api/my-course-orders" && request.method === "POST")
                        return await replyApi(requestId, 200, { message: "Fixture application accepted." });
                    if (pathname === "/api/libraries/" + fixtureLibrary.id)
                        return await replyApi(requestId, 200, { data: { attributes: fixtureLibrary } });
                    if (pathname === "/api/users/" + fixtureReader.id)
                        return await replyApi(requestId, 200, { data: { attributes: fixtureReader } });
                    if (pathname.endsWith("/members/my-membership"))
                        return await replyApi(requestId, 200, { data: { attributes: fixtureMember } });
                    if (pathname.endsWith("/member-requests/my-request") || pathname.endsWith("/following-by-me"))
                        return await replyApi(requestId, 200, { data: { attributes: null } });
                    if (pathname === "/api/libraries/" + fixtureLibrary.id + "/books")
                        return await replyApi(
                            requestId,
                            200,
                            paginated([
                                {
                                    id: 321,
                                    attributes: {
                                        id: 321,
                                        book_code: "BOOK-CLEANUP-1",
                                        shelf_number: null,
                                        box_number: null,
                                        book: {
                                            title: "The Cleanup Reader",
                                            cover_url: "/fixture-cover.png",
                                            authors: [{ name: "Fixture Author" }],
                                        },
                                    },
                                },
                            ])
                        );
                    if (pathname === "/api/libraries/" + fixtureLibrary.id + "/members")
                        return await replyApi(
                            requestId,
                            200,
                            paginated([{ id: fixtureMember.id, attributes: fixtureMember }])
                        );
                    if (pathname === "/api/libraries")
                        return await replyApi(
                            requestId,
                            200,
                            paginated([{ id: fixtureLibrary.id, attributes: fixtureLibrary }])
                        );
                    if (pathname === "/api/users")
                        return await replyApi(
                            requestId,
                            200,
                            paginated([{ id: fixtureReader.id, attributes: fixtureReader }])
                        );
                    return await replyApi(requestId, 200, paginated([]));
                } else if (resourceType === "Image" && new URL(request.url).origin !== new URL(base).origin) {
                    await send("Fetch.fulfillRequest", {
                        requestId,
                        responseCode: 200,
                        responseHeaders: [{ name: "Content-Type", value: "image/png" }],
                        body: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=",
                    });
                } else if (
                    resourceType === "Document" &&
                    new URL(request.url).origin === "https://about.alorferi.com"
                ) {
                    redirects.push(request.url);
                    await send("Fetch.fulfillRequest", {
                        requestId,
                        responseCode: 200,
                        responseHeaders: [{ name: "Content-Type", value: "text/html" }],
                        body: Buffer.from(
                            "<!doctype html><title>Company destination fixture</title><h1>Company destination fixture</h1>"
                        ).toString("base64"),
                    });
                } else if (/^https?:/.test(request.url) && new URL(request.url).origin !== new URL(base).origin) {
                    await send("Fetch.failRequest", { requestId, errorReason: "BlockedByClient" });
                } else await send("Fetch.continueRequest", { requestId });
            } catch (e) {
                if (e.message.includes("Invalid InterceptionId.")) canceledInterceptions++;
                else errors.push("Interception: " + e.message);
            }
        }
    };
    await send("Page.enable");
    await send("Runtime.enable");
    await send("Fetch.enable", { patterns: [{ urlPattern: "*" }] });
    const evaluate = async (expression) => {
        const result = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
        if (result.exceptionDetails)
            throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
        return result.result.value;
    };
    async function waitFor(expression, label) {
        for (let i = 0; i < 100; i++) {
            try {
                if (await evaluate("Boolean(" + expression + ")")) return;
            } catch {}
            await delay(100);
        }
        throw new Error(
            "Timeout waiting for " +
                label +
                ": " +
                JSON.stringify(
                    await evaluate(
                        "({url:location.href,title:document.title,body:document.body?.innerText.slice(0,1500),app:document.querySelector('#app')?.outerHTML.slice(0,500),scripts:[...document.scripts].map(s=>s.src)})"
                    )
                )
        );
    }
    async function check(name, fn) {
        await fn();
        results.push({ name, passed: true });
        console.log("PASS " + name);
    }
    async function reloadPage() {
        const before = loadCount;
        await send("Page.reload");
        for (let i = 0; i < 100; i++) {
            if (loadCount > before) return;
            await delay(100);
        }
        throw new Error("Page reload did not finish");
    }
    const app = "document.querySelector('#app').__vue__";
    const count = (suffix, method = "POST") =>
        requests.slice(requestStart).filter((r) => r.path.endsWith(suffix) && r.method === method).length;
    async function navigate(url) {
        const before = loadCount;
        await send("Page.navigate", { url });
        for (let i = 0; i < 150 && loadCount <= before; i++) await delay(100);
        await waitFor("document.querySelector('#app')?.__vue__", "Vue mount");
    }
    async function reset(overrides = {}, query = "") {
        scenario = { login: "ok", profile: "ok", registration: "ok", ...overrides };
        const injected = await send("Page.addScriptToEvaluateOnNewDocument", { source: "localStorage.clear();" });
        await navigate(base + "/" + query);
        await send("Page.removeScriptToEvaluateOnNewDocument", { identifier: injected.identifier });
        await waitFor("document.querySelector('#app').classList.contains('reader-auth-active')", "visitor shell");
        requestStart = requests.length;
    }
    async function resize(width, height = 1000) {
        await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 });
        await delay(100);
    }
    async function screenshot(name) {
        const { cssContentSize } = await send("Page.getLayoutMetrics");
        const r = await send("Page.captureScreenshot", {
            format: "png",
            captureBeyondViewport: true,
            clip: { x: 0, y: 0, width: cssContentSize.width, height: Math.min(cssContentSize.height, 2500), scale: 1 },
        });
        fs.writeFileSync(output.replace(/\.json$/, "-" + name + ".png"), Buffer.from(r.data, "base64"));
    }
    async function setInputs(values) {
        await evaluate(
            `(() => { for(const [id,value] of Object.entries(${JSON.stringify(
                values
            )})) { const e=document.getElementById(id); e.value=value; e.dispatchEvent(new Event(e.tagName==='SELECT'?'change':'input',{bubbles:true})); } })()`
        );
    }
    async function loginValues() {
        await setInputs({ "reader-login-username": "reader@example.test", "reader-login-password": fixturePassword });
    }
    async function signupValues() {
        await openSignup();
        await setInputs({
            "reader-first-name": "Reader",
            "reader-last-name": "Fixture",
            "reader-signup-username": "new-reader@example.test",
            "reader-signup-password": fixturePassword,
            "reader-dob": "1998-06-12",
            "reader-gender": "o",
        });
    }
    const submitLogin = () => evaluate("document.querySelector('.reader-login-card form').requestSubmit()");
    const submitSignup = () => evaluate("document.querySelector('.reader-register-card form').requestSubmit()");
    async function waitFeed() {
        await waitFor(
            "!document.querySelector('.reader-page') && document.querySelector('#navbarDropdown') && document.body.innerText.includes('No discussion found.')",
            "fresh authenticated feed"
        );
        assert.equal(await evaluate(app + ".$store.getters.activeUser.id"), user.id);
        assert.equal(await evaluate("document.querySelector('#app').classList.contains('reader-auth-active')"), false);
    }
    async function openSignup() {
        if (await evaluate("!!document.querySelector('.reader-register-card')")) return;
        await evaluate("document.querySelector('.reader-create-button').click()");
        await waitFor(
            "location.pathname === '/register' && document.querySelector('#reader-first-name') && document.querySelector('#app').classList.contains('reader-auth-active')",
            "separate signup page"
        );
    }
    if (!process.env.UI_SMOKE_ONLY) {
        await reset();
        await resize(1440, 900);
        await check("warm library homepage preserves its design and places signup below login", async () => {
            assert.equal(await evaluate("document.documentElement.lang"), "en");
            assert.match(await evaluate("document.querySelector('h1').innerText"), /Where readers/);
            assert.match(
                await evaluate("document.querySelector('.reader-story').innerText"),
                /library-based social network/i
            );
            assert.equal(
                await evaluate("getComputedStyle(document.querySelector('.reader-page')).backgroundColor"),
                "rgb(247, 244, 236)"
            );
            assert.equal(await evaluate("!!document.querySelector('.reader-art svg')"), true);
            assert.match(await evaluate("document.querySelector('.reader-card h2').innerText"), /Welcome back, reader/);
            const placement = await evaluate(
                "(() => {const login=document.querySelector('.reader-submit').getBoundingClientRect(),create=document.querySelector('.reader-create-button').getBoundingClientRect();return {gap:create.y-login.bottom,diff:Math.abs(create.width-login.width),text:document.querySelector('.reader-submit').innerText};})()"
            );
            assert(placement.gap >= 10 && placement.gap <= 16);
            assert(placement.diff < 1);
            assert.match(placement.text, /Log in to your community/);
            assert.equal(await evaluate("getComputedStyle(document.querySelector('#app > nav')).display"), "none");
            assert.equal(await evaluate("getComputedStyle(document.querySelector('.app-footer')).display"), "none");
            assert.equal(
                await evaluate("!!document.querySelector('.reader-page [role=tablist],#reader-first-name')"),
                false
            );
            assert.equal(
                await evaluate("document.querySelector('meta[name=viewport]').content.includes('user-scalable=no')"),
                false
            );
            assert.equal(
                await evaluate("document.querySelector('.reader-create-button').getAttribute('href')"),
                "/register"
            );
            await screenshot("desktop-login");
        });
        await check("responsive separate login/signup pages at 320, 360, 390, 768, 1024 and 1440 pixels", async () => {
            for (const width of [320, 360, 390, 768, 1024, 1440]) {
                await resize(width, width < 800 ? 844 : 900);
                for (const mode of ["login", "signup"]) {
                    if (mode === "login") {
                        if (await evaluate("location.pathname !== '/'"))
                            await evaluate("void " + app + ".$router.push({name:'home'})");
                        await waitFor("document.querySelector('.reader-login-card')", "login layout");
                    } else await openSignup();
                    const layout = await evaluate(
                        `(() => {const card=document.querySelector('.reader-card').getBoundingClientRect(),story=document.querySelector('.reader-story')?.getBoundingClientRect();return {width:innerWidth,overflow:document.documentElement.scrollWidth-innerWidth,card:{x:card.x,y:card.y,right:card.right,bottom:card.bottom},story:story&&{x:story.x,bottom:story.bottom}};})()`
                    );
                    assert(layout.overflow <= 1, `${width}/${mode}: horizontal overflow ${layout.overflow}`);
                    assert(layout.card.x >= 0 && layout.card.right <= layout.width + 1);
                    if (mode === "login") {
                        if (width <= 959) assert(layout.card.y >= layout.story.bottom);
                        else assert(layout.story.x < layout.card.x);
                        assert(await evaluate("!!document.querySelector('.reader-art svg')"));
                        if (width <= 959)
                            assert(
                                await evaluate(
                                    "document.querySelector('.reader-art').getBoundingClientRect().y >= document.querySelector('.reader-login-card').getBoundingClientRect().bottom"
                                )
                            );
                    }
                }
            }
            await screenshot("desktop-signup");
            await resize(390, 844);
            await screenshot("mobile-signup");
            await evaluate("document.querySelector('.reader-account-link a').click()");
            await waitFor("document.querySelector('.reader-login-card')", "back to login");
            await screenshot("mobile-login");
        });
        await check("signup navigation, direct refresh, browser back and keyboard controls work", async () => {
            await reset({}, "?from=%2Fcourses");
            await evaluate("document.querySelector('.reader-create-button').focus()");
            await send("Input.dispatchKeyEvent", {
                type: "keyDown",
                key: "Enter",
                code: "Enter",
                windowsVirtualKeyCode: 13,
            });
            await send("Input.dispatchKeyEvent", {
                type: "keyUp",
                key: "Enter",
                code: "Enter",
                windowsVirtualKeyCode: 13,
            });
            await waitFor(
                "location.pathname === '/register' && document.querySelector('#reader-first-name')",
                "keyboard signup navigation"
            );
            assert.equal(await evaluate("new URL(location.href).searchParams.get('from')"), "/courses");
            await reloadPage();
            await waitFor("document.querySelector('.reader-register-card')", "direct signup refresh");
            assert.equal(await evaluate("document.querySelector('#reader-dob').value"), "");
            assert.equal(
                await evaluate(
                    "[...document.querySelectorAll('.reader-page input,.reader-page select')].every(e=>e.labels.length>0)"
                ),
                true
            );
            assert.equal(
                await evaluate("document.querySelector('#reader-signup-password').autocomplete"),
                "new-password"
            );
            assert.equal(await evaluate("document.querySelector('.reader-privacy-note a').target"), "_blank");
            await evaluate("document.querySelector('[aria-controls=reader-signup-password]').click()");
            assert.equal(await evaluate("document.querySelector('#reader-signup-password').type"), "text");
            await evaluate("document.querySelector('.reader-account-link a').click()");
            await waitFor("document.querySelector('.reader-login-card')", "existing account link");
            assert.equal(await evaluate("new URL(location.href).searchParams.get('from')"), "/courses");
            await evaluate("document.querySelector('[aria-controls=reader-login-password]').click()");
            assert.equal(await evaluate("document.querySelector('#reader-login-password').type"), "text");
            await evaluate("history.back()");
            await waitFor(
                "location.pathname === '/register' && document.querySelector('.reader-register-card')",
                "browser back"
            );
        });
        await check("Bengali language is shared between auth pages and survives refresh", async () => {
            await reset();
            await evaluate("document.querySelector('.reader-language button[lang=bn]').click()");
            await waitFor("document.documentElement.lang === 'bn'", "Bengali homepage");
            assert.match(await evaluate("document.querySelector('.reader-story').innerText"), /পাঠাগারভিত্তিক/);
            await screenshot("mobile-bengali-login");
            await openSignup();
            assert.equal(await evaluate("document.documentElement.lang"), "bn");
            await screenshot("mobile-bengali-signup");
            await reloadPage();
            await waitFor(
                "document.documentElement.lang === 'bn' && document.querySelector('.reader-register-card')",
                "saved Bengali signup"
            );
            for (const url of Object.values(company)) {
                const link = await evaluate(
                    `(() => {const a=[...document.querySelectorAll('.reader-footer a')].find(a=>a.href===${JSON.stringify(
                        url
                    )});return a&&{target:a.target,rel:a.rel};})()`
                );
                assert.equal(link.target, "_blank");
                assert.match(link.rel, /noopener/);
            }
        });
        await check("native required fields stop empty login and signup submissions", async () => {
            await reset();
            await submitLogin();
            assert.equal(count("/api/auth/login"), 0);
            assert.equal(await evaluate("document.activeElement.id"), "reader-login-username");
            await signupValues();
            await setInputs({ "reader-dob": "" });
            await submitSignup();
            assert.equal(count("/api/auth/register-with-username"), 0);
            assert.equal(await evaluate("document.activeElement.id"), "reader-dob");
        });
        await check("invalid credentials show a localized error without losing input", async () => {
            await reset({ login: "invalid" });
            await loginValues();
            await submitLogin();
            await waitFor("document.querySelector('.reader-login-card [role=alert]')", "credential error");
            assert.match(
                await evaluate("document.querySelector('.reader-login-card [role=alert]').innerText"),
                /don’t match/
            );
            assert.equal(await evaluate("document.querySelector('#reader-login-password').value"), fixturePassword);
            await evaluate("document.querySelector('.reader-language button[lang=bn]').click()");
            await waitFor(
                "document.querySelector('.reader-login-card [role=alert]').innerText.includes('মিলছে না')",
                "localized credential error"
            );
        });
        await check("server field errors are associated and focus the invalid input", async () => {
            await reset({ login: "fields" });
            await loginValues();
            await submitLogin();
            await waitFor(
                "document.querySelector('#reader-login-username').getAttribute('aria-invalid') === 'true'",
                "field error"
            );
            assert.equal(await evaluate("document.activeElement.id"), "reader-login-username");
            assert.equal(
                await evaluate(
                    "document.getElementById(document.querySelector('#reader-login-username').getAttribute('aria-describedby')).innerText"
                ),
                "This account could not be found."
            );
        });
        await check("network failures and rate limits recover without crashes", async () => {
            for (const mode of ["network", "rate"]) {
                await reset({ login: mode });
                await loginValues();
                await submitLogin();
                await waitFor("document.querySelector('.reader-login-card [role=alert]')", mode + " error");
                const message = await evaluate("document.querySelector('.reader-login-card [role=alert]').innerText");
                assert.match(message, mode === "network" ? /couldn’t connect/ : /Too many attempts/);
                assert.equal(
                    await evaluate("document.querySelector('.reader-login-card button[type=submit]').disabled"),
                    false
                );
            }
        });
        await check("profile failure leaves visitor UI intact and persists no token", async () => {
            await reset({ profile: "fail" });
            await loginValues();
            await submitLogin();
            await waitFor("document.querySelector('.reader-login-card [role=alert]')", "profile failure");
            assert.match(
                await evaluate("document.querySelector('.reader-login-card [role=alert]').innerText"),
                /couldn’t load your profile/
            );
            assert.equal(await evaluate("localStorage.getItem('token')"), null);
            assert.equal(await evaluate(app + ".$store.getters.isLoggedIn"), false);
            assert.equal(await evaluate("!!document.querySelector('.reader-page')"), true);
        });
        await check("fresh login waits for profile, prevents duplicate submits and renders the feed", async () => {
            await reset({ profile: "hold" });
            await loginValues();
            await evaluate(
                "(() => {const f=document.querySelector('.reader-login-card form');f.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));f.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));})()"
            );
            for (let i = 0; i < 100 && !heldProfiles.length; i++) await delay(50);
            assert(heldProfiles.length);
            assert.equal(count("/api/auth/login"), 1);
            assert.equal(await evaluate(app + ".$store.getters.isLoggedIn"), false);
            assert.equal(await evaluate("localStorage.getItem('token')"), null);
            assert.equal(
                await evaluate("document.querySelector('.reader-login-card button[type=submit]').disabled"),
                true
            );
            assert.equal(
                requests.slice(requestStart).find((r) => r.path.endsWith("/api/auth/me") && r.method === "GET")
                    .authorization,
                "Bearer reader-fixture-token"
            );
            await replyApi(heldProfiles.shift(), 200, { data: { attributes: user } });
            await waitFeed();
            await reloadPage();
            await waitFeed();
            assert(
                !(await evaluate(
                    `Object.values(localStorage).some(value=>value.includes(${JSON.stringify(fixturePassword)}))`
                ))
            );
        });
        await check("signup validation preserves entered details", async () => {
            await reset({ registration: "fields" });
            await signupValues();
            await submitSignup();
            await waitFor(
                "document.querySelector('#reader-signup-username').getAttribute('aria-invalid') === 'true'",
                "signup field error"
            );
            assert.equal(await evaluate("document.activeElement.id"), "reader-signup-username");
            assert.equal(await evaluate("document.querySelector('#reader-first-name').value"), "Reader");
            assert.equal(await evaluate("document.querySelector('#reader-signup-password').value"), fixturePassword);
        });
        await check("new signup uses existing payload and signs in from a fresh profile", async () => {
            await reset();
            await signupValues();
            await submitSignup();
            await waitFeed();
            const registration = requests
                .slice(requestStart)
                .find((r) => r.path.endsWith("/api/auth/register-with-username") && r.method === "POST");
            assert.deepEqual(
                Object.keys(registration.data).sort(),
                ["dob", "first_name", "gender", "password", "surname", "username"].sort()
            );
            assert.equal(registration.data.dob, "1998-06-12");
            assert.equal(registration.data.gender, "o");
            assert.equal(registration.code, "");
            assert.equal(count("/api/auth/login"), 1);
            assert.equal(count("/api/auth/me", "GET"), 1);
        });
        await check("inline verification supports rejected/expired codes, resend and leading-zero paste", async () => {
            await reset({ registration: "otc" });
            await signupValues();
            await submitSignup();
            await waitFor("document.querySelector('#reader-signup-code')", "verification step");
            assert.equal(await evaluate("document.querySelector('#reader-signup-code').autocomplete"), "one-time-code");
            await setInputs({ "reader-signup-code": "999999" });
            await submitSignup();
            await waitFor(
                "document.querySelector('#reader-signup-code').getAttribute('aria-invalid') === 'true'",
                "rejected code"
            );
            await waitFor(
                "document.querySelector('.reader-code-actions button').disabled === false",
                "expired code resend"
            );
            assert.equal(
                await evaluate("document.querySelector('.reader-register-card button[type=submit]').disabled"),
                true
            );
            await evaluate("document.querySelector('.reader-code-actions button').click()");
            await waitFor(
                "document.querySelector('#reader-signup-code').getAttribute('aria-invalid') !== 'true' && document.querySelector('.reader-code-actions button').disabled",
                "resent code"
            );
            await evaluate(
                "(() => {const data=new DataTransfer();data.setData('text/plain','012 345');document.querySelector('#reader-signup-code').dispatchEvent(new ClipboardEvent('paste',{clipboardData:data,bubbles:true,cancelable:true}));})()"
            );
            assert.equal(await evaluate("document.querySelector('#reader-signup-code').value"), "012345");
            await submitSignup();
            await waitFeed();
            const registration = requests
                .slice(requestStart)
                .filter((r) => r.path.endsWith("/api/auth/register-with-username") && r.method === "POST");
            assert.deepEqual(
                registration.map((r) => r.code),
                ["", "999999", "", "012345"]
            );
        });
        await check("verification edit keeps signup details and language changes keep the challenge", async () => {
            await reset({ registration: "otc" });
            await signupValues();
            await submitSignup();
            await waitFor("document.querySelector('#reader-signup-code')", "verification");
            await evaluate("document.querySelector('.reader-language button[lang=bn]').click()");
            assert(await evaluate("!!document.querySelector('#reader-signup-code')"));
            await evaluate("document.querySelector('.reader-edit-details').click()");
            await waitFor("document.querySelector('#reader-first-name')", "edit details");
            assert.equal(await evaluate("document.querySelector('#reader-first-name').value"), "Reader");
            assert.equal(await evaluate("document.querySelector('#reader-dob').value"), "1998-06-12");
            assert.equal(await evaluate("document.querySelector('#reader-signup-password').value"), fixturePassword);
        });
        await check("created account retries login without duplicate registration", async () => {
            await reset({ profile: "fail" });
            await signupValues();
            await submitSignup();
            await waitFor(
                "document.querySelector('.reader-register-card [role=alert]')",
                "created account profile error"
            );
            assert.equal(count("/api/auth/register-with-username"), 1);
            assert.equal(await evaluate("localStorage.getItem('token')"), null);
            scenario.profile = "ok";
            await submitSignup();
            await waitFeed();
            assert.equal(count("/api/auth/register-with-username"), 1);
            assert.equal(count("/api/auth/login"), 2);
        });
        await check("leaving during login cancels profile hydration and restores the app shell", async () => {
            await reset({ profile: "hold" });
            await loginValues();
            await submitLogin();
            for (let i = 0; i < 100 && !heldProfiles.length; i++) await delay(50);
            assert(heldProfiles.length);
            await evaluate("void " + app + ".$router.push({name:'help'})");
            await waitFor("location.pathname === '/help' && document.querySelector('#bars')", "help route");
            assert.equal(
                await evaluate("document.querySelector('meta[name=viewport]').content.includes('user-scalable=no')"),
                true
            );
            assert.equal(
                await evaluate("document.querySelector('#app').classList.contains('reader-auth-active')"),
                false
            );
            assert.notEqual(await evaluate("getComputedStyle(document.querySelector('#app > nav')).display"), "none");
            await replyApi(heldProfiles.shift(), 200, { data: { attributes: user } });
            assert.equal(await evaluate("localStorage.getItem('token')"), null);
            await evaluate("void " + app + ".$router.push({name:'home'})");
            await waitFor(
                "document.querySelector('#app').classList.contains('reader-auth-active')",
                "restored landing"
            );
        });
        await check(
            "leaving signup during profile hydration cancels authentication without saving credentials",
            async () => {
                await reset({ profile: "hold" });
                await signupValues();
                await submitSignup();
                for (let i = 0; i < 100 && !heldProfiles.length; i++) await delay(50);
                assert(heldProfiles.length);
                await evaluate("document.querySelector('.reader-account-link a').click()");
                await waitFor(
                    "document.querySelector('.reader-login-card') && document.querySelector('#app').classList.contains('reader-auth-active')",
                    "cancel signup to login"
                );
                await replyApi(heldProfiles.shift(), 200, { data: { attributes: user } });
                assert.equal(await evaluate("localStorage.getItem('token')"), null);
                assert.equal(await evaluate("document.querySelector('#reader-login-password').value"), "");
                assert(
                    !(await evaluate(
                        `Object.values(localStorage).some(value=>value.includes(${JSON.stringify(fixturePassword)}))`
                    ))
                );
            }
        );
        await check("signup carries an internal return destination through registration", async () => {
            await reset({}, "?from=%2Fcourses");
            await signupValues();
            await submitSignup();
            await waitFor(
                "location.pathname === '/courses' && " + app + ".$store.getters.isLoggedIn",
                "signup return destination"
            );
            await navigate(base + "/register");
            await waitFor(
                "location.pathname === '/' && !document.querySelector('.reader-register-card')",
                "signed-in visitor skips signup"
            );
        });
        await check("valid internal return destinations work and external destinations are rejected", async () => {
            for (const [destination, expected] of [
                ["/courses", "/courses"],
                ["//evil.example", "/"],
            ]) {
                await reset({}, "?from=" + encodeURIComponent(destination));
                await loginValues();
                await submitLogin();
                await waitFor(
                    app + ".$store.getters.isLoggedIn && location.pathname === " + JSON.stringify(expected),
                    "safe return destination"
                );
                assert.equal(await evaluate("location.origin"), new URL(base).origin);
            }
        });
    }
    await check("active awards, achievements and product pages retain their images and favicon", async () => {
        await reset();
        await resize(1440, 1000);
        for (const [route, minimum] of [
            ["/awards", 2],
            ["/achievements", 3],
            ["/products", 3],
        ]) {
            await navigate(base + route);
            await waitFor(
                "[...document.querySelectorAll('#app > .app-content > div:first-child img')].length >= " + minimum,
                "page images " + route
            );
            await waitFor(
                "[...document.images].filter(i=>i.src.startsWith(location.origin)).every(i=>i.complete && i.naturalWidth>0)",
                "loaded local images " + route
            );
            const pageImages = await evaluate(
                "[...document.querySelectorAll('#app > .app-content > div:first-child img')].map(i=>i.src)"
            );
            assert(pageImages.length >= minimum);
            if (route === "/products")
                assert(
                    pageImages.some((src) => src.includes("af_mobile_app")) &&
                        pageImages.some((src) => src.includes("af_model_car"))
                );
        }
        await waitFor(
            "[...document.images].some(i=>i.src.includes('google_play_get_on')&&i.naturalWidth>0)",
            "footer app badge"
        );
        const icon = await evaluate("fetch(document.querySelector('link[rel=icon]').href).then(r=>r.status)");
        assert.equal(icon, 200);
    });
    const tree =
        "(() => {const all=[];function visit(v){all.push(v);v.$children.forEach(visit)}visit(document.querySelector('#app').__vue__);return all;})()";
    async function clickTab(prefix) {
        await evaluate(
            `(() => {const a=[...document.querySelectorAll('.ui-tabs .ui-nav-link')].find(a=>a.innerText.startsWith(${JSON.stringify(
                prefix
            )}));if(!a)throw Error('Missing tab');a.click();})()`
        );
    }
    await check("dynamic library tabs, book/member rows and preserved issue-history registration render", async () => {
        await reset();
        await loginValues();
        await submitLogin();
        await waitFeed();
        await navigate(base + "/libraries/" + fixtureLibrary.id);
        await waitFor(
            "document.body.innerText.includes('Cleanup Fixture Library') && document.body.innerText.includes('No discussion found.')",
            "library timeline"
        );
        assert(
            await evaluate(
                tree + ".some(v=>v.$options.name==='LibraryPager' && v.$options.components.LibraryBookIssuedHistory)"
            )
        );
        await clickTab("Books");
        await waitFor(
            "document.body.innerText.includes('The Cleanup Reader') && document.body.innerText.includes('BOOK-CLEANUP-1')",
            "dynamic book row"
        );
        assert(await evaluate(tree + ".some(v=>v.$options.name==='WrapperListView')"));
        await clickTab("Members");
        await waitFor(
            "document.body.innerText.includes('MEMBER-CLEANUP-1') && document.body.innerText.includes('Cleanup Member')",
            "dynamic member row"
        );
        await clickTab("About");
        await waitFor(
            "document.body.innerText.includes('A library kept working after unused-file cleanup.')",
            "library about tab"
        );
        await clickTab("Timeline");
        await waitFor("document.body.innerText.includes('No discussion found.')", "return library timeline");
    });
    await check("dynamic profile tabs and library/user search list components remain available", async () => {
        await navigate(base + "/users/" + fixtureReader.id);
        await waitFor(
            "document.body.innerText.includes('Cleanup Reader') && document.body.innerText.includes('No available posts.')",
            "profile timeline"
        );
        await clickTab("About");
        await waitFor(tree + ".some(v=>v.$options.name==='UserAbout')", "profile about component");
        await clickTab("TimeLine");
        await waitFor("document.body.innerText.includes('No available posts.')", "return profile timeline");
        await navigate(base + "/libraries");
        await waitFor("document.body.innerText.includes('Cleanup Fixture Library')", "dynamic library search row");
        assert(await evaluate(tree + ".some(v=>v.$options.name==='LibraryListItem')"));
        await navigate(base + "/users");
        await waitFor("document.body.innerText.includes('Cleanup Reader')", "dynamic user search row");
        assert(await evaluate(tree + ".some(v=>v.$options.name==='UserListItem')"));
    });
    await check("company career/contact redirects still reach their configured destinations", async () => {
        for (const [route, expected] of [
            ["/careers", company.careers],
            ["/contact-us", company.contact],
        ]) {
            await send("Page.navigate", { url: base + route });
            await waitFor(
                "location.href === " +
                    JSON.stringify(expected) +
                    " && document.title === 'Company destination fixture'",
                "company destination " + route
            );
        }
    });
    async function press(key, shift = false) {
        await send("Input.dispatchKeyEvent", {
            type: "keyDown",
            key,
            code: key,
            ...(key === "Enter" ? { text: "\r", unmodifiedText: "\r" } : {}),
            modifiers: shift ? 8 : 0,
            windowsVirtualKeyCode: { Escape: 27, Tab: 9, Enter: 13, ArrowDown: 40, ArrowUp: 38 }[key] || 0,
        });
        await send("Input.dispatchKeyEvent", {
            type: "keyUp",
            key,
            code: key,
            modifiers: shift ? 8 : 0,
            windowsVirtualKeyCode: { Escape: 27, Tab: 9, Enter: 13, ArrowDown: 40, ArrowUp: 38 }[key] || 0,
        });
    }
    await check("Vue menus support mobile collapse, keyboard navigation and outside dismissal", async () => {
        await reset();
        await navigate(base + "/courses");
        await resize(390, 844);
        assert.equal(await evaluate("getComputedStyle(document.querySelector('#collapsibleNavbar')).display"), "none");
        await evaluate("document.querySelector('[aria-controls=collapsibleNavbar]').click()");
        assert.equal(
            await evaluate("document.querySelector('[aria-controls=collapsibleNavbar]').getAttribute('aria-expanded')"),
            "true"
        );
        await evaluate("[...document.querySelectorAll('#collapsibleNavbar a')].find(a=>a.pathname==='/login').click()");
        await waitFor("location.pathname==='/login'", "mobile guest link");
        assert.equal(
            await evaluate("document.querySelector('[aria-controls=collapsibleNavbar]').getAttribute('aria-expanded')"),
            "false"
        );
        await reset();
        await loginValues();
        await submitLogin();
        await waitFeed();
        await resize(1440, 1000);
        await evaluate("document.querySelector('#navbarDropdown').focus()");
        await press("ArrowDown");
        await waitFor(
            "document.querySelector('#navbarDropdown').getAttribute('aria-expanded')==='true'",
            "account menu"
        );
        assert(await evaluate("document.activeElement.href.includes('/users/me')"));
        await press("Escape");
        assert.equal(await evaluate("document.activeElement.id"), "navbarDropdown");
        await evaluate("document.querySelector('#navbarDropdown').click();document.body.click()");
        assert.equal(
            await evaluate("document.querySelector('#navbarDropdown').getAttribute('aria-expanded')"),
            "false"
        );
        await screenshot("desktop-feed");
        await resize(390, 844);
        await screenshot("mobile-feed");
        await resize(1440, 1000);
    });
    await evaluate(`(() => {
    const app=document.querySelector('#app').__vue__, Base=app.$options._base;
    const found=new Map(),seen=new Set();
    function visit(component){const options=component.options||component;if(!options||seen.has(options))return;seen.add(options);if(options.name)found.set(options.name,component);Object.values(options.components||{}).forEach(visit);}
    app.$router.options.routes.forEach(r=>r.component&&visit(r.component));Object.values(Base.options.components).forEach(visit);
    window.qaConstructors=found;window.qaHost=null;
    window.qaMount=(name,props,binding='show',event='updateVisibleState')=>{
      if(window.qaHost){window.qaHost.$destroy();window.qaHost.$el.remove();}
      window.qaCalls=[];window.qaHold=false;window.qaFail=false;window.qaResolve=null;
      const facade={getters:{...app.$store.getters,complainTypesResponse:{data:['Spam','Abuse']}},commit:app.$store.commit.bind(app.$store),dispatch(type,payload){
        const form=payload&&(payload.formData||payload.payload&&payload.payload.formData);
        window.qaCalls.push({type,keys:form?[...form.keys()]:payload?Object.keys(payload):[]});
        if(window.qaFail)return Promise.reject({response:{data:{message:'Fixture request failed.'}}});
        if(window.qaHold)return new Promise(resolve=>{window.qaResolve=resolve});
        return Promise.resolve({data:{data:{attributes:{id:1}}}});
      }};
      const component=found.get(name);if(!component)throw Error('Unknown fixture component '+name);
      const host=new Base({parent:app,store:facade,router:app.$router,i18n:app.$i18n,data(){return {open:false}},render(h){return h('div',[
        h('button',{attrs:{id:'qa-open'},on:{click:()=>this.open=true}},'Open '+name),
        h(component,{ref:'subject',props:{...props,[binding]:this.open},on:{[event]:value=>this.open=value,onClickOk:()=>{},onClickCancel:()=>{}}})
      ])}}).$mount();document.getElementById('app').appendChild(host.$el);window.qaHost=host;
      document.getElementById('qa-open').focus();document.getElementById('qa-open').click();
    };
  })()`);
    async function mountModal(name, props = {}, binding = "show", event = "updateVisibleState") {
        await evaluate(
            `qaMount(${JSON.stringify(name)},${JSON.stringify(props)},${JSON.stringify(binding)},${JSON.stringify(
                event
            )})`
        );
        await waitFor(
            "document.querySelector('[role=dialog][aria-modal=true]') && document.querySelector('[role=dialog][aria-modal=true]').contains(document.activeElement)",
            "modal focus " + name
        );
        assert.equal(await evaluate("document.body.style.overflow"), "hidden");
        assert(
            await evaluate(
                "!!document.getElementById(document.querySelector('[role=dialog][aria-modal=true]').getAttribute('aria-labelledby'))"
            )
        );
    }
    async function closeModal() {
        await evaluate("qaHost.open=false");
        await waitFor("!document.querySelector('[role=dialog]')", "dialog closed");
    }
    async function confirmModal() {
        await evaluate("document.querySelector('[role=dialog][aria-modal=true] footer button:last-child').click()");
    }
    const dialogs = [
        [
            "AlertMessageModal",
            {
                alertMessageTitle: "Fixture confirmation",
                alertMessageBody: "Fixture message",
                isSuccessfulMessage: true,
            },
            "showAlertModal",
            "onUpdateVisibleState",
        ],
        ["AskForOtcModal", { durationInSeconds: 30 }, "showOtcModal", "onUpdateVisibleState"],
        ["LoadingModal", {}, "showLoadingModal", "onUpdateVisibleState"],
        ["CreateBlockModal", { user: fixtureReader, blockable_type: "User", blockable_id: fixtureReader.id }],
        ["CreateReportModal", { user: fixtureReader, complainable_type: "User", complainable_id: fixtureReader.id }],
        ["LibraryFollowersModal", { library: fixtureLibrary }],
        ["UserFollowersModal", { user: fixtureReader }],
        ["UserFollowingListModal", { user: fixtureReader }],
        ["UploadLibraryCoverModal", { library: fixtureLibrary }],
        ["UploadLibraryLogoModal", { library: fixtureLibrary }],
        [
            "CreateLibraryMemberRequestModal",
            { library: fixtureLibrary },
            "showMemberRequestModal",
            "onUpdateVisibleState",
        ],
        ["CreateOrEditPostModal", { postable_type: "User", postable_id: user.id }],
        ["PostLikesModal", { post: { id: 123 } }],
        ["UploadMyCoverModal", {}],
        ["UploadMyPhotoModal", {}],
    ];
    await check("all 15 dialogs have unique names, trapped focus and reversible scroll locking", async () => {
        for (const [name, props, binding, event] of dialogs) {
            await mountModal(name, props, binding, event);
            await evaluate("document.querySelector('[role=dialog] footer button:last-child')?.focus()");
            await press("Tab");
            assert(await evaluate("document.querySelector('[role=dialog]').contains(document.activeElement)"));
            await evaluate("qaHost.open=false");
            await waitFor("!document.querySelector('[role=dialog]')", "close " + name);
            assert.equal(await evaluate("document.body.style.overflow"), "");
            assert.equal(await evaluate("document.activeElement.id"), "qa-open");
            assert.equal(await evaluate("document.querySelector('#app > nav').hasAttribute('aria-hidden')"), false);
        }
    });
    await check("overlapping dialogs keep unique IDs, topmost focus and scroll locking until all close", async () => {
        await mountModal("UserFollowersModal", { user: fixtureReader });
        await evaluate(
            `(() => {const Base=qaHost.$options._base;window.qaNested=new Base({parent:qaHost,data(){return {open:true}},render(h){return h('UiModal',{props:{value:this.open,title:'Nested confirmation',centered:true,closeOnConfirm:true},on:{input:v=>this.open=v}},[h('button','Nested action')])}}).$mount();document.getElementById('app').appendChild(qaNested.$el)})()`
        );
        await waitFor(
            "document.querySelectorAll('[role=dialog]').length===2 && document.querySelector('[aria-modal=true]').contains(document.activeElement)",
            "nested dialog focus"
        );
        assert.equal(await evaluate("new Set([...document.querySelectorAll('[role=dialog]')].map(d=>d.id)).size"), 2);
        await press("Escape");
        await waitFor("document.querySelectorAll('[role=dialog]').length===1", "topmost dismissal");
        assert.equal(await evaluate("document.body.style.overflow"), "hidden");
        await evaluate("qaNested.$destroy();qaNested.$el.remove()");
        await closeModal();
        assert.equal(await evaluate("document.body.style.overflow"), "");
        await mountModal("UserFollowersModal", { user: fixtureReader });
        await evaluate("qaHost.$destroy();qaHost.$el.remove();qaHost=null");
        await waitFor(
            "!document.querySelector('[role=dialog]') && document.body.style.overflow===''",
            "dialog unmount cleanup"
        );
    });
    await check("dialogs honor Escape/backdrop dismissal and persistent loading states", async () => {
        await mountModal("UserFollowersModal", { user: fixtureReader });
        await press("Escape");
        await waitFor("!document.querySelector('[role=dialog]')", "Escape dismissal");
        await mountModal("UserFollowersModal", { user: fixtureReader });
        await evaluate(
            "document.querySelector('[role=dialog]').parentElement.dispatchEvent(new MouseEvent('mousedown',{bubbles:true}))"
        );
        await waitFor("!document.querySelector('[role=dialog]')", "backdrop dismissal");
        await mountModal("LoadingModal", {}, "showLoadingModal", "onUpdateVisibleState");
        await press("Escape");
        await evaluate(
            "document.querySelector('[role=dialog]').parentElement.dispatchEvent(new MouseEvent('mousedown',{bubbles:true}))"
        );
        assert(await evaluate("!!document.querySelector('[role=dialog]')"));
        await closeModal();
        await mountModal("LibraryFollowersModal", { library: fixtureLibrary });
        await confirmModal();
        await waitFor("!document.querySelector('[role=dialog]')", "read-only OK dismissal");
    });
    await check("post dialog validates, prevents duplicate submission and keeps errors retryable", async () => {
        await mountModal("CreateOrEditPostModal", { postable_type: "User", postable_id: user.id });
        await confirmModal();
        assert.equal(await evaluate("qaCalls.length"), 0);
        await evaluate(
            "(() => {const t=document.querySelector('[role=dialog] textarea');t.value='Fixture discussion';t.dispatchEvent(new Event('input',{bubbles:true}));qaHold=true;})()"
        );
        await confirmModal();
        await waitFor("qaCalls.length===1", "post dispatched");
        await confirmModal();
        assert.equal(await evaluate("qaCalls.length"), 1);
        assert.equal(await evaluate("document.querySelector('[role=dialog]').getAttribute('aria-busy')"), "true");
        await press("Escape");
        assert(await evaluate("!!document.querySelector('[role=dialog]')"));
        await evaluate("qaResolve({data:{data:{attributes:{id:1}}}})");
        await waitFor("!document.querySelector('[role=dialog]')", "post success");
        await mountModal("CreateOrEditPostModal", { postable_type: "User", postable_id: user.id });
        await evaluate(
            "(() => {qaFail=true;const t=document.querySelector('[role=dialog] textarea');t.value='Retry discussion';t.dispatchEvent(new Event('input',{bubbles:true}));})()"
        );
        await confirmModal();
        await waitFor(
            "document.querySelector('[role=dialog] [role=alert]') && document.querySelector('[role=dialog] footer button:last-child').disabled===false",
            "post failure recovery"
        );
        assert.equal(await evaluate("document.querySelector('[role=dialog] textarea').value"), "Retry discussion");
        await evaluate("qaFail=false");
        await confirmModal();
        await waitFor("!document.querySelector('[role=dialog]')", "post retry");
    });
    await check("all five image pickers preserve File models, previews and multipart field names", async () => {
        for (const [name, props, field] of [
            ["UploadMyPhotoModal", {}, "photo"],
            ["UploadMyCoverModal", {}, "cover"],
            ["UploadLibraryLogoModal", { library: fixtureLibrary }, "logo"],
            ["UploadLibraryCoverModal", { library: fixtureLibrary }, "cover"],
            ["CreateOrEditPostModal", { postable_type: "User", postable_id: user.id }, "image"],
        ]) {
            await mountModal(name, props);
            await evaluate(
                "(() => {const input=document.querySelector('[role=dialog] input[type=file]'),data=new DataTransfer();data.items.add(new File(['fixture image'],'fixture.png',{type:'image/png'}));input.files=data.files;input.dispatchEvent(new Event('change',{bubbles:true}));const t=document.querySelector('[role=dialog] textarea');if(t){t.value='Image discussion';t.dispatchEvent(new Event('input',{bubbles:true}));}})()"
            );
            await waitFor(
                "document.querySelector('[role=dialog] img[src^=blob], [role=dialog] [style*=blob]')",
                "image preview " + name
            );
            await confirmModal();
            await waitFor("!document.querySelector('[role=dialog]')", "image submitted " + name);
            assert(
                await evaluate(`qaCalls.some(c=>c.keys.includes(${JSON.stringify(field)}))`),
                name + " multipart field"
            );
        }
    });
    await check(
        "file dropping works with native validation and post/report/block actions remain retryable",
        async () => {
            await mountModal("UploadMyPhotoModal", {});
            await evaluate(
                "(() => {const data=new DataTransfer();data.items.add(new File(['image'],'dropped.png',{type:'image/png'}));document.querySelector('[role=dialog] label').dispatchEvent(new DragEvent('drop',{dataTransfer:data,bubbles:true,cancelable:true}))})()"
            );
            await waitFor("qaHost.$refs.subject.imgFile?.name==='dropped.png'", "dropped File model");
            await confirmModal();
            await waitFor("!document.querySelector('[role=dialog]')", "dropped file submission");
            for (const [name, props] of [
                [
                    "CreateReportModal",
                    { user: fixtureReader, complainable_type: "User", complainable_id: fixtureReader.id },
                ],
                ["CreateBlockModal", { user: fixtureReader, blockable_type: "User", blockable_id: fixtureReader.id }],
            ]) {
                await mountModal(name, props);
                if (name === "CreateReportModal") {
                    await confirmModal();
                    assert.equal(await evaluate('qaCalls.filter(c=>c.type==="createReport").length'), 0);
                    await evaluate(
                        "(() => {const s=document.querySelector('[role=dialog] select');s.value='Spam';s.dispatchEvent(new Event('change',{bubbles:true}));const t=document.querySelector('[role=dialog] textarea');t.value='Fixture details';t.dispatchEvent(new Event('input',{bubbles:true}));})()"
                    );
                }
                await evaluate("qaFail=true");
                await confirmModal();
                await waitFor(
                    "document.querySelector('[role=dialog]').innerText.includes('Fixture request failed.')",
                    "retryable " + name
                );
                await evaluate("qaFail=false");
                await confirmModal();
                await waitFor("!document.querySelector('[role=dialog]')", "retried " + name);
            }
            await mountModal("CreateOrEditPostModal", {
                post: { id: 123, title: "Original", body: "Original discussion" },
                postable_type: "User",
                postable_id: user.id,
            });
            assert.equal(
                await evaluate("document.querySelector('[role=dialog] textarea').value"),
                "Original discussion"
            );
            await confirmModal();
            await waitFor("!document.querySelector('[role=dialog]')", "edit post");
            assert(await evaluate("qaCalls.some(c=>c.type==='updateUserPost')"));
        }
    );
    await check("membership consent and request failure keep the dialog open for retry", async () => {
        await mountModal(
            "CreateLibraryMemberRequestModal",
            { library: fixtureLibrary },
            "showMemberRequestModal",
            "onUpdateVisibleState"
        );
        await confirmModal();
        assert.equal(await evaluate("qaCalls.length"), 0);
        await evaluate("document.querySelector('#iAgreeCheckbox').click();qaFail=true");
        await confirmModal();
        await waitFor(
            "document.querySelector('[role=dialog] [role=alert]').innerText.includes('Fixture request failed')",
            "membership error"
        );
        await evaluate("qaFail=false");
        await confirmModal();
        await waitFor("!document.querySelector('[role=dialog]')", "membership retry");
        await mountModal("AskForOtcModal", { durationInSeconds: 30 }, "showOtcModal", "onUpdateVisibleState");
        await evaluate(
            "(() => {const i=document.querySelector('#ot-code-input');i.value='012345';i.dispatchEvent(new Event('input',{bubbles:true}));})()"
        );
        assert.equal(await evaluate("qaHost.$refs.subject.ot_code"), "012345");
        await confirmModal();
        await waitFor("!document.querySelector('[role=dialog]')", "legacy OTP confirmation");
    });
    await check("native comment input still submits once with Enter", async () => {
        await evaluate(`qaMount('CreatePostComment',{post:{id:123}},'show','updateVisibleState')`);
        await waitFor("document.querySelector('[aria-label=\"Write a comment\"]')", "native comment input");
        await evaluate(
            "(() => {const i=document.querySelector('[aria-label=\"Write a comment\"]');i.value='Fixture comment';i.dispatchEvent(new Event('input',{bubbles:true}));i.focus();})()"
        );
        await press("Enter");
        await waitFor("qaCalls.some(c=>c.type==='storePostComment')", "comment dispatched");
        assert.equal(await evaluate("qaCalls.filter(c=>c.type==='storePostComment').length"), 1);
    });
    await evaluate("qaHost.$destroy();qaHost.$el.remove();qaHost=null");
    await check("course cards, cart actions and application forms retain their behavior", async () => {
        scenario.course = true;
        await navigate(base + "/courses");
        await waitFor(
            "[...document.querySelectorAll('button')].some(b=>b.innerText.includes('Add to cart'))",
            "course card"
        );
        await evaluate("[...document.querySelectorAll('button')].find(b=>b.innerText.includes('Add to cart')).click()");
        assert(await evaluate(app + ".$store.getters.myCart.some(c=>c.id===12345)"));
        await navigate(base + "/courses/12345/apply");
        await waitFor(
            "document.body.innerText.includes('Apply for this course') && document.querySelector('button[type=submit]')",
            "course form"
        );
        await evaluate("document.querySelector('button[type=submit]').click()");
        await waitFor(
            "document.body.innerText.includes('Fixture application accepted.')",
            "course application success"
        );
        const application = requests.findLast((r) => r.path === "/api/my-course-orders" && r.method === "POST");
        assert.equal(String(application.data.course_id), "12345");
        scenario.course = false;
    });
    await check("existing recovery route and company redirects remain reachable", async () => {
        await reset();
        await evaluate("document.querySelector('.reader-forgot a').click()");
        await waitFor(
            "location.pathname === '/login-with-otc-to-reset-password' && document.querySelector('#loginWithOtcForm')",
            "password recovery"
        );
        assert.equal(await evaluate("document.querySelector('#app').classList.contains('reader-auth-active')"), false);
        await send("Page.navigate", { url: base + "/about?from=private#private" });
        await waitFor(
            "location.href === 'https://about.alorferi.com/' && document.title === 'Company destination fixture'",
            "company redirect"
        );
    });
    assert.deepEqual(errors, [], "Uncaught browser exceptions");
    const knownWarnings = warnings.filter(
        (w) =>
            w.includes("src/views/welcome/AwardsAndAchievements.vue") &&
            w.includes("Cannot read properties of null (reading 'title')")
    );
    assert.deepEqual(
        warnings.filter(
            (w) =>
                /Unknown custom element|Error in render|Error in .*hook|Invalid prop|Failed to mount/.test(w) &&
                !knownWarnings.includes(w)
        ),
        [],
        "Unexpected Vue warnings beyond the documented baseline"
    );
    fs.writeFileSync(
        output,
        JSON.stringify(
            { base, mockedBackend: true, results, requests, errors, warnings, redirects, canceledInterceptions },
            null,
            2
        )
    );
}
main()
    .catch((error) => {
        fs.writeFileSync(
            output,
            JSON.stringify(
                { base, mockedBackend: true, results, requests, errors, warnings, failure: error.stack },
                null,
                2
            )
        );
        console.error(error.stack);
        process.exitCode = 1;
    })
    .finally(() => {
        if (socket) socket.close();
        chrome.once("exit", () => {
            fs.rmSync(profile, { recursive: true, force: true });
        });
        chrome.kill("SIGTERM");
    });
