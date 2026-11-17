<template>
    <div class="reader-welcome reader-page">
        <a class="reader-skip" href="#reader-auth">{{ copy.skip }}</a>
        <header class="reader-header reader-container">
            <router-link class="reader-brand" :to="homeLocation" :aria-label="copy.homeLabel">
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

            <section id="reader-auth" class="reader-auth-area" :aria-label="copy.loginTab" tabindex="-1">
                <div class="reader-card reader-login-card">
                    <div class="reader-card-intro"><span>{{ copy.loginEyebrow }}</span><h2>{{ copy.loginTitle }}</h2><p>{{ copy.loginDescription }}</p></div>
                    <form ref="authForm" class="reader-form" :aria-label="copy.loginTab" :aria-busy="busy ? 'true' : 'false'" @submit.prevent="submitLogin">
                        <div class="reader-field">
                            <label for="reader-login-username">{{ copy.username }}</label>
                            <input id="reader-login-username" v-model="login.username" name="username" type="text" required autocomplete="username" autocapitalize="none" spellcheck="false" :placeholder="copy.usernamePlaceholder" :disabled="busy" :aria-invalid="Boolean(errors.username)" :aria-describedby="errors.username ? 'reader-login-username-error' : undefined" @input="clearError('username')" />
                            <p v-if="errors.username" id="reader-login-username-error" class="reader-field-error">{{ errors.username }}</p>
                        </div>
                        <div class="reader-field">
                            <label for="reader-login-password">{{ copy.password }}</label>
                            <div class="reader-password-wrap">
                                <input id="reader-login-password" v-model="login.password" name="password" :type="showPassword ? 'text' : 'password'" required autocomplete="current-password" :disabled="busy" :aria-invalid="Boolean(errors.password)" :aria-describedby="errors.password ? 'reader-login-password-error' : undefined" @input="clearError('password')" />
                                <button class="reader-password-toggle" type="button" :disabled="busy" aria-controls="reader-login-password" :aria-label="showPassword ? copy.hidePassword : copy.showPassword" :aria-pressed="showPassword ? 'true' : 'false'" @click="showPassword = !showPassword"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/><path v-if="showPassword" d="m3 3 18 18"/></svg></button>
                            </div>
                            <p v-if="errors.password" id="reader-login-password-error" class="reader-field-error">{{ errors.password }}</p>
                        </div>
                        <div class="reader-forgot"><a :href="$router.resolve({ name: 'login-with-otc-to-reset-password' }).href" :aria-disabled="busy ? 'true' : 'false'" @click.prevent="goTo('login-with-otc-to-reset-password')">{{ copy.forgot }}</a></div>
                        <p v-if="message" class="reader-form-error" role="alert" tabindex="-1">{{ message }}</p>
                        <button class="reader-submit" type="submit" :disabled="busy"><span v-if="busy" class="reader-spinner" aria-hidden="true"></span>{{ busy ? copy.signingIn : copy.loginButton }}<span v-if="!busy" aria-hidden="true">↗</span></button>
                    </form>
                    <router-link class="reader-create-button" :to="registerLocation">{{ copy.createAccount }}</router-link>
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
import readerAuth from "@/views/auth/readerAuth";

export default {
    name: "Welcome",
    mixins: [readerAuth],
    data() { return { login: { username: "", password: "" } }; },
    methods: {
        clearSecrets() { this.login.password = ""; },
        async submitLogin() {
            if (this.busy) return;
            this.beginRequest();
            try { await this.authenticate(this.login.username, this.login.password); }
            catch (error) { this.showError(error); }
            finally { this.busy = false; this._readerCancel = null; }
        }
    }
};
</script>
