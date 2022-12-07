<template>
    <div>
        <div class="row pt-5">
            <div class=" col-sm-4"></div>

            <div class=" col-sm-4 text-center card">
                <h4>Reset Password</h4>

                <form
                    id="loginWithOtcForm"
                    class="otc_enabled_form"
                    @submit.prevent="submitForm"
                >
                    <div class="form-group">

                        <UserNameField
                            name="username"
                            label="E-mail or Mobile"
                            placeholder="Type E-mail or Mobile here"
                            icon="fas fa-at"
                            :errors="errors"
                            @update:field="resetPasswordModel.username = $event"
                        />

                    </div>

                    <AskForOtc
                        :showOtcModal="showOtcModal"
                        :durationInSeconds="durationInSeconds"
                        @updateOtc="updateOtc"
                        @onUpdateVisibleState="showOtcModal= $event"
                    ></AskForOtc>

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
import UserNameField from "../../components/UserNameField";
import AskForOtc from "../../components/AskForOtc";

export default {
    name: "ResetPasswordWithOtc",
    components: {
        UserNameField,
        AskForOtc
    },
    data() {
        return {
            resetPasswordModel: {
                otc_type_name: "RESET_PASSWORD",
                username: ""
            },
            ot_code: "",
            durationInSeconds: 0,
            showOtcModal: false,
            errors: null
        };
    },

    methods: {
        updateOtc(value) {
            this.ot_code = value;
            this.submitForm();
        },

        submitForm: function() {
            console.log(this.resetPasswordModel);
            const self = this;

            const headers = {
                "ot-code": self.ot_code
            };

            this.$axios
                .post(
                    self.getApiUrl("/api/auth/login-with-otc"),
                    self.resetPasswordModel,
                    {
                        headers: headers
                    }
                )
                .then(response => {
                    console.log(response.data.data);

                    switch (response.data.status) {
                        case "OK":
                            window.location.href = "/";
                            break;
                        case "OTC_GENERATED":
                        case "OTC_REJECTED":
                            var otc_expired_after_in_seconds =
                                response.data.data.otc_expired_after_in_seconds;
                            self.durationInSeconds = otc_expired_after_in_seconds;
                            self.showOtcModal = true;

                            break;
                    }

                    // this.$router.push("/auth/login");
                })
                .catch(errors => {
                    console.log(errors);

                    try {
                        if (errors.response.data.errors) {
                            self.errors = errors.response.data.errors;
                        }
                    } catch (err) {
                        self.errors = err;
                    }

                    self.ot_code = null;
                });
        }
    }
};
</script>
