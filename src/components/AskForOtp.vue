<template>
    <div>
        <b-modal
            id="modal-prevent-closing"
            ref="modal"
            title="One Time Code"
            @show="initModal"
            @hidden="resetModal"
            :ok-title="okTitleText"
            v-model="showOtpModal"
            :hide-header="hideHeader"
            @ok="handleOk"
            centered
            >

            <div class="modal-header">
                <h5 class="modal-title">One Time Code</h5>

                <span id="countdownTimerSpan">
                    {{ downCounterText }}
                </span>
            </div>

            <form ref="form" @submit.stop.prevent="handleSubmit" class="pt-4">
                <b-form-group
                    label=""
                    label-for="otp-code-input"
                    invalid-feedback="One Time Code is required"
                    :state="otpCodeState"
                >
                    <div class="d-flex  justify-content-center">
                        <b-form-input
                            id="otp-code-input"
                            v-model="otp_code"
                            :state="otpCodeState"
                            placeholder="Type 6-digit code here"
                            maxlength="6"
                            size="6"
                            pattern="\d*"
                            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                            type="number"
                            required
                        />
                    </div>

                    <div class="text-center text-danger">
                        {{ message }}
                    </div>
                </b-form-group>
            </form>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "AskForOtp",
    props: ["showOtpModal", "durationInSeconds"],
    computed: {},
    mounted: function() {
        this.otpCountdownTimer();
        this.downCounter = this.durationInSeconds;
    },
    data() {
        return {
            otp_code: "",
            otpCodeState: null,
            downCounter: 0,
            downCounterText: "",
            message: "",
            oldSetInterval: null,
            okTitleText: "OK",
            hideHeader: true
        };
    },
    methods: {
        emitOtp: function() {
            this.$emit("updateOtp", this.otp_code);
        },
        otpCountdownTimer: function() {
            this.oldSetInterval = setInterval(() => {
                if (this.downCounter <= 0) {
                    this.message = "Time expired";
                    // $("#okOtpButton").text("Try Again");
                    this.okTitleText = "Try Again";
                    clearInterval(this.oldSetInterval);
                    return;
                }
                this.downCounter--;

                this.downCounterText =
                    parseInt(this.downCounter / 60) +
                    ":" +
                    (this.downCounter % 60);
            }, 1000);
        },

        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            this.otpCodeState = valid;
            return valid;
        },
        resetModal() {
            this.otp_code = "";
            this.otpCodeState = null;
            this.downCounter = 0;
            if (this.oldSetInterval != null) {
                clearInterval(this.oldSetInterval);
            }
        },
        initModal() {
            this.otp_code = "";
            this.message = "";
            this.okTitleText ="OK"
            this.otpCodeState = null;
            this.otpCountdownTimer();
            this.downCounter = this.durationInSeconds;
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault();
            // Trigger submit handler
            this.handleSubmit();
        },
        handleSubmit() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return;
            }

            this.emitOtp()
            // Push the name to submitted names
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide("modal-prevent-closing");
            });
        }
    }
};
</script>

<style></style>
