<template>
    <div>
        <b-modal
            id="modal-prevent-closing"
            ref="modal"
            title="One Time Code"
            @show="initModal"
            @hidden="resetModal"
            ok-title="OK"
            cancel-title="Cancel"
            v-model="showAlertModalLocal"
            :hide-header="hideHeader"
            @ok="handleOk"
            @cancel="handleOk"
            centered
            data-keyboard="false"
            data-backdrop="static"
        >
            <div class="modal-header">
                <h5 class="modal-title">{{title}}</h5>
            </div>

            <div class="modal-body text-center text-danger">
                <h6> {{ message }}</h6>

            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "AlertMessageModal",
    props: ["showAlertModal", "title", "message","is_success" ],
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
            ot_code: "",
            otCodeState: null,
            hideHeader: true
        };
    },
    methods: {
        emitOtc: function() {
            this.$emit("updateOtc", this.ot_code);
        },
        emitShowAlertModal: function(isShowModal) {
            this.$emit("onUpdateVisibleState", isShowModal);
        },
        resetModal() {
            this.ot_code = "";
            this.otCodeState = null;
            this.emitShowAlertModal(false);
        },
        initModal() {
            this.otCodeState = null;
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault();
            // Trigger submit handler
            this.handleSubmit();
        },
        handleSubmit() {

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
