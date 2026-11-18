<template>
    <section class="ui-card social-form-page p-4 sm:p-6" :aria-busy="saving ? 'true' : 'false'">
        <form ref="form" @submit.prevent="submitForm">
            <fieldset :disabled="saving" class="social-form-grid">
                <EditTextField
                    name="first_name"
                    type="text"
                    label="First Name"
                    :data="userData.first_name"
                    :errors="errors"
                    @update:field="userData.first_name = $event"
                />
                <EditTextField
                    name="surname"
                    type="text"
                    label="Last Name"
                    :data="userData.surname"
                    :errors="errors"
                    @update:field="userData.surname = $event"
                />
                <EditTextField
                    name="mobile"
                    type="tel"
                    label="Mobile"
                    :data="userData.mobile"
                    :errors="errors"
                    @update:field="userData.mobile = $event"
                />
                <EditTextField
                    name="email"
                    type="email"
                    label="Email"
                    :data="userData.email"
                    :errors="errors"
                    @update:field="userData.email = $event"
                />
                <EditTextField
                    name="dob"
                    type="date"
                    label="Date of birth"
                    :data="userData.dob"
                    :errors="errors"
                    @update:field="userData.dob = $event"
                />
                <GenderInputField
                    name="gender"
                    :label="$t('social.gender')"
                    :data="userData.gender"
                    :errors="errors"
                    @update:field="userData.gender = $event"
                />
                <p v-if="saveError" role="alert" tabindex="-1" class="text-danger social-form-actions">
                    {{ $t("social.requestError") }}
                </p>
                <div class="social-form-actions flex gap-3">
                    <router-link :to="{ name: 'users.me' }" class="ui-button ui-button-light">{{
                        $t("social.cancel")
                    }}</router-link>
                    <button type="submit" class="ui-button ui-button-primary">
                        {{ $t(saving ? "social.saving" : "social.save") }}
                    </button>
                </div>
            </fieldset>
        </form>
    </section>
</template>
<script>
import EditTextField from "@/components/EditTextField";
import GenderInputField from "@/components/GenderInputField";
export default {
    name: "EditMyProfile",
    components: { EditTextField, GenderInputField },
    data() {
        const user = this.$store.getters.activeUser;
        return {
            userData: {
                first_name: user.first_name || "",
                surname: user.surname || "",
                mobile: user.mobile || "",
                email: user.email || "",
                dob: user.dob ? user.dob.slice(0, 10) : "",
                gender: user.gender || "",
            },
            errors: {},
            saving: false,
            saveError: false,
        };
    },
    methods: {
        async submitForm() {
            if (this.saving) return;
            this.saving = true;
            this.saveError = false;
            this.errors = {};
            try {
                await this.$store.dispatch("updateMe", { formData: this.userData });
                if (!this._isDestroyed) await this.$router.push({ name: "users.me" });
            } catch (error) {
                this.errors = (error.response && error.response.data && error.response.data.errors) || {};
                this.saveError = true;
                this.$nextTick(() => {
                    const target =
                        this.$refs.form && this.$refs.form.querySelector('[aria-invalid="true"], [role="alert"]');
                    if (target) target.focus();
                });
            } finally {
                this.saving = false;
            }
        },
    },
};
</script>
