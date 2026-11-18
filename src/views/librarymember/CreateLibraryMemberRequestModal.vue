<template>
    <div>
        <UiModal
            :busy="is_loading"
            ref="modal"
            title="Send member request"
            @opened="initModal"
            @closed="hideModal"
            ok-title="Send"
            cancel-title="Cancel"
            v-model="showMemberRequestModalLocal"
            :hide-header="hideHeader"
            @confirm="handleOk"
            @cancel="handleCancel"
            centered
            persistent
        >
            <div class="mb-4 flex items-center justify-between">
                <div class="flex">
                    <div class="p-2">
                        <LibraryLogo :library="library" size="48" />
                    </div>

                    <div class="grow p-2">
                        <h4 class="text-success">{{ library.name }}</h4>

                        <h6>
                            <span v-if="library.address.house != null && library.address.house.length != 0">
                                {{ library.address.house }},
                            </span>

                            <span v-if="library.address.village != null && library.address.village.length != 0">
                                {{ library.address.village }},
                            </span>

                            <span v-if="library.address.police_station != null">
                                {{ library.address.police_station.name }},
                            </span>

                            <span v-if="library.address.district != null">
                                {{ library.address.district.name }}
                            </span>

                            <span v-if="library.address.post_code != null"> - {{ library.address.post_code }} </span>
                        </h6>
                    </div>
                </div>
            </div>

            <div class="p-4 text-center text-success">
                <h4 class="m-0 text-xl font-medium text-primary">সদস্য অনুরোধ পাঠান</h4>
                <!-- <h6>Privacy Policy here</h6> -->
                <br />
                <input type="checkbox" id="iAgreeCheckbox" name="iAgreeCheckbox" @click="iAgree = !iAgree" />
                &nbsp; &nbsp;
                <label for="iAgreeCheckbox"> আমি এই পাঠাগারের শর্তাবলী মেনে সদস্য হতে রাজি।</label>
            </div>
            <p v-if="error_message" role="alert" class="mt-3 text-danger">{{ error_message }}</p>
        </UiModal>
    </div>
</template>

<script>
import LibraryLogo from "../library/LibraryLogo.vue";
export default {
  emits: ["onClickCancel", "onClickOk", "onUpdateVisibleState"],
  name: "CreateLibraryMemberRequestModal",
  props: ["showMemberRequestModal", "library"],
  components: {
    LibraryLogo
  },
  computed: {
    showMemberRequestModalLocal: {
      get: function () {
        return this.showMemberRequestModal;
      },
      set: function (value) {
        this.emitShowMemberRequestModal(value);
      }
    }
  },
  mounted: function () {},
  data() {
    return {
      is_loading: false,
      otCodeState: null,
      hideHeader: true,
      iAgree: false,
      errors: null,
      is_error: false,
      error_message: null,
      myLibraryMemberRequest: null
    };
  },
  methods: {
    emitOkClick: function () {
      this.$emit("onClickOk", this.myLibraryMemberRequest);
    },
    emitCancelClick: function () {
      this.$emit("onClickCancel");
    },
    emitShowMemberRequestModal: function (isShowModal) {
      this.$emit("onUpdateVisibleState", isShowModal);
    },
    hideModal() {
      this.otCodeState = null;
      this.emitShowMemberRequestModal(false);
    },
    initModal() {
      this.otCodeState = null;
      this.iAgree = false;
      this.error_message = null;
    },
    handleOk() {
      const self = this;

      // Prevent modal from closing
      if (self.is_loading) return;
      if (!self.iAgree) {
        self.error_message = "Please accept the library terms first.";
        return;
      }
      self.is_loading = true;
      self.error_message = null;
      const payload = {
        library_id: self.library.id
      };
      self.$stores.libraryMemberRequest.createLibraryMemberRequest(payload).then(response => {
        console.log(response);
        self.myLibraryMemberRequest = self.$stores.libraryMemberRequest.myLibraryMemberRequest;
        this.emitOkClick();
        this.$nextTick(() => {
          this.showMemberRequestModalLocal = false;
        });
      }).catch(errors => {
        self.error_message = errors.response && errors.response.data && errors.response.data.message || "Unable to send your request. Please try again.";
      }).finally(() => {
        self.is_loading = false;
      });
    },
    handleCancel() {
      // Prevent modal from closing
      // Trigger submit handler
      this.emitCancelClick();
      // Push the name to submitted names
      // Hide the modal manually
      this.$nextTick(() => {
        this.showMemberRequestModalLocal = false;
      });
    }
  }
};
</script>

<style></style>
