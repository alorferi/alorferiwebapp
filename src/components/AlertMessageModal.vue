<template>
    <div>
        <UiModal
            ref="modal"
            :title="alertMessageTitle"
            @opened="initModal"
            @closed="hideModal"
            ok-title="OK"
            cancel-title="Cancel"
            v-model="showAlertModalLocal"
            :hide-header="hideHeader"
            @confirm="handleOk"
            @cancel="handleCancel"
            centered
            persistent
        >
            <div class="mb-4 flex items-center justify-between">
                <h5 class="m-0 text-xl font-medium">{{ alertMessageTitle }}</h5>
            </div>

            <div class="p-4 text-center text-success" v-if="isSuccessfulMessage == true">
                <h6>{{ alertMessageBody }}</h6>
            </div>

            <div class="p-4 text-center text-danger" v-if="isSuccessfulMessage == false">
                <h6>{{ alertMessageBody }}</h6>
            </div>
        </UiModal>
    </div>
</template>

<script>
export default {
  emits: ["onClickCancel", "onClickOk", "onUpdateVisibleState"],
  name: "AlertMessageModal",
  props: ["showAlertModal", "alertMessageTitle", "alertMessageBody", "isSuccessfulMessage"],
  computed: {
    showAlertModalLocal: {
      get: function () {
        return this.showAlertModal;
      },
      set: function (value) {
        this.emitShowAlertModal(value);
      }
    }
  },
  mounted: function () {},
  data() {
    return {
      otCodeState: null,
      hideHeader: true
    };
  },
  methods: {
    emitOkClick: function () {
      this.$emit("onClickOk");
    },
    emitCancelClick: function () {
      this.$emit("onClickCancel");
    },
    emitShowAlertModal: function (isShowModal) {
      this.$emit("onUpdateVisibleState", isShowModal);
    },
    hideModal() {
      this.otCodeState = null;
      this.emitShowAlertModal(false);
    },
    initModal() {
      this.otCodeState = null;
    },
    handleOk() {
      // Prevent modal from closing
      // Trigger submit handler
      this.emitOkClick();
      // Push the name to submitted names
      // Hide the modal manually
      this.$nextTick(() => {
        this.showAlertModalLocal = false;
      });
    },
    handleCancel() {
      // Prevent modal from closing
      // Trigger submit handler
      this.emitCancelClick();
      // Push the name to submitted names
      // Hide the modal manually
      this.$nextTick(() => {
        this.showAlertModalLocal = false;
      });
    }
  }
};
</script>

<style></style>
