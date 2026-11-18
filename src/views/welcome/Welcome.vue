<template>
    <ReaderAuthLayout
        mode="login"
        :copy="copy"
        :language="language"
        :home-location="homeLocation"
        :company-links="companyLinks"
        :year="year"
        @language-change="setLanguage"
        @navigate="goTo"
    >
        <section id="reader-auth" class="reader-auth-area" :aria-label="copy.loginTab" tabindex="-1">
            <div class="reader-card reader-login-card">
                <div class="reader-card-intro">
                    <span>{{ copy.loginEyebrow }}</span>
                    <h2>{{ copy.loginTitle }}</h2>
                    <p>{{ copy.loginDescription }}</p>
                </div>
                <form
                    ref="authForm"
                    class="reader-form"
                    :aria-label="copy.loginTab"
                    :aria-busy="busy ? 'true' : 'false'"
                    @submit.prevent="submitLogin"
                >
                    <div class="reader-field">
                        <label for="reader-login-username">{{ copy.username }}</label>
                        <input
                            id="reader-login-username"
                            v-model="login.username"
                            name="username"
                            type="text"
                            required
                            autocomplete="username"
                            autocapitalize="none"
                            spellcheck="false"
                            :placeholder="copy.usernamePlaceholder"
                            :disabled="busy"
                            :aria-invalid="Boolean(errors.username)"
                            :aria-describedby="errors.username ? 'reader-login-username-error' : undefined"
                            @input="clearError('username')"
                        />
                        <p v-if="errors.username" id="reader-login-username-error" class="reader-field-error">
                            {{ errors.username }}
                        </p>
                    </div>
                    <div class="reader-field">
                        <label for="reader-login-password">{{ copy.password }}</label>
                        <div class="reader-password-wrap">
                            <input
                                id="reader-login-password"
                                v-model="login.password"
                                name="password"
                                :type="showPassword ? 'text' : 'password'"
                                required
                                autocomplete="current-password"
                                :disabled="busy"
                                :aria-invalid="Boolean(errors.password)"
                                :aria-describedby="errors.password ? 'reader-login-password-error' : undefined"
                                @input="clearError('password')"
                            />
                            <button
                                class="reader-password-toggle"
                                type="button"
                                :disabled="busy"
                                aria-controls="reader-login-password"
                                :aria-label="showPassword ? copy.hidePassword : copy.showPassword"
                                :aria-pressed="showPassword ? 'true' : 'false'"
                                @click="showPassword = !showPassword"
                            >
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                                    <circle cx="12" cy="12" r="3" />
                                    <path v-if="showPassword" d="m3 3 18 18" />
                                </svg>
                            </button>
                        </div>
                        <p v-if="errors.password" id="reader-login-password-error" class="reader-field-error">
                            {{ errors.password }}
                        </p>
                    </div>
                    <div class="reader-forgot">
                        <a
                            :href="$router.resolve({ name: 'login-with-otc-to-reset-password' }).href"
                            :aria-disabled="busy ? 'true' : 'false'"
                            @click.prevent="goTo('login-with-otc-to-reset-password')"
                            >{{ copy.forgot }}</a
                        >
                    </div>
                    <p v-if="message" class="reader-form-error" role="alert" tabindex="-1">{{ message }}</p>
                    <button class="reader-submit" type="submit" :disabled="busy">
                        <span v-if="busy" class="reader-spinner" aria-hidden="true"></span
                        >{{ busy ? copy.signingIn : copy.loginButton
                        }}<span v-if="!busy" aria-hidden="true">↗</span>
                    </button>
                </form>
                <router-link class="reader-create-button" :to="registerLocation">{{
                    copy.createAccount
                }}</router-link>
            </div>
        </section>
    </ReaderAuthLayout>
</template>

<script>
import readerAuth from "@/views/auth/readerAuth";
import ReaderAuthLayout from "@/views/auth/ReaderAuthLayout.vue";
export default {
  name: "Welcome",
  components: { ReaderAuthLayout },
  mixins: [readerAuth],
  data() {
    return {
      login: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    clearSecrets() {
      this.login.password = "";
    },
    async submitLogin() {
      if (this.busy) return;
      this.beginRequest();
      try {
        await this.authenticate(this.login.username, this.login.password);
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
