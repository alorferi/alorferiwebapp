<template>
    <div>
        <UiModal
            ref="modal"
            @closed="resetModal"
            v-model="showLoadingModalLocal"
            :hide-header="hideHeader"
            :hide-footer="hideFooter"
            centered
            persistent
        >
            <div class="flex justify-center pt-4">
                <div class="ui-spinner text-success" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </UiModal>
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
