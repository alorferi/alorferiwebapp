<template>
    <div>
        <UiModal
            ref="modal"
            title="One Time Code"
            @opened="initModal"
            @closed="resetModal"
            :ok-title="okTitleText"
            v-model="showOtcModalLocal"
            :hide-header="hideHeader"
            @confirm="handleOk"
            centered
            persistent
        >
            <div class="mb-4 flex items-center justify-between">
                <h5 class="m-0 text-xl font-medium">One Time Code</h5>

                <span id="countdownTimerSpan">
                    {{ downCounterText }}
                </span>
            </div>

            <form ref="form" @submit.stop.prevent="handleSubmit" class="pt-6">
                <div :aria-invalid="otCodeState === false ? 'true' : undefined">
                    <div class="flex justify-center">
                        <input
                            class="ui-field"
                            id="ot-code-input"
                            v-model="ot_code"
                            :aria-invalid="otCodeState === false ? 'true' : undefined"
                            placeholder="Type 6-digit code here"
                            maxlength="6"
                            size="6"
                            pattern="[0-9]{6}"
                            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                            type="text"
                            inputmode="numeric"
                            autocomplete="one-time-code"
                            required
                        />
                    </div>

                    <div class="text-center text-danger">
                        {{ message }}
                    </div>
                </div>
            </form>
        </UiModal>
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
    beforeDestroy() { clearInterval(this.oldSetInterval); },
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
            clearInterval(this.oldSetInterval);
            this.oldSetInterval = setInterval(() => {
                if (this.downCounter <= 0) {
                    this.message = "Time expired";
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
        handleOk() {
            // Prevent modal from closing
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
                this.showOtcModalLocal = false;
            });
        }
    }
};
</script>

<style></style>
