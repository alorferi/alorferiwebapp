<template>
    <div>
        <b-modal
            id="modal-prevent-closing"
            ref="modal"
            title="One Time Code"
            @show="initModal"
            @hidden="hideModal"
            ok-title="OK"
            cancel-title="Cancel"
            v-model="showAlertModalLocal"
            :hide-header="hideHeader"
            @ok="handleOk"
            @cancel="handleCancel"
            centered
            data-keyboard="false"
            data-backdrop="static"
        >
            <div class="modal-header">
                <h5 class="modal-title">{{alertMessageTitle}}</h5>
            </div>

            <div class="modal-body text-center text-success" v-if=" isSuccessfulMessage == true ">
                <h6> {{ alertMessageBody }}</h6>
            </div>

            <div class="modal-body text-center text-danger" v-if=" isSuccessfulMessage == false ">
                <h6> {{ alertMessageBody }}</h6>
            </div>

        </b-modal>
    </div>
</template>

<script>
export default {
    name: "AlertMessageModal",
    props: ["showAlertModal", "alertMessageTitle", "alertMessageBody","isSuccessfulMessage" ],
    computed: {
        showAlertModalLocal: {
            get: function() {
                return this.showAlertModal;
            },
            set: function(value) {
                this.emitShowAlertModal(value);
            }
        }
    },
    mounted: function() {},
    data() {
        return {
            otCodeState: null,
            hideHeader: true
        };
    },
    methods: {
        emitOkClick: function() {
            this.$emit("onClickOk");
        },
        emitCancelClick: function() {
            this.$emit("onClickCancel");
        },
        emitShowAlertModal: function(isShowModal) {
            this.$emit("onUpdateVisibleState", isShowModal);
        },
        hideModal() {
            this.otCodeState = null;
            this.emitShowAlertModal(false);
            this.emitCancelClick();
        },
        initModal() {
            this.otCodeState = null;
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault();
            // Trigger submit handler
            this.emitOkClick();
            // Push the name to submitted names
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide("modal-prevent-closing");
            });
        },
        handleCancel(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault();
            // Trigger submit handler
            this.hideModal();
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
