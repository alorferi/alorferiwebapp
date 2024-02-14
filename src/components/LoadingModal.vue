<template>
    <div>
        <b-modal
            id="modal-prevent-closing"
            ref="modal"
            @hidden="resetModal"
            v-model="showLoadingModalLocal"
            :hide-header="hideHeader"
            :hide-footer="hideFooter"
            centered
            data-keyboard="false"
            data-backdrop="static"
        >
            <div class="d-flex justify-content-center pt-3">
                <div class="spinner-border  text-success" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "LoadingModal",
    props: ["showLoadingModal"],
    computed: {
        showLoadingModalLocal: {
            get: function() {
                return this.showLoadingModal;
            },
            set: function(value) {
                this.emitShowLoadingModal(value);
            }
        }
    },
    mounted: function() {},
    data() {
        return {
            hideHeader: true,
            hideFooter: true,
        };
    },
    methods: {
        resetModal() {
            this.emitShowLoadingModal(false);
        },
        emitShowLoadingModal: function(isShowModal) {
            this.$emit("onUpdateVisibleState", isShowModal);
        },
    }
};
</script>

<style></style>
