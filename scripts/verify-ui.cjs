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
const courseImageRequests = [];
let canceledInterceptions = 0;
const company = {
    about: "https://about.alorferi.com/",
    careers: "https://about.alorferi.com/careers",
    contact: "https://about.alorferi.com/contact",
};
let scenario = { login: "ok", profile: "ok", registration: "ok" };
let requestStart = 0;
const heldProfiles = [];
const heldPostPages = [];
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
const courseImageSources = [
    '/course-fixtures/relative.png',
    'course-fixtures/relative-no-slash.png',
    'https://media.example.test/course-fixtures/absolute.png',
    null,
    '/course-fixtures/missing.png'
];
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
function postPage(source, page, origin, short = false) {
    const owner = Number(source.split("/")[3]) || 10;
    const ids = short ? [[1], [1, 2], [3]][page - 1] : [[1, 2], [2, 3], [4]][page - 1];
    const data = ids.map((n) => ({
        attributes: {
            id: owner * 10 + n,
            user,
            title: source + " post " + n,
            body: short ? "A short discussion." : "Paging fixture discussion.\n".repeat(18),
            postable_type: "App\\Models\\User",
            postable: user,
            created_at: "2026-01-01T10:00:00Z",
            image_url: null,
            comments_data: paginated([]),
            likes_data: paginated([]),
            my_like: null,
        },
    }));
    return {
        data,
        links: { next: page === 1 ? origin + source + "?page=2" : page === 2 ? "?page=3" : null },
        meta: { current_page: page, last_page: 3, per_page: 2, total: short ? 3 : 4 },
    };
}
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
                    const data = request.postData && request.method !== "OPTIONS" && (header("content-type") || "").includes("application/json")
                        ? JSON.parse(request.postData) : null;
                    requests.push({
                        path: pathname,
                        query: new URL(request.url).search,
                        method: request.method,
                        data: data ? { ...data, password: data.password ? "[redacted]" : undefined } : null,
                        code: header("ot-code"),
                        authorization: header("authorization"),
                    });
                    if (request.method === "OPTIONS") return await replyApi(requestId, 204, null);
                    if (scenario.postPages && request.method === 'POST' && /^\/api\/users\/\d+\/posts(?:\/\d+)?$/.test(pathname)) {
                        const post=postPage('/api/posts',1,new URL(request.url).origin,true).data[0];
                        const editing=/\/posts\/\d+$/.test(pathname);
                        post.attributes.id=editing?Number(pathname.split('/').pop()):899001;
                        post.attributes.title=editing?'Edited paging discussion':'Created paging discussion';
                        post.attributes.body=post.attributes.title;
                        return await replyApi(requestId,200,{data:post});
                    }
                    if (scenario.postPages && request.method === 'DELETE' && /^\/api\/users\/\d+\/posts\/\d+$/.test(pathname))
                        return await replyApi(requestId,204,null);
                    if (scenario.postPages && request.method === 'POST' && /^\/api\/posts\/\d+\/(?:likes|comments)$/.test(pathname)) {
                        return await replyApi(requestId,200,{data:{attributes:{id:899002,user,
                            body:data && data.body || 'Paging comment',created_at:'2026-01-01T10:00:00Z'}}});
                    }
                    if (scenario.postPages && request.method === 'GET' && /^\/api\/(?:posts|users\/\d+\/posts|libraries\/\d+\/posts)$/.test(pathname)) {
                        const page = Number(new URL(request.url).searchParams.get('page') || 1);
                        const config = scenario.postPages;
                        const body = postPage(pathname, page, new URL(request.url).origin, config.short);
                        if (config.holdPage === page && (!config.holdSource || config.holdSource === pathname)) {
                            heldPostPages.push({requestId, body, source: pathname, page});
                            return;
                        }
                        if (config.failPage === page && config.failRemaining > 0) {
                            config.failRemaining--;
                            if (config.network) return await send('Fetch.failRequest', {requestId, errorReason:'ConnectionFailed'});
                            return await replyApi(requestId, 503, {message:'Post page fixture failure'});
                        }
                        return await replyApi(requestId, 200, body);
                    }
                    if (scenario.postPages && pathname.endsWith('/likes/my-like'))
                        return await replyApi(requestId, 200, {data:{attributes:null}});
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
                    if (scenario.course && pathname === "/api/courses") {
                        const courses = scenario.courseImageVariants
                            ? courseImageSources.map((image_url, index) => ({...fixtureCourse, id:fixtureCourse.id+index,
                                title:'Course image '+index, image_url})) : [fixtureCourse];
                        return await replyApi(requestId, 200, paginated(courses));
                    }
                    if (scenario.course && (pathname === "/api/courses/" + fixtureCourse.id || pathname === "/api/courses/" + fixtureCourse.slug + "/slug"))
                        return await replyApi(requestId, 200, { data: {...fixtureCourse,
                            image_url: Object.prototype.hasOwnProperty.call(scenario,'courseImage') ? scenario.courseImage : fixtureCourse.image_url} });
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
                } else if (resourceType === "Image" && new URL(request.url).pathname.startsWith('/course-fixtures/')) {
                    courseImageRequests.push(request.url);
                    const found = ['relative.png','relative-no-slash.png','absolute.png','recovered.png'].includes(new URL(request.url).pathname.split('/').pop());
                    await send('Fetch.fulfillRequest', {requestId, responseCode:found?200:404,
                        responseHeaders:[{name:'Content-Type',value:found?'image/png':'text/plain'}],
                        body:found?'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=':Buffer.from('Not found').toString('base64')});
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
    const postSources = [
        { route: "/", source: "/api/posts", action: "fetchPostFeed", payload: {} },
        {
            route: "/libraries/" + fixtureLibrary.id,
            source: "/api/libraries/" + fixtureLibrary.id + "/posts",
            action: "fetchLibraryPosts",
            payload: { overhead: { library: fixtureLibrary } },
        },
        {
            route: "/users/" + fixtureReader.id,
            source: "/api/users/" + fixtureReader.id + "/posts",
            action: "fetchUserPosts",
            payload: { user_id: fixtureReader.id },
        },
    ];
    const postIds = () =>
        evaluate("[...document.querySelectorAll('.post-feed [data-post-id]')].map(e=>Number(e.dataset.postId))");
    const pageCount = (source, page) =>
        requests
            .slice(requestStart)
            .filter(
                (r) =>
                    r.method === "GET" &&
                    r.path === source &&
                    Number(new URLSearchParams(r.query).get("page") || 1) === page
            ).length;
    async function spaTo(route, source) {
        await evaluate("window.scrollTo(0,0);void " + app + ".$router.push(" + JSON.stringify(route) + ")");
        await waitFor(
            "document.querySelector('.post-feed')?.dataset.source === " + JSON.stringify(source),
            "post source " + source
        );
    }
    async function pagedLogin(config = {}) {
        await resize(1440, 800);
        await reset({ postPages: config });
        await loginValues();
        await submitLogin();
        await waitFor("document.querySelector('.post-feed') && " + app + ".$store.getters.isLoggedIn", "paged login");
    }
    async function waitPosts(length) {
        await waitFor(
            "document.querySelectorAll('.post-feed [data-post-id]').length === " +
                length +
                " && !document.querySelector('.post-feed .ui-spinner')",
            "post count " + length
        );
    }
    async function scrollPosts() {
        await evaluate("document.querySelector('.post-feed-sentinel').scrollIntoView({block:'center'})");
        await delay(150);
    }
    async function releasePostPage() {
        const held = heldPostPages.shift();
        assert(held, "Expected held post page");
        await replyApi(held.requestId, 200, held.body);
        await delay(250);
    }
    await check("post paging: all three feeds append unique posts and stop after the last page", async () => {
        for (const [index, feed] of postSources.entries()) {
            await pagedLogin();
            if (feed.route !== "/") await spaTo(feed.route, feed.source);
            await resize(index === 1 ? 390 : 1440, 800);
            await waitPosts(2);
            const first = await postIds();
            scenario.postPages.holdPage = 2;
            scenario.postPages.holdSource = feed.source;
            await scrollPosts();
            await waitFor("document.querySelector('.post-feed .ui-spinner')", "next page spinner");
            assert.equal(heldPostPages.length, 1);
            assert.deepEqual(await postIds(), first, "Existing posts remain during loading");
            await evaluate(
                "void Promise.all(Array.from({length:8},()=>" +
                    app +
                    ".$store.dispatch(" +
                    JSON.stringify(feed.action) +
                    "," +
                    JSON.stringify(feed.payload) +
                    ")))"
            );
            for (let n = 0; n < 5; n++) await scrollPosts();
            assert.equal(pageCount(feed.source, 2), 1, "One request per pending page");
            scenario.postPages.holdPage = null;
            await releasePostPage();
            await waitPosts(3);
            assert.deepEqual((await postIds()).slice(0, 2), first);
            await scrollPosts();
            await waitPosts(4);
            const ids = await postIds();
            assert.equal(new Set(ids).size, 4);
            assert.deepEqual(ids, [first[0], first[1], first[1] + 1, first[1] + 2]);
            for (let n = 0; n < 3; n++) await scrollPosts();
            await evaluate(
                "void " + app + ".$store.dispatch(" + JSON.stringify(feed.action) + "," + JSON.stringify(feed.payload) + ")"
            );
            assert.equal(pageCount(feed.source, 1), 1);
            assert.equal(pageCount(feed.source, 2), 1);
            assert.equal(pageCount(feed.source, 3), 1);
            assert.equal(await evaluate("document.querySelector('.post-feed').getAttribute('aria-busy')"), "false");
            assert.equal(await evaluate("document.querySelectorAll('.post-feed-pagination button').length"), 0);
        }
    });
    await check("post paging: initial and next-page failures retry the same page without losing posts", async () => {
        for (const feed of postSources) {
            const config = { failPage: 1, failRemaining: 1 };
            await pagedLogin(feed.route === "/" ? config : {});
            if (feed.route !== "/") {
                scenario.postPages = config;
                await spaTo(feed.route, feed.source);
            }
            await waitFor("document.querySelector('.post-feed [role=alert]')", "initial post error");
            assert.equal(
                await evaluate("document.querySelectorAll('.post-feed .ui-spinner,.post-feed .ui-empty-state').length"),
                0
            );
            await scrollPosts();
            assert.equal(pageCount(feed.source, 1), 1);
            await evaluate("document.querySelector('.post-feed-pagination button').focus()");
            await press("Enter");
            await waitPosts(2);
            const first = await postIds();
            config.failPage = 2;
            config.failRemaining = 1;
            config.network = true;
            await scrollPosts();
            await waitFor("document.querySelector('.post-feed [role=alert]')", "next post page error");
            assert.deepEqual(await postIds(), first);
            await evaluate(app + ".$store.dispatch('setActiveLanguage','bn');" + app + ".$i18n.locale='bn'");
            assert.match(await evaluate("document.querySelector('.post-feed [role=alert]').innerText"), /পোস্ট/);
            await scrollPosts();
            assert.equal(pageCount(feed.source, 2), 1);
            await evaluate("document.querySelector('.post-feed-pagination button').focus()");
            await press("Enter");
            await waitPosts(3);
            assert.deepEqual((await postIds()).slice(0, 2), first);
            assert.equal(pageCount(feed.source, 2), 2);
        }
    });
    await check("post paging: short pages fill the viewport and keyboard Load more works without observers", async () => {
        await pagedLogin({ short: true });
        await waitPosts(3);
        await waitFor(app + ".$store.getters.postsPaging.next === null", "short feed end");
        const script = await send("Page.addScriptToEvaluateOnNewDocument", {
            source: "delete window.IntersectionObserver;",
        });
        try {
            await pagedLogin({ short: true });
            await waitPosts(1);
            await evaluate("document.querySelector('.post-feed-pagination button').focus()");
            await press("Enter");
            await waitPosts(2);
            await evaluate("document.querySelector('.post-feed-pagination button').focus()");
            await press(" ");
            await waitPosts(3);
            assert.equal(pageCount("/api/posts", 2), 1);
            assert.equal(pageCount("/api/posts", 3), 1);
        } finally {
            await send("Page.removeScriptToEvaluateOnNewDocument", { identifier: script.identifier });
        }
    });
    await check("post paging: late responses cannot cross feeds, tabs, owners or logout", async () => {
        await pagedLogin({ holdPage: 1, holdSource: "/api/posts" });
        await waitFor("document.querySelector('.post-feed .ui-spinner')", "held first page");
        await spaTo(postSources[1].route, postSources[1].source);
        await waitPosts(2);
        const libraryIds = await postIds();
        await releasePostPage();
        assert.deepEqual(await postIds(), libraryIds);
        scenario.postPages.holdPage = 2;
        scenario.postPages.holdSource = postSources[1].source;
        await scrollPosts();
        await waitFor("document.querySelector('.post-feed .ui-spinner')", "held library page");
        await spaTo(postSources[2].route, postSources[2].source);
        await waitPosts(2);
        const userIds = await postIds();
        await releasePostPage();
        assert.deepEqual(await postIds(), userIds);
        scenario.postPages.holdSource = postSources[2].source;
        await scrollPosts();
        await waitFor("document.querySelector('.post-feed .ui-spinner')", "held profile page");
        await evaluate(
            "window.scrollTo(0,0);[...document.querySelectorAll('.ui-tabs a')].find(a=>a.innerText==='About').click()"
        );
        await waitFor("!document.querySelector('.post-feed')", "profile tab closed");
        await evaluate("[...document.querySelectorAll('.ui-tabs a')].find(a=>a.innerText==='TimeLine').click()");
        await waitPosts(2);
        await releasePostPage();
        assert.deepEqual(await postIds(), userIds);
        assert.equal(pageCount(postSources[2].source, 1), 2, "Reopened timeline starts at page one");
        await scrollPosts();
        await waitFor("document.querySelector('.post-feed .ui-spinner')", "held previous owner");
        const nextReader = { ...fixtureReader, id: fixtureReader.id + 1 };
        await evaluate("window.scrollTo(0,0);" + app + '.$store.commit("setUser",' + JSON.stringify(nextReader) + ")");
        await waitFor(
            "document.querySelector('.post-feed')?.dataset.source === '/api/users/" + nextReader.id + "/posts'",
            "new owner"
        );
        await waitPosts(2);
        const nextIds = await postIds();
        await releasePostPage();
        assert.deepEqual(await postIds(), nextIds);
        scenario.postPages.holdSource = "/api/users/" + nextReader.id + "/posts";
        await scrollPosts();
        await waitFor("document.querySelector('.post-feed .ui-spinner')", "held page at logout");
        await evaluate("document.querySelector('#navbarDropdown').click()");
        const selector = await logoutSelector();
        await evaluate("document.querySelector(" + JSON.stringify(selector) + ").click()");
        await waitFor("document.querySelector('.reader-login-card')", "logout during paging");
        await releasePostPage();
        assert.deepEqual(await evaluate(app + ".$store.getters.postsResponse.data"), []);
        assert.equal(await evaluate(app + ".$store.getters.postsPaging.source"), null);
    });
    await check("post paging: create, edit, like, comment and delete preserve the loaded pages", async () => {
        await pagedLogin();
        await waitPosts(2);
        await scrollPosts();
        await waitPosts(3);
        await scrollPosts();
        await waitPosts(4);
        const original = await postIds();
        await evaluate("window.scrollTo(0,0);document.querySelector('.app-content .ui-button-outline-primary').click()");
        await waitFor("document.querySelector('[role=dialog] textarea')", "new paged discussion");
        const submitDiscussion = async () => {
            await evaluate(
                "(() => {const t=document.querySelector('[role=dialog] textarea');t.value='Paging discussion change';t.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('[role=dialog] footer button:last-child').click();})()"
            );
            await waitFor("!document.querySelector('[role=dialog]')", "discussion saved");
        };
        await submitDiscussion();
        await waitPosts(5);
        assert.deepEqual(await postIds(), [899001, ...original]);
        await evaluate("document.querySelector('[data-post-id=\"899001\"] button').click()");
        await evaluate(
            "[...document.querySelectorAll('[data-post-id=\"899001\"] .ui-menu-item')].find(a=>a.innerText.includes('Edit this post')).click()"
        );
        await waitFor("document.querySelector('[role=dialog] textarea')", "edit paged discussion");
        await submitDiscussion();
        await waitFor(
            "document.querySelector('[data-post-id=\"899001\"]').innerText.includes('Edited paging discussion')",
            "post edited"
        );
        await evaluate(
            "[...document.querySelectorAll('[data-post-id=\"899001\"] button')].find(b=>b.innerText.trim()==='Like').click()"
        );
        await waitFor("document.querySelector('[data-post-id=\"899001\"]').innerText.includes('You')", "post liked");
        await evaluate(
            "(() => {const i=document.querySelector('[data-post-id=\"899001\"] [aria-label=\"Write a comment\"]');i.value='Paging comment';i.dispatchEvent(new Event('input',{bubbles:true}));i.focus();})()"
        );
        await press("Enter");
        await waitFor(
            "document.querySelector('[data-post-id=\"899001\"]').innerText.includes('Paging comment')",
            "comment added"
        );
        assert.deepEqual(await postIds(), [899001, ...original]);
        await evaluate("document.querySelector('[data-post-id=\"899001\"] button').click()");
        await evaluate(
            "[...document.querySelectorAll('[data-post-id=\"899001\"] .ui-menu-item')].find(a=>a.innerText.includes('Delete this post')).click()"
        );
        await waitPosts(4);
        assert.deepEqual(await postIds(), original);
    });
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
            code: key === " " ? "Space" : key,
            ...(key === "Enter" ? { text: "\r", unmodifiedText: "\r" } : {}),
            modifiers: shift ? 8 : 0,
            windowsVirtualKeyCode: { Escape: 27, Tab: 9, Enter: 13, ArrowDown: 40, ArrowUp: 38, " ": 32 }[key] || 0,
        });
        await send("Input.dispatchKeyEvent", {
            type: "keyUp",
            key,
            code: key === " " ? "Space" : key,
            modifiers: shift ? 8 : 0,
            windowsVirtualKeyCode: { Escape: 27, Tab: 9, Enter: 13, ArrowDown: 40, ArrowUp: 38, " ": 32 }[key] || 0,
        });
    }
    async function pointerPosition(selector) {
        return evaluate(`(() => {
            const target=document.querySelector(${JSON.stringify(selector)});
            target.scrollIntoView({block:'nearest'});
            const r=target.getBoundingClientRect();
            const point={x:r.x+r.width/2,y:r.y+r.height/2};
            if(!target.contains(document.elementFromPoint(point.x,point.y)))throw Error('Pointer target is obscured');
            return point;
        })()`);
    }
    async function mouseClick(selector, afterPress) {
        const point=await pointerPosition(selector);
        await send('Input.dispatchMouseEvent',{type:'mouseMoved',...point});
        await send('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',clickCount:1,...point});
        if(afterPress)await afterPress();
        await send('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,...point});
    }
    async function touchTap(selector) {
        const point=await pointerPosition(selector);
        await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...point,id:1}]});
        await send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
    }
    async function logoutSelector() {
        const menu=await evaluate("document.querySelector('#navbarDropdown').getAttribute('aria-controls')");
        return '#'+menu+' button.ui-menu-item';
    }
    async function expectLoggedOut() {
        await waitFor("document.querySelector('.reader-login-card') && location.pathname==='/'",'visitor homepage after logout');
        assert.equal(await evaluate(app+'.$store.getters.isLoggedIn'),false);
        assert.equal(await evaluate("localStorage.getItem('token')"),null);
        assert.equal(await evaluate("localStorage.getItem('otc_token')"),null);
        assert.equal(await evaluate('location.hash'),'');
        await reloadPage();
        await waitFor("document.querySelector('.reader-login-card')",'visitor homepage after refresh');
        assert.equal(await evaluate(app+'.$store.getters.isLoggedIn'),false);
    }
    await check('desktop pointer logout survives focusout before mouseup and stays logged out after refresh',async()=>{
        await reset();await resize(1440,1000);await loginValues();await submitLogin();await waitFeed();
        await mouseClick('#navbarDropdown');
        await waitFor("document.querySelector('#navbarDropdown').getAttribute('aria-expanded')==='true'",'pointer account menu');
        await mouseClick(await logoutSelector(),async()=>{
            assert.equal(await evaluate("document.querySelector('#navbarDropdown').getAttribute('aria-expanded')"),'true');
            assert(await evaluate('!!document.querySelector('+JSON.stringify(await logoutSelector())+')'));
        });
        await expectLoggedOut();
    });
    await check('mobile touch logout closes the session and stays logged out after refresh',async()=>{
        await reset();await resize(390,844);await loginValues();await submitLogin();await waitFeed();
        await send('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:1});
        try {
            await touchTap('[aria-controls=collapsibleNavbar]');
            await waitFor("document.querySelector('[aria-controls=collapsibleNavbar]').getAttribute('aria-expanded')==='true'",'touch navigation');
            await touchTap('#navbarDropdown');
            await waitFor("document.querySelector('#navbarDropdown').getAttribute('aria-expanded')==='true'",'touch account menu');
            await touchTap(await logoutSelector());await expectLoggedOut();
        } finally { await send('Emulation.setTouchEmulationEnabled',{enabled:false}); }
    });
    await check('keyboard menu focus, Tab dismissal and Enter/Space logout remain functional',async()=>{
        for(const key of ['Enter',' ']) {
            await reset();await resize(1440,1000);await loginValues();await submitLogin();await waitFeed();
            await evaluate("document.querySelector('#navbarDropdown').focus()");await press('ArrowDown');
            await waitFor("document.querySelector('#navbarDropdown').getAttribute('aria-expanded')==='true'",'keyboard account menu');
            assert(await evaluate("document.activeElement.href.includes('/users/me')"));
            await press('Tab');await press('Tab');
            assert.equal(await evaluate('document.activeElement.tagName'),'BUTTON');
            assert.equal(await evaluate("document.querySelector('#navbarDropdown').getAttribute('aria-expanded')"),'true');
            await press('Tab');
            await waitFor("document.querySelector('#navbarDropdown').getAttribute('aria-expanded')==='false'",'Tab outside closes menu');
            await evaluate("document.querySelector('#navbarDropdown').focus()");await press('ArrowUp');
            await waitFor("document.activeElement.matches('button.ui-menu-item')",'keyboard logout button');
            await press(key);await expectLoggedOut();
        }
    });
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
    await check("secure pages share the reader theme across responsive English and Bengali views", async () => {
        const styles = await evaluate(`(() => {
                const style = selector => getComputedStyle(document.querySelector(selector));
                return {background: style('body').backgroundColor, text: style('body').color,
                    card: style('.ui-card').backgroundColor, radius: style('.ui-card').borderRadius,
                    action: style('.ui-button-outline-primary').color};
            })()`);
        assert.deepEqual(styles, {
            background: "rgb(247, 244, 236)",
            text: "rgb(36, 52, 44)",
            card: "rgb(255, 255, 255)",
            radius: "16px",
            action: "rgb(23, 75, 58)",
        });
        scenario.course = true;
        const routes = [
            "/",
            "/libraries",
            "/users",
            "/libraries/" + fixtureLibrary.id,
            "/users/" + fixtureReader.id,
            "/users/edit-me",
            "/libraries/create",
            "/libraries/" + fixtureLibrary.id + "/edit",
            "/courses",
            "/courses/" + fixtureCourse.slug,
            "/courses/" + fixtureCourse.id + "/apply",
        ];
        for (const language of ["en", "bn"]) {
            await evaluate(
                app +
                    ".$store.dispatch('setActiveLanguage'," +
                    JSON.stringify(language) +
                    ");" +
                    app +
                    ".$i18n.locale=" +
                    JSON.stringify(language)
            );
            for (const route of routes) {
                await navigate(base + route);
                await waitFor("!document.querySelector('.ui-spinner')", "loaded themed page " + route);
                for (const width of [320, 390, 768, 1440]) {
                    await resize(width, width < 600 ? 844 : 1000);
                    const overflow = await evaluate(`(() => {
                            if (document.documentElement.scrollWidth <= innerWidth + 1) return [];
                            return [...document.querySelectorAll('#app *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1)
                                .slice(0,8).map(e=>({tag:e.tagName,classes:e.className,text:e.innerText.slice(0,70),right:e.getBoundingClientRect().right}));
                        })()`);
                    if (overflow.length) await screenshot("theme-overflow");
                    assert.deepEqual(overflow, [], language + " overflow at " + width + " on " + route);
                }
                if (route === "/courses/" + fixtureCourse.slug) {
                    await waitFor("document.body.innerText.includes('Fixture Training')", "course promotional content");
                    assert.equal(
                        await evaluate("getComputedStyle(document.querySelector('.ui-card-header')).backgroundColor"),
                        "rgb(248, 249, 250)"
                    );
                }
                if (language === "en") {
                    await screenshot(
                        "theme-" + (route === "/" ? "feed" : route.slice(1).replaceAll("/", "-")) + "-desktop"
                    );
                    await resize(390, 844);
                    await screenshot("theme-" + (route === "/" ? "feed" : route.slice(1).replaceAll("/", "-")) + "-mobile");
                }
            }
        }
        await navigate(base + "/libraries/create");
        await resize(1440, 1000);
        // Headless Chrome can retain activeElement while the document has no focus.
        await send("Emulation.setFocusEmulationEnabled", { enabled: true });
        await evaluate("document.querySelector('.ui-field').focus()");
        await waitFor(
            "getComputedStyle(document.querySelector('.ui-field')).borderTopColor === 'rgb(23, 75, 58)'",
            "green field focus"
        );
        await evaluate("document.querySelector('.ui-field').setAttribute('aria-invalid','true')");
        await waitFor(
            "getComputedStyle(document.querySelector('.ui-field')).borderTopColor === 'rgb(173, 52, 44)'",
            "invalid field stays red"
        );
        await evaluate("document.querySelector('.ui-field').removeAttribute('aria-invalid')");
        assert.equal(await evaluate("getComputedStyle(document.querySelector('.ui-field')).minHeight"), "44px");
        assert.equal(
            await evaluate("getComputedStyle(document.querySelector('.ui-button-primary')).backgroundColor"),
            "rgb(23, 75, 58)"
        );
        const actionPoint = await pointerPosition(".ui-button-primary");
        await send("Input.dispatchMouseEvent", { type: "mouseMoved", ...actionPoint });
        await waitFor(
            "getComputedStyle(document.querySelector('.ui-button-primary')).backgroundColor === 'rgb(16, 61, 46)'",
            "green button hover"
        );
        await evaluate(
            "document.querySelector('.ui-button-primary').disabled=true;document.querySelector('.ui-field').disabled=true"
        );
        assert.equal(await evaluate("getComputedStyle(document.querySelector('.ui-button-primary')).cursor"), "default");
        await waitFor(
            "getComputedStyle(document.querySelector('.ui-field')).backgroundColor === 'rgb(242, 245, 239)'",
            "muted disabled field"
        );
        await evaluate(app + ".$store.dispatch('setActiveLanguage','en');" + app + ".$i18n.locale='en'");
        await navigate(base + "/");
        assert.equal(await evaluate("document.querySelector('.app-navbar [aria-current=page]').pathname"), "/");
        await evaluate("document.querySelector('#navbarDropdown').click()");
        assert.equal(await evaluate("getComputedStyle(document.querySelector('.ui-dropdown-menu')).borderRadius"), "12px");
        await press("Escape");
        await send("Emulation.setFocusEmulationEnabled", { enabled: false });
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
        assert.equal(await evaluate("getComputedStyle(document.querySelector('[role=dialog][aria-modal=true]')).borderRadius"), "16px");
        assert.equal(await evaluate("getComputedStyle(document.querySelector('[role=dialog][aria-modal=true]')).color"), "rgb(36, 52, 44)");
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
            if (name === 'CreateOrEditPostModal' || name === 'UploadMyPhotoModal') {
                await screenshot('theme-dialog-'+name+'-desktop');
                await resize(390,844);
                await screenshot('theme-dialog-'+name+'-mobile');
                assert(await evaluate('document.documentElement.scrollWidth <= innerWidth + 1'));
                await resize(1440,1000);
            }
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
    await check("course images: guest labels, relative/absolute URLs and missing-image fallbacks work", async () => {
        await reset();
        scenario.course = true;
        scenario.courseImageVariants = true;
        const firstRequest = courseImageRequests.length;
        await navigate(base + "/courses");
        await waitFor(
            "document.querySelectorAll('.course-image').length===5 && [...document.querySelectorAll('.course-image img')].every(i=>i.complete&&i.naturalWidth>0) && document.querySelectorAll('.course-image [role=img]').length===2",
            "course image variants"
        );
        const apiOrigin = await evaluate("new URL(" + app + ".$apiServerBaseUrl).origin");
        const sources = await evaluate("[...document.querySelectorAll('.course-image img')].map(i=>i.src)");
        assert.deepEqual(sources, [
            apiOrigin + "/course-fixtures/relative.png",
            apiOrigin + "/course-fixtures/relative-no-slash.png",
            courseImageSources[2],
        ]);
        assert.deepEqual(
            courseImageRequests.slice(firstRequest).sort(),
            [...sources, apiOrigin + "/course-fixtures/missing.png"].sort()
        );
        assert.match(
            await evaluate("document.querySelectorAll('.course-image [role=img]')[0].textContent"),
            /Course image 3/
        );
        for (const language of ["en", "bn"]) {
            await evaluate(
                app +
                    '.$store.dispatch("setActiveLanguage",' +
                    JSON.stringify(language) +
                    ");" +
                    app +
                    ".$i18n.locale=" +
                    JSON.stringify(language)
            );
            assert.equal(
                await evaluate("document.querySelector('.app-navbar a[href=\"/courses\"]').textContent.trim()"),
                language === "en" ? "Courses" : "কোর্সসমূহ"
            );
            for (const width of [320, 390, 768, 1440]) {
                await resize(width, width < 600 ? 844 : 1000);
                assert(
                    await evaluate("document.documentElement.scrollWidth <= innerWidth+1"),
                    "course image overflow " + width + " " + language
                );
            }
        }
        await evaluate("void (window.recoveredCourseElement=document.querySelectorAll('.course-image')[4])");
        await evaluate(
            "(() => {const store=" +
                app +
                '.$store,r=store.getters.coursesResponse;store.commit("setCoursesResponse",{...r,data:r.data.map((c,i)=>i===4?{...c,image_url:"/course-fixtures/recovered.png"}:c)})})()'
        );
        await waitFor(
            "document.querySelectorAll('.course-image')[4].querySelector('img')?.naturalWidth>0",
            "recovered course source"
        );
        assert(await evaluate("window.recoveredCourseElement===document.querySelectorAll('.course-image')[4]"));
        assert.equal(
            courseImageRequests.slice(firstRequest).filter((u) => u.endsWith("/missing.png")).length,
            1,
            "No fallback request loop"
        );
        await screenshot("courses-fallback-desktop");
        await resize(390, 844);
        await screenshot("courses-fallback-mobile");
        scenario.courseImageVariants = false;
    });
    await check("course images: signed-in labels and detail thumbnails recover after missing sources", async () => {
        await reset();
        await loginValues();
        await submitLogin();
        await waitFeed();
        scenario.course = true;
        await resize(1440, 1000);
        for (const source of [
            "/course-fixtures/relative.png",
            courseImageSources[2],
            null,
            "/course-fixtures/missing.png",
        ]) {
            scenario.courseImage = source;
            await navigate(base + "/courses/" + fixtureCourse.slug);
            await waitFor("document.querySelector('.course-image')", "detail image component");
            if (source && !source.endsWith("/missing.png")) {
                await waitFor("document.querySelector('.course-image img')?.naturalWidth>0", "detail thumbnail");
                assert.equal(await evaluate("document.querySelector('.course-image img').alt"), fixtureCourse.title);
            } else {
                await waitFor("document.querySelector('.course-image [role=img]')", "detail fallback");
                assert.match(await evaluate("document.querySelector('.course-image').textContent"), /Fixture Training/);
            }
        }
        await evaluate(
            "(()=>{const store=" +
                app +
                '.$store;store.commit("setCourse",{...store.getters.course,image_url:"/course-fixtures/recovered.png"})})()'
        );
        await waitFor("document.querySelector('.course-image img')?.naturalWidth>0", "detail source recovery");
        for (const language of ["en", "bn"]) {
            await evaluate(
                app +
                    '.$store.dispatch("setActiveLanguage",' +
                    JSON.stringify(language) +
                    ");" +
                    app +
                    ".$i18n.locale=" +
                    JSON.stringify(language)
            );
            assert.equal(
                await evaluate("document.querySelector('.app-navbar a[href=\"/courses\"]').textContent.trim()"),
                language === "en" ? "Courses" : "কোর্সসমূহ"
            );
        }
        await evaluate(app + '.$store.dispatch("setActiveLanguage","en");' + app + '.$i18n.locale="en"');
        delete scenario.courseImage;
    });
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
                /Unknown custom element|Error in render|Error in .*hook|Invalid prop|Failed to mount|Duplicate keys detected/.test(w) &&
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
