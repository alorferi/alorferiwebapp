import { companyLinks } from "@/config/company";
import "./readerAuth.css";

const COPY = {
    en: {
        skipSignup: "Skip to sign up", existingAccount: "Already have an account? Log in", createAccount: "Create account",
        skip: "Skip to sign in", homeLabel: "Alor Feri home", brandCaption: "A home for readers", language: "Choose language",
        eyebrow: "A library-based social network", titleStart: "Where readers", titleEnd: "and libraries connect.",
        description: "Discover books, connect with libraries, and share your reading journey. Find your people, one page at a time.",
        discover: "Discover books", connect: "Find your library", share: "Share your thoughts", artCaption: "Good books. Great company.",
        authCaption: "Your next chapter starts here.", footerTagline: "Connecting readers & libraries.", footerNavigation: "Useful links",
        about: "About", careers: "Careers", contact: "Contact", help: "Help", privacy: "Privacy",
        loginTab: "Log in", signupTab: "Create account",
        loginEyebrow: "PICK UP WHERE YOU LEFT OFF", loginTitle: "Welcome back, reader.", loginDescription: "Your books, libraries, and fellow readers.",
        signupEyebrow: "THERE’S A PLACE FOR YOU HERE", signupTitle: "Start your next chapter.", signupDescription: "Join a community brought together by books.",
        username: "Email or mobile number", usernamePlaceholder: "you@example.com or mobile number", password: "Password",
        showPassword: "Show password", hidePassword: "Hide password", forgot: "Forgot password?", loginButton: "Log in to your community",
        signingIn: "Signing you in…", working: "Just a moment…", firstName: "First name", lastName: "Last name", dob: "Date of birth",
        gender: "Gender", chooseGender: "Select", female: "Female", male: "Male", other: "Other", signupButton: "Create your account",
        privacyIntro: "A little reading before you join:", privacyLink: "our privacy policy.",
        verifyTitle: "One more page to turn.", verifyDescription: "Enter the verification code for", codeLabel: "6-digit verification code",
        codeExpires: "Request another code in {seconds}s", codeExpired: "This code has expired.", resendCode: "Request a new code",
        invalidCode: "That code wasn’t accepted. Please try again.", verifyButton: "Verify & join", editDetails: "Edit your details",
        accountCreated: "Your account has been created. Continue to sign in to your community.", retryLogin: "Continue to your account",
        errorGeneric: "We couldn’t complete that request. Please try again.", errorFields: "Please check the highlighted fields.",
        errorNetwork: "We couldn’t connect. Check your connection and try again.", errorProfile: "We couldn’t load your profile. Please try signing in again.",
        errorCredentials: "That email or mobile number and password don’t match.", errorRateLimit: "Too many attempts. Please wait a little and try again."
    },
    bn: {
        skipSignup: "অ্যাকাউন্ট খোলার ফর্মে যান", existingAccount: "অ্যাকাউন্ট আছে? লগইন করুন", createAccount: "অ্যাকাউন্ট খুলুন",
        skip: "লগইন ফর্মে যান", homeLabel: "আলোর ফেরী হোম", brandCaption: "বইপড়ুয়াদের আপন ঠিকানা", language: "ভাষা বেছে নিন",
        eyebrow: "পাঠাগারভিত্তিক সামাজিক নেটওয়ার্ক", titleStart: "বই, পাঠক আর পাঠাগার—", titleEnd: "একই ঠিকানায়।",
        description: "নতুন বই আবিষ্কার করুন, পাঠাগারের সঙ্গে যুক্ত হোন আর ভাগ করে নিন আপনার পড়ার গল্প। বইয়ের পাতায় পাতায় খুঁজে নিন আপন মানুষ।",
        discover: "নতুন বই খুঁজুন", connect: "পাঠাগারের সঙ্গে যুক্ত হোন", share: "পড়ার গল্প বলুন", artCaption: "ভালো বই, ভালো সঙ্গ।",
        authCaption: "আপনার নতুন অধ্যায়ের শুরু এখানেই।", footerTagline: "পাঠক ও পাঠাগারকে যুক্ত করি।", footerNavigation: "প্রয়োজনীয় লিংক",
        about: "আমাদের সম্পর্কে", careers: "ক্যারিয়ার", contact: "যোগাযোগ", help: "সাহায্য", privacy: "গোপনীয়তা",
        loginTab: "লগইন", signupTab: "অ্যাকাউন্ট খুলুন",
        loginEyebrow: "ফিরে আসুন আপনার পড়ার জগতে", loginTitle: "স্বাগতম, বইপড়ুয়া।", loginDescription: "আপনার বই, পাঠাগার আর প্রিয় পাঠকেরা।",
        signupEyebrow: "এই আড্ডায় আপনারও জায়গা আছে", signupTitle: "শুরু হোক নতুন অধ্যায়।", signupDescription: "বইয়ের টানে গড়ে ওঠা এই কমিউনিটিতে যোগ দিন।",
        username: "ইমেইল অথবা মোবাইল নম্বর", usernamePlaceholder: "আপনার ইমেইল অথবা মোবাইল নম্বর", password: "পাসওয়ার্ড",
        showPassword: "পাসওয়ার্ড দেখুন", hidePassword: "পাসওয়ার্ড আড়াল করুন", forgot: "পাসওয়ার্ড ভুলে গেছেন?", loginButton: "আপনার কমিউনিটিতে লগইন করুন",
        signingIn: "লগইন হচ্ছে…", working: "একটু অপেক্ষা করুন…", firstName: "নামের প্রথম অংশ", lastName: "নামের শেষ অংশ", dob: "জন্ম তারিখ",
        gender: "লিঙ্গ", chooseGender: "বেছে নিন", female: "নারী", male: "পুরুষ", other: "অন্যান্য", signupButton: "অ্যাকাউন্ট তৈরি করুন",
        privacyIntro: "যোগ দেওয়ার আগে পড়ে নিন", privacyLink: "আমাদের গোপনীয়তা নীতি।",
        verifyTitle: "আর এক ধাপ বাকি।", verifyDescription: "যাচাই করার কোড লিখুন—", codeLabel: "৬ সংখ্যার যাচাইকরণ কোড",
        codeExpires: "{seconds} সেকেন্ড পর নতুন কোড চাইতে পারবেন", codeExpired: "কোডের মেয়াদ শেষ হয়েছে।", resendCode: "নতুন কোড চাই",
        invalidCode: "কোডটি গ্রহণ করা হয়নি। আবার চেষ্টা করুন।", verifyButton: "যাচাই করে যোগ দিন", editDetails: "তথ্য পরিবর্তন করুন",
        accountCreated: "আপনার অ্যাকাউন্ট তৈরি হয়েছে। কমিউনিটিতে যোগ দিতে লগইন সম্পন্ন করুন।", retryLogin: "অ্যাকাউন্টে প্রবেশ করুন",
        errorGeneric: "অনুরোধটি সম্পন্ন করা যায়নি। আবার চেষ্টা করুন।", errorFields: "চিহ্নিত তথ্যগুলো ঠিক করে দিন।",
        errorNetwork: "সংযোগ করা যায়নি। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।", errorProfile: "আপনার প্রোফাইল লোড করা যায়নি। আবার লগইন করার চেষ্টা করুন।",
        errorCredentials: "ইমেইল বা মোবাইল নম্বর এবং পাসওয়ার্ড মিলছে না।", errorRateLimit: "অনেকবার চেষ্টা করা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।"
    }
};
// Keep callback navigation internal and avoid returning to another auth form.
function returnDestination(from) {
    return typeof from === "string" && /^\/(?!\/)/.test(from) && !from.includes("\\") && !/^\/(login|register)(\/|\?|#|$)/.test(from) ? from : "/";
}

export default {
    data() {
        return { companyLinks, year: new Date().getFullYear(), busy: false, showPassword: false, errors: {}, message: "", loginPhase: "" };
    },
    computed: {
        language() { return this.$store.getters.activeLanguage === "bn" ? "bn" : "en"; },
        copy() { return COPY[this.language]; },
        homeLocation() { return this.authLocation("home"); },
        registerLocation() { return this.authLocation("register"); }
    },
    watch: {
        language(value, previous) {
            document.documentElement.lang = value;
            Object.keys(COPY[previous]).forEach(key => {
                if (this.message === COPY[previous][key]) this.message = COPY[value][key];
                if (this.codeError === COPY[previous][key]) this.codeError = COPY[value][key];
            });
        }
    },
    mounted() {
        if (this.$store.getters.isLoggedIn) {
            this.$router.replace(returnDestination(this.$route.query.from));
            return;
        }
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            this._readerViewport = viewport.getAttribute("content");
            viewport.setAttribute("content", "width=device-width, initial-scale=1");
        }
        // Restore the shared App shell when either visitor auth page is left.
        this.$nextTick(() => {
            const app = document.getElementById("app");
            if (app && !this._readerLeaving) app.classList.add("reader-auth-active");
        });
        document.documentElement.lang = this.language;
    },
    beforeDestroy() {
        this._readerLeaving = true;
        if (this._readerCancel) this._readerCancel.cancel();
        if (this.clearTimer) this.clearTimer();
        this.clearSecrets();
        const app = document.getElementById("app");
        if (app) app.classList.remove("reader-auth-active");
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport && this._readerViewport !== undefined) {
            if (this._readerViewport === null) viewport.removeAttribute("content");
            else viewport.setAttribute("content", this._readerViewport);
        }
    },
    methods: {
        setLanguage(language) {
            this.$i18n.locale = language;
            this.$store.dispatch("setActiveLanguage", language);
        },
        goTo(name) { if (!this.busy) this.$router.push({ name }).catch(() => {}); },
        authLocation(name) {
            const from = returnDestination(this.$route.query.from);
            return { name, query: from === "/" ? {} : { from } };
        },
        normalizeUsername(value) {
            const username = value.trim();
            return this.isNumber(username, "-", " ", ",", "+") ? this.formatBdMobileNumber(username) : username;
        },
        clearError(name) { this.$delete(this.errors, name); this.message = ""; },
        focusError() {
            this.$nextTick(() => {
                if (this._readerLeaving) return;
                const form = this.$refs.authForm;
                const target = form.querySelector('[aria-invalid="true"]') || form.querySelector('[role="alert"]');
                if (target) target.focus();
            });
        },
        showError(error) {
            if (this._readerLeaving || this.$axios.isCancel(error)) return;
            const data = error.response && error.response.data;
            this.errors = {};
            if (data && data.errors && typeof data.errors === "object" && this.loginPhase !== "profile") {
                Object.keys(data.errors).forEach(name => {
                    const value = data.errors[name];
                    this.$set(this.errors, name, String(Array.isArray(value) ? value[0] || "" : value));
                });
            }
            this.message = this.loginPhase === "profile" ? this.copy.errorProfile
                : Object.keys(this.errors).length ? this.copy.errorFields
                : error.response && error.response.status === 429 ? this.copy.errorRateLimit
                : data && (data.error === "invalid_grant" || error.response.status === 401) ? this.copy.errorCredentials
                : !error.response && error.isAxiosError ? this.copy.errorNetwork : this.copy.errorGeneric;
            if (this.onFieldErrors) this.onFieldErrors();
            this.focusError();
        },
        beginRequest() {
            this.busy = true;
            this.errors = {};
            this.message = "";
            this.loginPhase = "";
            this._readerCancel = this.$axios.CancelToken.source();
        },
        async authenticate(username, password) {
            this.loginPhase = "credentials";
            const options = { cancelToken: this._readerCancel.token };
            const response = await this.$axios.post(this.$apiServerBaseUrl + "/api/auth/login", {
                username: this.normalizeUsername(username), password
            }, options);
            const token = response.data.data.token;
            if (typeof token !== "string" || !token) throw new Error("Missing authentication token");
            this.loginPhase = "profile";
            const profile = await this.$axios.get(this.$apiServerBaseUrl + "/api/auth/me", {
                ...options, headers: { Authorization: "Bearer " + token }
            });
            const user = profile.data.data.attributes;
            if (!user || user.id == null) throw new Error("Missing user profile");
            if (this._readerLeaving) return;
            // Publish the session only after its profile is ready. Existing store
            // mutations keep the same token/profile storage format as other pages.
            this.$store.commit("setActiveUser", user);
            localStorage.setItem("token", JSON.stringify(token));
            this.$axios.defaults.headers.common.Authorization = token;
            this.clearSecrets();
            this.$store.commit("setToken", token);
            const destination = returnDestination(this.$route.query.from);
            if (this.$route.fullPath !== destination) {
                await this.$router.replace(destination).catch(error => {
                    if (error.name !== "NavigationDuplicated") throw error;
                });
            }
        }
    }
};
