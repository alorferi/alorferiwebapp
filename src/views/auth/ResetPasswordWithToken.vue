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


                <b-form-group
                    label=""
                    label-for="newPasswordInput"
                    invalid-feedback="One Time Code is required"
                    :state="otCodeState"
                >
                    <div class="d-flex  justify-content-center">
                        <b-form-input
                            id="newPasswordInput"
                            v-model="new_password"
                            :state="otCodeState"
                            placeholder="Type new password"
                            maxlength="6"
                            size="6"
                            pattern="\d*"
                            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                            type="text"
                            required
                        />
                    </div>

                    <div class="text-center text-danger">
                        {{ message }}
                    </div>
                </b-form-group>

                <b-form-group
                    label=""
                    label-for="confirmPasswordInput"
                    invalid-feedback="One Time Code is required"
                    :state="otCodeState"
                >
                    <div class="d-flex  justify-content-center">
                        <b-form-input
                            id="confirmPasswordInput"
                            v-model="confirm_password"
                            :state="otCodeState"
                            placeholder="Type confirm password"
                            maxlength="6"
                            size="6"
                            pattern="\d*"
                            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                            type="text"
                            required
                        />
                    </div>

                    <div class="text-center text-danger">
                        {{ message }}
                    </div>
                </b-form-group>

                    <div class="form-group">
                        <button type="submit" class="btn btn-success btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            <ResetPasswordModal
            :showResetPasswordModal="showResetPasswordModal"
            />
            <div class=" col-sm-4"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ResetPasswordWithToken",
    props: ["showResetPasswordModal"],
    computed: {},
    mounted: function() {},
    data() {
        return {
            new_password: "",
            confirm_password: "",
            otCodeState: null,
            message: "",
            oldSetInterval: null,
            okTitleText: "OK",
            hideHeader: true
        };
    }
};
</script>

<style></style>
