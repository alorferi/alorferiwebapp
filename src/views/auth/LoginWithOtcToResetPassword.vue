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
                    <div class="form-group mt-4 mb-4">
                        <UserNameField
                            name="username"
                            label=""
                            placeholder="Type E-mail or Mobile here"
                            icon="fas fa-at"
                            :errors="errors"
                            @update:field="resetPasswordModel.username = $event"
                        />
                    </div>

                    <div
                        class="text-center text-danger mb-2"
                        v-if="error_message"
                    >
                        {{ error_message }}
                    </div>

                    <AskForOtcModal
                        :showOtcModal="showOtcModal"
                        :durationInSeconds="durationInSeconds"
                        @updateOtc="updateOtc"
                        @onUpdateVisibleState="showOtcModal = $event"
                    />

                    <div class="form-group">
                        <button type="submit" class="btn btn-success btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            <Loading :showLoadingModal="showLoadingModal"
            @onUpdateVisibleState="showAlertMessage = $event"
            ></Loading>

            <AlertMessageModal
                :showAlertMessage="showAlertMessage"
            />
            <div class=" col-sm-4"></div>
        </div>
    </div>
</template>

<script>
import UserNameField from "../../components/UserNameField";
import AskForOtcModal from "../../components/AskForOtcModal";
import AlertMessageModal from "../../components/AlertMessageModal";
import Loading from "@/components/LoadingModal";

export default {
    name: "LoginWithOtcToResetPassword",
    components: {
        UserNameField,
        AskForOtcModal,
        AlertMessageModal,
        Loading
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
            showAlertMessage: false,
            showLoadingModal: false,
            errors: null,
            error_message: null
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
                "ot-code": self.ot_code,
                "Content-Type": "application/json"
            };

            self.showLoadingModal = true
            this.$store
                .dispatch("loginWithOtc", {
                    headers: headers,
                    data: this.resetPasswordModel
                })
                .then(response => {
                    self.showLoadingModal = false
                    console.log(response.data.data);

                    switch (response.data.status) {
                        case "OK":
                            self.$router.replace({ name: "reset-password" });
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
                    self.showLoadingModal = false
                    console.log(errors);

                    try {
                        if (errors.response.data.errors) {
                            self.errors = errors.response.data.errors;
                        } else if (errors.response.data.message) {
                            this.error_message = errors.response.data.message;
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
