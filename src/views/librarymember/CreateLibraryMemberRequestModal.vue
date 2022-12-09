<template>
    <div>
        <b-modal
            id="modal-prevent-closing"
            ref="modal"
            title="Send member request"
            @show="initModal"
            @hidden="hideModal"
            ok-title="Send"
            cancel-title="Cancel"
            v-model="showMemberRequestModalLocal"
            :hide-header="hideHeader"
            @ok="handleOk"
            @cancel="handleCancel"
            centered
            data-keyboard="false"
            data-backdrop="static"
        >
            <div class="modal-header">
                <div class="d-flex">
                    <div class="p-2">
                        <LibraryLogo :library="library" size="48" />
                    </div>

                    <div class="flex-grow-1 p-2">
                        <h4 class="text-success">{{ library.name }}</h4>

                        <h6>
                            <span
                                v-if="
                                    library.address.house != null &&
                                        library.address.house.length != 0
                                "
                            >
                                {{ library.address.house }},
                            </span>

                            <span
                                v-if="
                                    library.address.village != null &&
                                        library.address.village.length != 0
                                "
                            >
                                {{ library.address.village }},
                            </span>

                            <span v-if="library.address.police_station != null">
                                {{ library.address.police_station.name }},
                            </span>

                            <span v-if="library.address.district != null">
                                {{ library.address.district.name }}
                            </span>

                            <span v-if="library.address.post_code != null">
                                - {{ library.address.post_code }}
                            </span>
                        </h6>
                    </div>
                </div>
            </div>

            <div class="modal-body text-center text-success">
                <h3 class="modal-title">Send member request</h3>
                <h6>Privacy Policy here</h6>

                <input
                    type="checkbox"
                    id="iAgreeCheckbox"
                    name="iAgreeCheckbox"

                    @click="(iAgree = !iAgree)"
                />
                &nbsp;
                <label for="iAgreeCheckbox">
                  I agree the terms and conditions</label
                >
            </div>
        </b-modal>
    </div>
</template>

<script>
import LibraryLogo from "../library/LibraryLogo.vue";

export default {
    name: "CreateLibraryMemberRequestModal",
    props: ["showMemberRequestModal", "library"],
    components: {
        LibraryLogo
    },
    computed: {
        showMemberRequestModalLocal: {
            get: function() {
                return this.showMemberRequestModal;
            },
            set: function(value) {
                this.emitShowMemberRequestModal(value);
            }
        }
    },
    mounted: function() {},
    data() {
        return {
            otCodeState: null,
            hideHeader: true,
            iAgree: false,
        };
    },
    methods: {
        emitOkClick: function() {
            this.$emit("onClickOk");
        },
        emitCancelClick: function() {
            this.$emit("onClickCancel");
        },
        emitShowMemberRequestModal: function(isShowModal) {
            this.$emit("onUpdateVisibleState", isShowModal);
        },
        hideModal() {
            this.otCodeState = null;
            this.emitShowMemberRequestModal(false);
            this.emitCancelClick();
        },
        initModal() {
            this.otCodeState = null;
            this.iAgree = false;
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault();

            if(!this.iAgree){
                return;
            }

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
