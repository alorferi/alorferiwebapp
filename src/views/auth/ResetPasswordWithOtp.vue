<template>
    <div>
        <div class="row pt-5">
            <div class=" col-sm-4"></div>

            <div class=" col-sm-4 text-center card">
                <h4>Reset Password</h4>

                <form
                    id="loginWithOtpForm"
                    class="otp_enabled_form"
                    @submit.prevent="submitForm"
                >
                    <div class="form-group">
                        <MobileNumberField
                            name="username"
                            placeholder="Type mobile number here"
                            :errors="errors"
                            @update:field="resetPasswordModel.username = $event"
                        ></MobileNumberField>
                    </div>

                    <AskForOtp
                        :showOtpModal="showOtpModal"
                        :durationInSeconds="durationInSeconds"
                        @updateOtp="updateOtp"
                    ></AskForOtp>

                    <div class="form-group">
                        <button type="submit" class="btn btn-success btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            <div class=" col-sm-4"></div>
        </div>
    </div>
</template>
<script>
import MobileNumberField from "../../components/MobileNumberField";
import AskForOtp from "../../components/AskForOtp";

export default {
    name: "ResetPasswordWithOtp",
    components: {
        MobileNumberField,
        AskForOtp
    },
    data() {
        return {
            resetPasswordModel: {
                otp_type_name: "RESET_PASSWORD",
                username: "",
                otp_code: ""
            },
            durationInSeconds: 0,
            showOtpModal: false,
            errors: null
        };
    },

    methods: {
        updateOtp(value) {
            this.resetPasswordModel.otp_code = value;
            this.submitForm();
        },

        submitForm: function() {
            console.log(this.resetPasswordModel);
            const self = this;
            this.$axios
                .post(
                    self.getApiUrl("/api/auth/login-with-otp"),
                    self.resetPasswordModel
                )
                .then(response => {
                    console.log(response.data.data);

                    switch (response.data.status) {
                        case "OK":
                            window.location.href = "/auth/login";
                            break;
                        case "OTP_GENERATED":
                        case "OTP_REJECTED":
                            var otp_expired_after_in_seconds =
                                response.data.data.otp_expired_after_in_seconds;
                            self.durationInSeconds = otp_expired_after_in_seconds;
                            self.showOtpModal = true;

                            break;
                    }

                    // this.$router.push("/auth/login");
                })
                .catch(errors => {
                    console.log(errors);
                    if (errors.response.data.errors) {
                        self.errors = errors.response.data.errors;
                    }

                    self.resetPasswordModel.otp_code = null;
                });
        }
    }
};
</script>
