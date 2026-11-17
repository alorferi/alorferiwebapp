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
                <img
                    class="reader-illustration"
                    src="@/assets/illustrations/home-readers-bench.svg"
                    width="600"
                    height="350"
                    alt=""
                    decoding="async"
                />
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
