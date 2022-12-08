<template>
    <div>
        <b-modal
            id="modal-prevent-closing"
            ref="modal"
            title="One Time Code"
            @show="initModal"
            @hidden="resetModal"
            :ok-title="okTitleText"
            v-model="showAlertMessageLocal"
            :hide-header="hideHeader"
            @ok="handleOk"
            centered
            data-keyboard="false"
            data-backdrop="static"
        >
            <div class="modal-header">
                <h5 class="modal-title">{{tittle}}</h5>
            </div>

            <div class="text-center text-danger">
                {{ message }}
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "AlertMessageModal",
    props: ["showAlertMessage"],
    computed: {
        showAlertMessageLocal: {
            get: function() {
                return this.showAlertMessage;
            },
            set: function(value) {
                this.emitShowAlertMessage(value);
            }
        }
    },
    mounted: function() {},
    data() {
        return {
            ot_code: "",
            otCodeState: null,
            title: "",
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
        emitShowAlertMessage: function(isShowModal) {
            this.$emit("onUpdateVisibleState", isShowModal);
        },
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            this.otCodeState = valid;
            return valid;
        },
        resetModal() {
            this.ot_code = "";
            this.otCodeState = null;
            if (this.oldSetInterval != null) {
                clearInterval(this.oldSetInterval);
            }
            this.emitShowAlertMessage(false);
        },
        initModal() {
            this.ot_code = "";
            this.message = "";
            this.okTitleText = "OK";
            this.otCodeState = null;
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
