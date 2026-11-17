<template>
    <div class="reader-welcome">
        <a class="reader-skip" href="#reader-auth">{{ copy.skip }}</a>
        <header class="reader-header reader-container">
            <router-link class="reader-brand" :to="{ name: 'home' }" :aria-label="copy.homeLabel">
                <img src="@/assets/images/defaults/alorferi_logo_brand.png" alt="" width="44" height="44" />
                <span>Alor Feri<small>{{ copy.brandCaption }}</small></span>
            </router-link>
            <div class="reader-language" role="group" :aria-label="copy.language">
                <button type="button" lang="en" :aria-pressed="language === 'en' ? 'true' : 'false'" @click="setLanguage('en')">EN</button>
                <span aria-hidden="true"></span>
                <button type="button" lang="bn" :aria-pressed="language === 'bn' ? 'true' : 'false'" @click="setLanguage('bn')">বাংলা</button>
            </div>
        </header>

        <main class="reader-main reader-container">
            <section class="reader-story" aria-labelledby="reader-title">
                <p class="reader-eyebrow"><span aria-hidden="true"></span>{{ copy.eyebrow }}</p>
                <h1 id="reader-title">{{ copy.titleStart }} <em>{{ copy.titleEnd }}</em></h1>
                <p class="reader-description">{{ copy.description }}</p>
                <ul class="reader-values">
                    <li><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m3 4 7 2 7-2v12l-7 2-7-2V4Zm7 2v12"/></svg>{{ copy.discover }}</li>
                    <li><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m2 7 8-4 8 4H2Zm2 2v6m4-6v6m4-6v6m4-6v6M2 17h16"/></svg>{{ copy.connect }}</li>
                    <li><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 3h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H8l-4 3v-3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm2 4h8m-8 3h5"/></svg>{{ copy.share }}</li>
                </ul>
            </section>

            <div class="reader-art" aria-hidden="true">
                <svg viewBox="0 0 600 350" fill="none" focusable="false">
                    <defs><linearGradient id="reader-paper" x1="190" y1="250" x2="378" y2="290" gradientUnits="userSpaceOnUse"><stop stop-color="#FFFEF7"/><stop offset="1" stop-color="#EEE5CF"/></linearGradient></defs>
                    <path d="M109 251c-29-65 5-151 83-170 72-18 98 12 144-8 78-35 175 15 183 103 8 89-58 120-159 124-113 4-204 5-251-49Z" fill="#E9EDDF"/>
                    <circle cx="417" cy="91" r="39" fill="#ECDDAE"/>
                    <ellipse cx="307" cy="307" rx="231" ry="7" fill="#E5E8DB"/>
                    <path d="M106 286V125a5 5 0 0 1 5-5h114a5 5 0 0 1 5 5v161" fill="#D2DBC8"/>
                    <path d="M106 286V125a5 5 0 0 1 5-5h114a5 5 0 0 1 5 5v161M106 176h124m-124 54h124" stroke="#6E8874" stroke-width="2"/>
                    <path d="M102 286h132" stroke="#174B3A" stroke-width="6" stroke-linecap="round"/>
                    <path d="M119 137h13v38h-13z" fill="#174B3A"/><path d="M135 144h10v31h-10z" fill="#B96342"/><path d="m149 137 11-3 11 39-11 3z" fill="#F9F4E6"/>
                    <path d="M175 138h13v37h-13z" fill="#C8A45E"/><path d="M192 147h10v28h-10z" fill="#6E8874"/><path d="M205 133h12v42h-12z" fill="#F9F4E6"/>
                    <path d="M124 146h3m-3 17h3m53-17h3m-3 16h3m27-21h4" stroke="#F7F4EC" stroke-width="1.5"/>
                    <path d="M119 187h18v42h-18z" fill="#E4CAA0"/><path d="M141 194h11v35h-11z" fill="#F9F4E6"/><path d="M157 183h16v46h-16z" fill="#466B53"/>
                    <path d="m177 195 11-4 12 34-11 4z" fill="#B96342"/><path d="M204 190h12v39h-12z" fill="#174B3A"/>
                    <path d="M125 196h6m-6 4h6m33-8h3m-3 25h3" stroke="#F7F4EC" stroke-width="1.5"/>
                    <path d="M116 269h54v10h-54z" fill="#B96342"/><path d="M121 258h43v10h-43z" fill="#F9F4E6"/><path d="M118 246h48v12h-48z" fill="#C8A45E"/>
                    <path d="M177 251h14v34h-14z" fill="#174B3A"/><path d="M195 244h13v41h-13z" fill="#F9F4E6"/>
                    <path d="M390 226c-12-18-15-57 2-65 20-10 46-5 58 15l17 42-31 29-46-21Z" fill="#D9BC88"/>
                    <path d="M413 166c6-9 17-12 25-5 11 9 18 27 22 44l-28 6-19-45Z" fill="#174B3A"/>
                    <path d="m436 207-36-9-22 11 8 11 18-5 40 8" fill="#C99276"/>
                    <path d="M399 163c-3-6-4-14-1-19 4-8 15-8 20-2 7 8 2 20-7 23l-12-2Z" fill="#C99276"/>
                    <path d="M397 150c-5-5-8-13-2-20 8-10 24-5 26 6 1 4 0 9-2 13l-5-8c-7 3-11 1-14-2l-3 11Z" fill="#2B4235"/>
                    <path d="M391 227c10-14 30-15 49-10l-20 27-29 15-28 34-13-6 20-41 21-19Z" fill="#334F42"/>
                    <path d="m424 233 6 23-9 36h-15l-1-31-9-17" fill="#466B53"/>
                    <path d="m405 288 16 1 6 11h-27l5-12Zm-54-5 13 7-2 11-27-4 16-14Z" fill="#24342C"/>
                    <path d="M455 219c11 5 17 15 15 28-2 12-8 20-18 22h-59v-15h40l22-35Z" fill="#B96342"/>
                    <path d="m404 269-5 31m53-31 6 31" stroke="#6C6C4F" stroke-width="5" stroke-linecap="round"/>
                    <path d="m362 187 24 6 22-8-3 26-20 7-23-6v-25Z" fill="#F9F4E6" stroke="#7C8C73" stroke-width="1.5"/>
                    <path d="m386 193-1 25m-18-23 13 3m-13 2 13 3m10-5 12-5m-12 10 11-4" stroke="#A3AD91" stroke-width="1.5"/>
                    <path d="m201 262 74-20 95 21 14 26-109-6-92 7 18-28Z" fill="#174B3A"/>
                    <path d="M193 256c29-10 57-10 82 7 25-17 56-18 91-6l11 27c-39-9-72-11-102-4-25-8-54-6-86 4l4-28Z" fill="url(#reader-paper)" stroke="#9BA78E" stroke-width="1.5"/>
                    <path d="M193 250c29-12 58-9 82 9 25-18 56-20 89-9l2 24c-35-10-65-9-91 5-23-13-52-15-82-5v-24Z" fill="#FFFEF7" stroke="#9BA78E" stroke-width="1.5"/>
                    <path d="M275 259v20m-69-22c18-4 36-1 53 7m-53-1c18-4 36-1 53 7m31-6c18-8 36-11 56-7m-56 13c18-8 36-11 56-7" stroke="#C5C8AF" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="m277 280 6 18 5-5 8 2-9-16" fill="#B96342"/>
                    <path d="M494 280v-57m0 30c-15 0-24-11-25-22 17 0 25 10 25 22Zm0-14c17-1 24-12 24-23-16 1-24 11-24 23Zm0-4c-11-3-17-12-15-24 11 2 17 13 15 24Z" fill="#6E8874"/>
                    <path d="m480 273 5 29h20l6-29h-31Z" fill="#D9BC88"/>
                    <path d="M253 109c30-24 64-18 88 2" stroke="#9BAA8D" stroke-width="1.5" stroke-dasharray="3 6" stroke-linecap="round"/>
                    <rect x="265" y="63" width="49" height="39" rx="12" fill="#FFFEF7" stroke="#D0D8C5"/>
                    <path d="m278 77 10 3 11-3v14l-11 3-10-3V77Zm10 3v14" stroke="#6E8874" stroke-width="1.6" stroke-linejoin="round"/>
                    <path d="m300 102-3 7-6-7" fill="#FFFEF7"/>
                    <path d="M82 207h8m-4-4v8m263-49h7m-3-3v6" stroke="#C8A45E" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="249" cy="181" r="3" fill="#C8A45E"/><circle cx="465" cy="121" r="3" fill="#B96342"/>
                </svg>
                <p><span></span>{{ copy.artCaption }}<span></span></p>
            </div>

            <section id="reader-auth" class="reader-auth-area" :aria-label="copy.panelLabel" tabindex="-1">
                <div class="reader-card">
                    <div class="reader-tabs" role="tablist" :aria-label="copy.panelLabel" @keydown="navigateTabs">
                        <button id="reader-login-tab" ref="loginTab" type="button" role="tab" aria-controls="reader-login-panel"
                            :aria-selected="mode === 'login' ? 'true' : 'false'" :tabindex="mode === 'login' ? 0 : -1" :disabled="busy" @click="selectMode('login')">{{ copy.loginTab }}</button>
                        <button id="reader-signup-tab" ref="signupTab" type="button" role="tab" aria-controls="reader-signup-panel"
                            :aria-selected="mode === 'signup' ? 'true' : 'false'" :tabindex="mode === 'signup' ? 0 : -1" :disabled="busy" @click="selectMode('signup')">{{ copy.signupTab }}</button>
                    </div>
                    <div v-show="mode === 'login'" id="reader-login-panel" role="tabpanel" aria-labelledby="reader-login-tab">
                        <div class="reader-card-intro"><span>{{ copy.loginEyebrow }}</span><h2>{{ copy.loginTitle }}</h2><p>{{ copy.loginDescription }}</p></div>
                        <form ref="loginForm" class="reader-form" :aria-label="copy.loginTab" :aria-busy="busy ? 'true' : 'false'" @submit.prevent="submitLogin">
                            <div class="reader-field">
                                <label for="reader-login-username">{{ copy.username }}</label>
                                <input id="reader-login-username" v-model="login.username" name="username" type="text" required autocomplete="username" autocapitalize="none" spellcheck="false" :placeholder="copy.usernamePlaceholder" :disabled="busy" :aria-invalid="Boolean(errors.username)" :aria-describedby="errors.username ? 'reader-login-username-error' : undefined" @input="clearError('username')" />
                                <p v-if="errors.username" id="reader-login-username-error" class="reader-field-error">{{ errors.username }}</p>
                            </div>
                            <div class="reader-field">
                                <label for="reader-login-password">{{ copy.password }}</label>
                                <div class="reader-password-wrap">
                                    <input id="reader-login-password" v-model="login.password" name="password" :type="showLoginPassword ? 'text' : 'password'" required autocomplete="current-password" :disabled="busy" :aria-invalid="Boolean(errors.password)" :aria-describedby="errors.password ? 'reader-login-password-error' : undefined" @input="clearError('password')" />
                                    <button class="reader-password-toggle" type="button" :disabled="busy" aria-controls="reader-login-password" :aria-label="showLoginPassword ? copy.hidePassword : copy.showPassword" :aria-pressed="showLoginPassword ? 'true' : 'false'" @click="showLoginPassword = !showLoginPassword"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/><path v-if="showLoginPassword" d="m3 3 18 18"/></svg></button>
                                </div>
                                <p v-if="errors.password" id="reader-login-password-error" class="reader-field-error">{{ errors.password }}</p>
                            </div>
                            <div class="reader-forgot"><a :href="$router.resolve({ name: 'login-with-otc-to-reset-password' }).href" :aria-disabled="busy ? 'true' : 'false'" @click.prevent="goTo('login-with-otc-to-reset-password')">{{ copy.forgot }}</a></div>
                            <p v-if="message" class="reader-form-error" role="alert" tabindex="-1">{{ message }}</p>
                            <button class="reader-submit" type="submit" :disabled="busy"><span v-if="busy" class="reader-spinner" aria-hidden="true"></span>{{ busy ? copy.signingIn : copy.loginButton }}<span v-if="!busy" aria-hidden="true">↗</span></button>
                        </form>
                    </div>

                    <div v-show="mode === 'signup'" id="reader-signup-panel" role="tabpanel" aria-labelledby="reader-signup-tab">
                        <div class="reader-card-intro"><span>{{ copy.signupEyebrow }}</span><h2>{{ copy.signupTitle }}</h2><p>{{ copy.signupDescription }}</p></div>
                        <form ref="signupForm" class="reader-form" :aria-label="copy.signupTab" :aria-busy="busy ? 'true' : 'false'" @submit.prevent="submitSignup()">
                            <p v-if="accountCreated" class="reader-notice" role="status">{{ copy.accountCreated }}</p>
                            <template v-else-if="verifying">
                                <div class="reader-verification-intro"><span aria-hidden="true">✉</span><h3>{{ copy.verifyTitle }}</h3><p>{{ copy.verifyDescription }} <strong>{{ signup.username }}</strong></p></div>
                                <div class="reader-field">
                                    <label for="reader-signup-code">{{ copy.codeLabel }}</label>
                                    <input id="reader-signup-code" :value="code" name="ot-code" type="text" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" maxlength="6" required :disabled="busy" :aria-invalid="Boolean(codeError)" :aria-describedby="codeError ? 'reader-signup-code-error' : undefined" @input="updateCode($event.target.value)" @paste.prevent="pasteCode" />
                                    <p v-if="codeError" id="reader-signup-code-error" class="reader-field-error">{{ codeError }}</p>
                                </div>
                                <div class="reader-code-actions"><span aria-live="off">{{ remaining ? copy.codeExpires.replace('{seconds}', remaining) : copy.codeExpired }}</span><button class="reader-text-button" type="button" :disabled="busy || remaining > 0" @click="submitSignup(true)">{{ copy.resendCode }}</button></div>
                            </template>
                            <template v-else>
                                <div class="reader-field-row">
                                    <div class="reader-field"><label for="reader-first-name">{{ copy.firstName }}</label><input id="reader-first-name" v-model="signup.first_name" name="first_name" type="text" required autocomplete="given-name" :disabled="busy" :aria-invalid="Boolean(errors.first_name)" :aria-describedby="errors.first_name ? 'reader-first-name-error' : undefined" @input="clearError('first_name')" /><p v-if="errors.first_name" id="reader-first-name-error" class="reader-field-error">{{ errors.first_name }}</p></div>
                                    <div class="reader-field"><label for="reader-last-name">{{ copy.lastName }}</label><input id="reader-last-name" v-model="signup.surname" name="surname" type="text" required autocomplete="family-name" :disabled="busy" :aria-invalid="Boolean(errors.surname)" :aria-describedby="errors.surname ? 'reader-last-name-error' : undefined" @input="clearError('surname')" /><p v-if="errors.surname" id="reader-last-name-error" class="reader-field-error">{{ errors.surname }}</p></div>
                                </div>
                                <div class="reader-field"><label for="reader-signup-username">{{ copy.username }}</label><input id="reader-signup-username" v-model="signup.username" name="username" type="text" required autocomplete="username" autocapitalize="none" spellcheck="false" :placeholder="copy.usernamePlaceholder" :disabled="busy" :aria-invalid="Boolean(errors.username)" :aria-describedby="errors.username ? 'reader-signup-username-error' : undefined" @input="clearError('username')" /><p v-if="errors.username" id="reader-signup-username-error" class="reader-field-error">{{ errors.username }}</p></div>
                                <div class="reader-field">
                                    <label for="reader-signup-password">{{ copy.password }}</label>
                                    <div class="reader-password-wrap"><input id="reader-signup-password" v-model="signup.password" name="password" :type="showSignupPassword ? 'text' : 'password'" required autocomplete="new-password" :disabled="busy" :aria-invalid="Boolean(errors.password)" :aria-describedby="errors.password ? 'reader-signup-password-error' : undefined" @input="clearError('password')" /><button class="reader-password-toggle" type="button" :disabled="busy" aria-controls="reader-signup-password" :aria-label="showSignupPassword ? copy.hidePassword : copy.showPassword" :aria-pressed="showSignupPassword ? 'true' : 'false'" @click="showSignupPassword = !showSignupPassword"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/><path v-if="showSignupPassword" d="m3 3 18 18"/></svg></button></div>
                                    <p v-if="errors.password" id="reader-signup-password-error" class="reader-field-error">{{ errors.password }}</p>
                                </div>
                                <div class="reader-field-row">
                                    <div class="reader-field"><label for="reader-dob">{{ copy.dob }}</label><input id="reader-dob" v-model="signup.dob" name="dob" type="date" required autocomplete="bday" :max="today" :disabled="busy" :aria-invalid="Boolean(errors.dob)" :aria-describedby="errors.dob ? 'reader-dob-error' : undefined" @input="clearError('dob')" /><p v-if="errors.dob" id="reader-dob-error" class="reader-field-error">{{ errors.dob }}</p></div>
                                    <div class="reader-field"><label for="reader-gender">{{ copy.gender }}</label><select id="reader-gender" v-model="signup.gender" name="gender" required :disabled="busy" :aria-invalid="Boolean(errors.gender)" :aria-describedby="errors.gender ? 'reader-gender-error' : undefined" @change="clearError('gender')"><option disabled value="">{{ copy.chooseGender }}</option><option value="f">{{ copy.female }}</option><option value="m">{{ copy.male }}</option><option value="o">{{ copy.other }}</option></select><p v-if="errors.gender" id="reader-gender-error" class="reader-field-error">{{ errors.gender }}</p></div>
                                </div>
                            </template>
                            <p v-if="message" class="reader-form-error" role="alert" tabindex="-1">{{ message }}</p>
                            <button class="reader-submit" type="submit" :disabled="busy || (verifying && !accountCreated && remaining === 0)"><span v-if="busy" class="reader-spinner" aria-hidden="true"></span>{{ signupButtonLabel }}<span v-if="!busy" aria-hidden="true">↗</span></button>
                            <button v-if="verifying && !accountCreated" class="reader-edit-details reader-text-button" type="button" :disabled="busy" @click="editDetails">{{ copy.editDetails }}</button>
                            <p v-if="!verifying && !accountCreated" class="reader-privacy-note">{{ copy.privacyIntro }} <a :href="$router.resolve({ name: 'privacy-policy' }).href" target="_blank" rel="noopener noreferrer">{{ copy.privacyLink }}</a></p>
                        </form>
                    </div>
                </div>
                <p class="reader-auth-caption"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 7V5a3 3 0 0 1 6 0v2M4 7h8v7H4V7Z"/></svg>{{ copy.authCaption }}</p>
            </section>
        </main>

        <footer class="reader-footer reader-container">
            <p>© {{ year }} Alor Feri<span aria-hidden="true">·</span>{{ copy.footerTagline }}</p>
            <nav :aria-label="copy.footerNavigation">
                <a :href="companyLinks.about" target="_blank" rel="noopener noreferrer">{{ copy.about }}</a>
                <a :href="companyLinks.careers" target="_blank" rel="noopener noreferrer">{{ copy.careers }}</a>
                <a :href="companyLinks.contact" target="_blank" rel="noopener noreferrer">{{ copy.contact }}</a>
                <a :href="$router.resolve({ name: 'help' }).href" @click.prevent="goTo('help')">{{ copy.help }}</a>
                <a :href="$router.resolve({ name: 'privacy-policy' }).href" @click.prevent="goTo('privacy-policy')">{{ copy.privacy }}</a>
            </nav>
        </footer>
    </div>
</template>

<script>
import { companyLinks } from "@/config/company";

const COPY = {
    en: {
        skip: "Skip to sign in", homeLabel: "Alor Feri home", brandCaption: "A home for readers", language: "Choose language",
        eyebrow: "A library-based social network", titleStart: "Where readers", titleEnd: "and libraries connect.",
        description: "Discover books, connect with libraries, and share your reading journey. Find your people, one page at a time.",
        discover: "Discover books", connect: "Find your library", share: "Share your thoughts", artCaption: "Good books. Great company.",
        authCaption: "Your next chapter starts here.", footerTagline: "Connecting readers & libraries.", footerNavigation: "Useful links",
        about: "About", careers: "Careers", contact: "Contact", help: "Help", privacy: "Privacy",
        panelLabel: "Sign in or create an account", loginTab: "Log in", signupTab: "Create account",
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
        skip: "লগইন ফর্মে যান", homeLabel: "আলোর ফেরী হোম", brandCaption: "বইপড়ুয়াদের আপন ঠিকানা", language: "ভাষা বেছে নিন",
        eyebrow: "পাঠাগারভিত্তিক সামাজিক নেটওয়ার্ক", titleStart: "বই, পাঠক আর পাঠাগার—", titleEnd: "একই ঠিকানায়।",
        description: "নতুন বই আবিষ্কার করুন, পাঠাগারের সঙ্গে যুক্ত হোন আর ভাগ করে নিন আপনার পড়ার গল্প। বইয়ের পাতায় পাতায় খুঁজে নিন আপন মানুষ।",
        discover: "নতুন বই খুঁজুন", connect: "পাঠাগারের সঙ্গে যুক্ত হোন", share: "পড়ার গল্প বলুন", artCaption: "ভালো বই, ভালো সঙ্গ।",
        authCaption: "আপনার নতুন অধ্যায়ের শুরু এখানেই।", footerTagline: "পাঠক ও পাঠাগারকে যুক্ত করি।", footerNavigation: "প্রয়োজনীয় লিংক",
        about: "আমাদের সম্পর্কে", careers: "ক্যারিয়ার", contact: "যোগাযোগ", help: "সাহায্য", privacy: "গোপনীয়তা",
        panelLabel: "লগইন করুন অথবা অ্যাকাউন্ট খুলুন", loginTab: "লগইন", signupTab: "অ্যাকাউন্ট খুলুন",
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

export default {
    name: "Welcome",
    data() {
        return {
            companyLinks, year: new Date().getFullYear(), mode: "login", busy: false,
            login: { username: "", password: "" },
            signup: { first_name: "", surname: "", username: "", password: "", dob: "", gender: "" },
            showLoginPassword: false, showSignupPassword: false, errors: {}, message: "",
            verifying: false, accountCreated: false, code: "", codeError: "", deadline: 0,
            now: Date.now(), timer: null, loginPhase: ""
        };
    },
    computed: {
        language() { return this.$store.getters.activeLanguage === "bn" ? "bn" : "en"; },
        copy() { return COPY[this.language]; },
        today() { return this.formatDate(new Date(), "YYYY-MM-DD", "en"); },
        remaining() { return Math.max(0, Math.ceil((this.deadline - this.now) / 1000)); },
        signupButtonLabel() {
            if (this.busy) return this.accountCreated ? this.copy.signingIn : this.copy.working;
            return this.accountCreated ? this.copy.retryLogin : this.verifying ? this.copy.verifyButton : this.copy.signupButton;
        }
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
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            this._readerViewport = viewport.getAttribute("content");
            viewport.setAttribute("content", "width=device-width, initial-scale=1");
        }
        // The surrounding App shell is shared with other pages. Scope its override
        // to this component's lifetime instead of changing App.vue or its layouts.
        this.$nextTick(() => {
            if (!this._readerLeaving) document.getElementById("app").classList.add("reader-welcome-active");
        });
        document.documentElement.lang = this.language;
    },
    beforeDestroy() {
        this._readerLeaving = true;
        if (this._readerCancel) this._readerCancel.cancel();
        this.clearTimer();
        this.login.password = "";
        this.signup.password = "";
        this.code = "";
        const app = document.getElementById("app");
        if (app) app.classList.remove("reader-welcome-active");
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
        selectMode(mode) {
            if (this.busy) return;
            this.mode = mode;
            this.errors = {};
            this.message = "";
            this.codeError = "";
        },
        navigateTabs(event) {
            if (this.busy || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
            event.preventDefault();
            this.selectMode(event.key === "Home" ? "login" : event.key === "End" ? "signup" : this.mode === "login" ? "signup" : "login");
            this.$nextTick(() => this.$refs[this.mode + "Tab"].focus());
        },
        goTo(name) { if (!this.busy) this.$router.push({ name }).catch(() => {}); },
        normalizeUsername(value) {
            const username = value.trim();
            return this.isNumber(username, "-", " ", ",", "+") ? this.formatBdMobileNumber(username) : username;
        },
        clearError(name) { this.$delete(this.errors, name); this.message = ""; },
        focusError() {
            this.$nextTick(() => {
                if (this._readerLeaving) return;
                const form = this.$refs[this.mode + "Form"];
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
            if (this.verifying && Object.keys(this.errors).some(name => Object.prototype.hasOwnProperty.call(this.signup, name))) {
                this.clearTimer();
                this.verifying = false;
            }
            this.codeError = this.errors["ot-code"] || this.errors.ot_code || "";
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
            this.login.password = "";
            this.signup.password = "";
            this.$store.commit("setToken", token);
            const from = this.$route.query.from;
            const destination = typeof from === "string" && /^\/(?!\/)/.test(from) && !from.includes("\\") && !/^\/(login|register)(\/|\?|#|$)/.test(from) ? from : "/";
            if (this.$route.fullPath !== destination) {
                await this.$router.replace(destination).catch(error => {
                    if (error.name !== "NavigationDuplicated") throw error;
                });
            }
        },
        async submitLogin() {
            if (this.busy) return;
            this.beginRequest();
            try { await this.authenticate(this.login.username, this.login.password); }
            catch (error) { this.showError(error); }
            finally { this.busy = false; this._readerCancel = null; }
        },
        clearTimer() { clearInterval(this.timer); this.timer = null; },
        updateCode(value) { this.code = value.replace(/\D/g, "").slice(0, 6); this.codeError = ""; this.message = ""; },
        pasteCode(event) { this.updateCode(event.clipboardData.getData("text")); },
        editDetails() {
            if (this.busy) return;
            this.clearTimer(); this.verifying = false; this.code = ""; this.codeError = ""; this.message = "";
        },
        startVerification(data, rejected) {
            this.verifying = true;
            this.code = "";
            this.codeError = rejected ? this.copy.invalidCode : "";
            const duration = Number(data && data.otc_expired_after_in_seconds);
            this.now = Date.now();
            this.deadline = this.now + (Number.isFinite(duration) && duration > 0 ? duration : 30) * 1000;
            this.clearTimer();
            this.timer = setInterval(() => {
                this.now = Date.now();
                if (this.now >= this.deadline) this.clearTimer();
            }, 1000);
            this.$nextTick(() => {
                if (this._readerLeaving) return;
                const input = this.$el.querySelector('#reader-signup-code');
                if (input) input.focus();
            });
        },
        async submitSignup(resend = false) {
            if (this.busy || (resend && this.remaining > 0)) return;
            if (this.verifying && !this.accountCreated && !resend && (this.remaining === 0 || !/^\d{6}$/.test(this.code))) {
                this.codeError = this.remaining === 0 ? this.copy.codeExpired : this.copy.invalidCode;
                this.focusError();
                return;
            }
            this.beginRequest();
            try {
                if (!this.accountCreated) {
                    const response = await this.$axios.post(this.$apiServerBaseUrl + "/api/auth/register-with-username", {
                        ...this.signup, username: this.normalizeUsername(this.signup.username)
                    }, { headers: { "ot-code": resend ? "" : this.code }, cancelToken: this._readerCancel.token });
                    const result = response.data;
                    if (result.status === "OTC_GENERATED" || result.status === "OTC_REJECTED") {
                        this.startVerification(result.data, result.status === "OTC_REJECTED");
                        return;
                    }
                    if (result.status !== "OK") throw new Error("Unexpected registration response");
                    this.accountCreated = true;
                    this.clearTimer();
                    this.code = "";
                }
                await this.authenticate(this.signup.username, this.signup.password);
            } catch (error) { this.showError(error); }
            finally { this.busy = false; this._readerCancel = null; }
        }
    }
};
</script>

<style>
/* These overrides exist only while the visitor's Welcome component is mounted. */
#app.reader-welcome-active > nav,
#app.reader-welcome-active > .container > .border-top { display: none; }
#app.reader-welcome-active > .container { max-width: none; width: 100%; margin-top: 0 !important; padding: 0; }
</style>

<style scoped>
.reader-welcome { min-height: 100vh; min-height: 100dvh; display: flex; flex-direction: column; color: #24342c; background: #f7f4ec; background-image: radial-gradient(ellipse at 7% 38%, #e9eddf80, transparent 48%); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; text-align: left; }
.reader-welcome *, .reader-welcome *::before, .reader-welcome *::after { box-sizing: border-box; }
.reader-container { width: 100%; max-width: 1200px; margin: 0 auto; padding-left: 36px; padding-right: 36px; }
.reader-header { display: flex; justify-content: space-between; align-items: center; padding-top: 27px; padding-bottom: 25px; }
.reader-brand { display: inline-flex; align-items: center; gap: 13px; color: #174b3a; text-decoration: none; font-size: 23px; font-weight: 650; letter-spacing: -.6px; line-height: 1.2; }
.reader-brand img { width: 44px; height: 44px; object-fit: contain; }
.reader-brand small { display: block; font-size: 9px; text-transform: uppercase; letter-spacing: 1.65px; font-weight: 500; color: #65716a; margin-top: 5px; }
.reader-language { display: inline-flex; align-items: center; border: 1px solid #dce1d5; border-radius: 8px; padding: 1px 4px; background: #ffffff4d; }
.reader-language button { min-width: 44px; min-height: 44px; border: 0; padding: 5px 10px; border-radius: 6px; background: transparent; color: #65716a; font-size: 12px; cursor: pointer; }
.reader-language button[aria-pressed="true"] { font-weight: 700; color: #174b3a; }
.reader-language > span { width: 1px; height: 13px; background: #dce1d5; }
.reader-main { flex: 1; display: grid; grid-template-columns: minmax(0, 1fr) minmax(360px, 420px); grid-template-rows: auto auto; align-content: center; align-items: start; column-gap: clamp(36px, 5vw, 80px); padding-top: 30px; padding-bottom: 45px; }
.reader-story { grid-column: 1; grid-row: 1; padding-top: 13px; }
.reader-eyebrow { display: flex; align-items: center; gap: 9px; margin: 0 0 23px; font-size: 10px; font-weight: 650; line-height: 1.5; letter-spacing: 2.3px; text-transform: uppercase; color: #60745e; }
.reader-eyebrow > span { width: 6px; height: 6px; border-radius: 50%; background: #b96342; }
.reader-story h1 { max-width: 600px; margin: 0 0 22px; color: #243e31; font: 400 clamp(44px, 4.6vw, 60px)/1.12 Georgia, "Times New Roman", serif; letter-spacing: -2px; }
.reader-story h1 em { color: #45694e; font-weight: 400; }
.reader-description { max-width: 445px; margin: 0 0 25px; color: #65716a; font-size: 15px; line-height: 1.85; }
.reader-values { list-style: none; display: flex; gap: 11px 21px; flex-wrap: wrap; margin: 0; padding: 0; color: #526650; font-size: 11px; font-weight: 550; }
.reader-values li { display: inline-flex; align-items: center; gap: 6px; }
.reader-values svg { width: 17px; height: 17px; fill: none; stroke: #60745e; stroke-width: 1.4; stroke-linejoin: round; stroke-linecap: round; }
.reader-art { grid-column: 1; grid-row: 2; align-self: end; margin: 2px -25px -12px -20px; }
.reader-art > svg { display: block; width: 100%; max-width: 590px; height: auto; }
.reader-art p { display: flex; justify-content: center; align-items: center; gap: 12px; margin: -11px 0 0; color: #65716a; font: italic 12px Georgia, serif; }
.reader-art p span { width: 30px; height: 1px; background: #d6dccc; }
.reader-auth-area { grid-column: 2; grid-row: 1 / 3; align-self: center; min-width: 0; outline: none; }
.reader-card { width: 100%; padding: 30px; background: #fff; border: 1px solid #e4e7df; border-radius: 22px; box-shadow: 0 20px 60px -30px #153e2f30, 0 2px 8px #153e2f04; }
.reader-tabs { display: flex; padding: 4px; gap: 4px; background: #f2f4ef; border-radius: 10px; margin-bottom: 28px; }
.reader-tabs button { flex: 1; min-width: 0; min-height: 44px; border: 0; border-radius: 7px; background: transparent; color: #65716a; font-size: 14px; font-weight: 650; cursor: pointer; }
.reader-tabs button[aria-selected="true"] { background: white; color: #174b3a; box-shadow: 0 1px 5px #153e2f12; }
.reader-card-intro { margin-bottom: 24px; }
.reader-card-intro > span { display: block; color: #65716a; font-size: 9px; font-weight: 700; letter-spacing: 1.6px; text-transform: uppercase; margin-bottom: 9px; }
.reader-card-intro h2 { margin: 0 0 8px; color: #24342c; font: 400 29px/1.25 Georgia, "Times New Roman", serif; letter-spacing: -.6px; }
.reader-card-intro p { margin: 0; font-size: 13px; line-height: 1.65; color: #65716a; }
.reader-form { margin: 0; }
.reader-field { margin-bottom: 17px; min-width: 0; }
.reader-field label { display: block; margin: 0 0 7px; color: #344a3e; font-size: 12px; line-height: 1.5; font-weight: 650; }
.reader-field input, .reader-field select { display: block; width: 100%; min-width: 0; height: 48px; padding: 0 13px; border: 1px solid #dbe1d8; border-radius: 8px; background: #fff; color: #24342c; font: inherit; font-size: 14px; line-height: 1.5; transition: border-color .15s, box-shadow .15s; }
.reader-field input::placeholder { color: #6b776f; opacity: 1; }
.reader-field input:focus, .reader-field select:focus { border-color: #174b3a; outline: 2px solid #174b3a26; outline-offset: 2px; }
.reader-field input[aria-invalid="true"], .reader-field select[aria-invalid="true"] { border-color: #ad342c; }
.reader-field input:disabled, .reader-field select:disabled { background: #f6f7f3; cursor: wait; }
.reader-password-wrap { position: relative; }
.reader-password-wrap input { padding-right: 49px; }
.reader-password-toggle { position: absolute; right: 2px; top: 2px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: transparent; border: 0; border-radius: 6px; color: #65716a; cursor: pointer; }
.reader-password-toggle svg { width: 19px; height: 19px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.reader-forgot { margin: -5px 0 9px; text-align: right; }
.reader-forgot a, .reader-privacy-note a { color: #174b3a; text-decoration: underline; text-underline-offset: 3px; }
.reader-forgot a { display: inline-flex; align-items: center; min-height: 44px; font-size: 12px; font-weight: 600; }
.reader-submit { display: flex; justify-content: center; align-items: center; gap: 11px; width: 100%; min-height: 49px; padding: 12px 16px; color: #fff; background: #174b3a; border: 1px solid #174b3a; border-radius: 8px; font-size: 14px; line-height: 1.5; font-weight: 650; cursor: pointer; transition: background .15s, transform .15s; }
.reader-submit:hover:not(:disabled) { background: #103d2e; transform: translateY(-1px); }
.reader-submit:disabled { opacity: .68; cursor: default; }
.reader-submit > span:last-child:not(.reader-spinner) { font-size: 19px; font-weight: 400; line-height: 1; }
.reader-field-row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 12px; }
.reader-field-error { margin: 6px 0 0; color: #a03029; font-size: 12px; line-height: 1.5; }
.reader-form-error { margin: 0 0 15px; border: 1px solid #edd7d0; border-radius: 8px; padding: 10px 12px; background: #fff5f1; color: #9b3025; font-size: 13px; line-height: 1.6; }
.reader-privacy-note { margin: 17px 0 0; color: #65716a; font-size: 11px; line-height: 1.7; text-align: center; }
.reader-spinner { display: inline-block; width: 15px; height: 15px; border: 2px solid #ffffff55; border-top-color: #fff; border-radius: 50%; animation: reader-spin .7s linear infinite; }
.reader-verification-intro { text-align: center; margin-bottom: 22px; }
.reader-verification-intro > span { display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; margin-bottom: 14px; background: #eef3eb; color: #174b3a; font-size: 23px; border-radius: 50%; }
.reader-verification-intro h3 { font: 400 23px Georgia, serif; color: #24342c; margin: 0 0 10px; }
.reader-verification-intro p { color: #65716a; font-size: 13px; line-height: 1.7; overflow-wrap: anywhere; }
.reader-code-actions { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 4px; margin: -4px 0 14px; color: #65716a; font-size: 12px; }
.reader-text-button { min-height: 44px; padding: 8px 0; border: 0; color: #174b3a; background: transparent; font: inherit; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
.reader-text-button:disabled { color: #65716a; text-decoration: none; cursor: default; }
.reader-edit-details { display: block; margin: 8px auto 0; font-size: 12px; }
.reader-notice { padding: 14px; background: #eef5eb; color: #174b3a; border-radius: 8px; font-size: 14px; line-height: 1.7; }
.reader-auth-caption { display: flex; align-items: center; justify-content: center; gap: 6px; margin: 18px 0 0; color: #65716a; font-size: 10px; letter-spacing: .1px; }
.reader-auth-caption svg { width: 12px; height: 12px; stroke: currentColor; stroke-width: 1.2; stroke-linecap: round; stroke-linejoin: round; fill: none; }
.reader-footer { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px 24px; border-top: 1px solid #dce1d5; padding-top: 16px; padding-bottom: 19px; color: #65716a; font-size: 11px; }
.reader-footer p { margin: 0; }
.reader-footer p > span { padding: 0 10px; }
.reader-footer nav { display: flex; gap: 4px 18px; flex-wrap: wrap; }
.reader-footer a { display: inline-flex; align-items: center; min-height: 44px; color: #65716a; text-decoration: none; }
.reader-footer a:hover { color: #174b3a; text-decoration: underline; text-underline-offset: 3px; }
.reader-welcome button:focus-visible, .reader-welcome a:focus-visible { outline: 3px solid #b96342; outline-offset: 4px; }
.reader-skip { position: fixed; top: -70px; left: 16px; z-index: 10000; background: #174b3a; color: #fff; padding: 12px 20px; border-radius: 8px; }
.reader-skip:focus { top: 12px; }
@keyframes reader-spin { to { transform: rotate(360deg); } }
@media (max-width: 959px) {
    .reader-container { max-width: 620px; padding-left: 24px; padding-right: 24px; }
    .reader-header { padding-top: 20px; padding-bottom: 20px; }
    .reader-main { display: flex; flex-direction: column; align-items: center; padding-top: 17px; padding-bottom: 25px; }
    .reader-story { padding-top: 0; text-align: center; width: 100%; }
    .reader-eyebrow { justify-content: center; margin-bottom: 15px; font-size: 9px; letter-spacing: 1.7px; }
    .reader-story h1 { max-width: 480px; margin: 0 auto 15px; font-size: clamp(34px, 6vw, 45px); letter-spacing: -1.3px; }
    .reader-description { max-width: 390px; margin: 0 auto 20px; font-size: 14px; line-height: 1.7; }
    .reader-values { justify-content: center; margin-bottom: 27px; gap: 10px 16px; font-size: 10px; }
    .reader-auth-area { order: 2; width: 100%; max-width: 420px; align-self: center; }
    .reader-art { order: 3; width: 100%; max-width: 440px; margin: 25px 0 4px; }
    .reader-field input, .reader-field select { font-size: 16px; }
    .reader-footer { justify-content: center; text-align: center; gap: 3px; padding-top: 14px; padding-bottom: 14px; }
    .reader-footer nav { justify-content: center; }
    .reader-footer p { width: 100%; }
}
@media (max-width: 399px) {
    .reader-container { padding-left: 20px; padding-right: 20px; }
    .reader-brand { gap: 8px; font-size: 20px; }
    .reader-brand small { font-size: 8px; letter-spacing: 1.1px; }
    .reader-values { column-gap: 10px; font-size: 9px; }
    .reader-card { padding: 23px 20px; }
    .reader-field-row { gap: 10px; }
    .reader-field input, .reader-field select { padding-left: 10px; }
    .reader-footer p > span { padding: 0 7px; }
}
@media (prefers-reduced-motion: reduce) { .reader-welcome *, .reader-welcome *::before, .reader-welcome *::after { animation: none !important; transition: none !important; } }
</style>
