<template>
    <div class="reader-welcome reader-page reader-register-page">
        <a class="reader-skip" href="#reader-auth">{{ copy.skipSignup }}</a>
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
        <main class="reader-register-main reader-container">
            <section id="reader-auth" class="reader-card reader-register-card" aria-labelledby="reader-signup-title" tabindex="-1">
                <div class="reader-card-intro reader-register-intro"><h1 id="reader-signup-title">{{ copy.signupTitle }}</h1><p>{{ copy.signupDescription }}</p></div>
                <form ref="authForm" class="reader-form" aria-labelledby="reader-signup-title" :aria-busy="busy ? 'true' : 'false'" @submit.prevent="submitSignup()">
                    <p v-if="accountCreated" class="reader-notice" role="status">{{ copy.accountCreated }}</p>
                    <template v-else-if="verifying">
                        <div class="reader-verification-intro"><span aria-hidden="true">✉</span><h2>{{ copy.verifyTitle }}</h2><p>{{ copy.verifyDescription }} <strong>{{ signup.username }}</strong></p></div>
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
                            <div class="reader-password-wrap"><input id="reader-signup-password" v-model="signup.password" name="password" :type="showPassword ? 'text' : 'password'" required autocomplete="new-password" :disabled="busy" :aria-invalid="Boolean(errors.password)" :aria-describedby="errors.password ? 'reader-signup-password-error' : undefined" @input="clearError('password')" /><button class="reader-password-toggle" type="button" :disabled="busy" aria-controls="reader-signup-password" :aria-label="showPassword ? copy.hidePassword : copy.showPassword" :aria-pressed="showPassword ? 'true' : 'false'" @click="showPassword = !showPassword"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/><path v-if="showPassword" d="m3 3 18 18"/></svg></button></div>
                            <p v-if="errors.password" id="reader-signup-password-error" class="reader-field-error">{{ errors.password }}</p>
                        </div>
                        <div class="reader-field-row">
                            <div class="reader-field"><label for="reader-dob">{{ copy.dob }}</label><input id="reader-dob" v-model="signup.dob" name="dob" type="date" required autocomplete="bday" :max="today" :disabled="busy" :aria-invalid="Boolean(errors.dob)" :aria-describedby="errors.dob ? 'reader-dob-error' : undefined" @input="clearError('dob')" /><p v-if="errors.dob" id="reader-dob-error" class="reader-field-error">{{ errors.dob }}</p></div>
                            <div class="reader-field"><label for="reader-gender">{{ copy.gender }}</label><select id="reader-gender" v-model="signup.gender" name="gender" required :disabled="busy" :aria-invalid="Boolean(errors.gender)" :aria-describedby="errors.gender ? 'reader-gender-error' : undefined" @change="clearError('gender')"><option disabled value="">{{ copy.chooseGender }}</option><option value="f">{{ copy.female }}</option><option value="m">{{ copy.male }}</option><option value="o">{{ copy.other }}</option></select><p v-if="errors.gender" id="reader-gender-error" class="reader-field-error">{{ errors.gender }}</p></div>
                        </div>
                    </template>
                    <p v-if="message" class="reader-form-error" role="alert" tabindex="-1">{{ message }}</p>
                    <button class="reader-submit" type="submit" :disabled="busy || (verifying && !accountCreated && remaining === 0)"><span v-if="busy" class="reader-spinner" aria-hidden="true"></span>{{ signupButtonLabel }}</button>
                    <button v-if="verifying && !accountCreated" class="reader-edit-details reader-text-button" type="button" :disabled="busy" @click="editDetails">{{ copy.editDetails }}</button>
                    <p v-if="!verifying && !accountCreated" class="reader-privacy-note">{{ copy.privacyIntro }} <a :href="$router.resolve({ name: 'privacy-policy' }).href" target="_blank" rel="noopener noreferrer">{{ copy.privacyLink }}</a></p>
                </form>
                <p class="reader-account-link"><router-link :to="homeLocation">{{ copy.existingAccount }}</router-link></p>
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
import readerAuth from "./readerAuth";
export default {
  name: "Register",
  mixins: [readerAuth],
  data() {
    return {
      signup: {
        first_name: "",
        surname: "",
        username: "",
        password: "",
        dob: "",
        gender: ""
      },
      verifying: false,
      accountCreated: false,
      code: "",
      codeError: "",
      deadline: 0,
      now: Date.now(),
      timer: null
    };
  },
  computed: {
    today() {
      return this.formatDate(new Date(), "YYYY-MM-DD", "en");
    },
    remaining() {
      return Math.max(0, Math.ceil((this.deadline - this.now) / 1000));
    },
    signupButtonLabel() {
      if (this.busy) return this.accountCreated ? this.copy.signingIn : this.copy.working;
      return this.accountCreated ? this.copy.retryLogin : this.verifying ? this.copy.verifyButton : this.copy.signupButton;
    }
  },
  methods: {
    clearSecrets() {
      this.signup.password = "";
      this.code = "";
    },
    onFieldErrors() {
      if (this.verifying && Object.keys(this.errors).some(name => Object.prototype.hasOwnProperty.call(this.signup, name))) {
        this.clearTimer();
        this.verifying = false;
      }
      this.codeError = this.errors["ot-code"] || this.errors.ot_code || "";
    },
    clearTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
    updateCode(value) {
      this.code = value.replace(/\D/g, "").slice(0, 6);
      this.codeError = "";
      this.message = "";
    },
    pasteCode(event) {
      this.updateCode(event.clipboardData.getData("text"));
    },
    editDetails() {
      if (this.busy) return;
      this.clearTimer();
      this.verifying = false;
      this.code = "";
      this.codeError = "";
      this.message = "";
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
      if (this.busy || resend && this.remaining > 0) return;
      if (this.verifying && !this.accountCreated && !resend && (this.remaining === 0 || !/^\d{6}$/.test(this.code))) {
        this.codeError = this.remaining === 0 ? this.copy.codeExpired : this.copy.invalidCode;
        this.focusError();
        return;
      }
      this.beginRequest();
      try {
        if (!this.accountCreated) {
          const response = await this.$axios.post(this.$apiServerBaseUrl + "/api/auth/register-with-username", {
            ...this.signup,
            username: this.normalizeUsername(this.signup.username)
          }, {
            headers: {
              "ot-code": resend ? "" : this.code
            },
            signal: this._readerCancel.signal
          });
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
      } catch (error) {
        this.showError(error);
      } finally {
        this.busy = false;
        this._readerCancel = null;
      }
    }
  }
};
</script>
