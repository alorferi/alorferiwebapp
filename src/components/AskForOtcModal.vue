<template>
    <div>
        <b-modal
            id="modal-prevent-closing"
            ref="modal"
            title="One Time Code"
            @show="initModal"
            @hidden="resetModal"
            :ok-title="okTitleText"
            v-model="showOtcModalLocal"
            :hide-header="hideHeader"
            @ok="handleOk"
            centered
            data-keyboard="false"
            data-backdrop="static"
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
                    label-for="ot-code-input"
                    invalid-feedback="One Time Code is required"
                    :state="otCodeState"
                >
                    <div class="d-flex  justify-content-center">
                        <b-form-input
                            id="ot-code-input"
                            v-model="ot_code"
                            :state="otCodeState"
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
    name: "AskForOtcModal",
    props: ["showOtcModal", "durationInSeconds"],
      computed: {
        showOtcModalLocal: {
            get: function() {
                return this.showOtcModal;
            },
            set: function(value) {
                this.emitShowOtcModal(value);
            }
        }
    },
    mounted: function() {
        this.otcCountdownTimer();
        this.downCounter = this.durationInSeconds;
    },
    data() {
        return {
            ot_code: "",
            otCodeState: null,
            downCounter: 0,
            downCounterText: "",
            message: "",
            oldSetInterval: null,
            okTitleText: "OK",
            hideHeader: true
        };
    },
    methods: {
        emitOtc: function() {
            this.$emit("updateOtc", this.ot_code);
        },
        emitShowOtcModal: function(isShowModal) {
             this.$emit("onUpdateVisibleState", isShowModal);
        },
        otcCountdownTimer: function() {
            this.oldSetInterval = setInterval(() => {
                if (this.downCounter <= 0) {
                    this.message = "Time expired";
                    // $("#okOtcButton").text("Try Again");
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
            this.otCodeState = valid;
            return valid;
        },
        resetModal() {
            this.ot_code = "";
            this.otCodeState = null;
            this.downCounter = 0;
            if (this.oldSetInterval != null) {
                clearInterval(this.oldSetInterval);
            }
            this.emitShowOtcModal(false);
        },
        initModal() {
            this.ot_code = "";
            this.message = "";
            this.okTitleText = "OK";
            this.otCodeState = null;
            this.otcCountdownTimer();
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

            this.emitOtc();
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
