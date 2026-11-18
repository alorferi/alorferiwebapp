<template>
    <div>
        <UiModal
            :busy="is_loading"
            ref="modal"
            :title="modalTile"
            v-model="showLocal"
            @opened="showModal"
            @closed="hideModal"
            ok-title="Yes"
            cancel-title="No"
            @confirm="handleOk"
            centered
        >
            <!-- <div class="d-flex align-items-center mb-3">
            <UserPhoto :user="user" size="16"></UserPhoto>

            <div class="ml-2">
                {{ user.first_name }} {{ user.surname }}
                {{ user.nickname }}
            </div>
        </div> -->

            <div class="relative rounded border p-4 border-red-200 bg-red-50 text-red-800 pr-12" v-if="errorMessage">
                <button type="button" class="ui-close-button" @click="errorMessage = null">&times;</button>

                {{ errorMessage }}
            </div>

            <div class="text-center">Do you want to block this {{ blockable_type }}?</div>

            <Loading v-if="is_loading"></Loading>
        </UiModal>
    </div>
</template>

<script>
// import UserPhoto from "../user/UserPhoto";
import Loading from "@/components/Loading";
export default {
  emits: ["didFinish", "updateVisibleState"],
  name: "CreateBlockModal",
  components: {
    // UserPhoto,
    Loading
  },
  async mounted() {},
  props: ["show", "blockable_type", "blockable_id", "user"],
  computed: {
    activeUser() {
      return this.$stores.user.activeUser;
    },
    showLocal: {
      get: function () {
        return this.show;
      },
      set: function (value) {
        this.$emit("updateVisibleState", value);
      }
    }
  },
  data() {
    return {
      dataModel: {
        blockable_id: null,
        blockable_type: null
      },
      is_loading: false,
      modalTile: "Block!",
      errorMessage: null
    };
  },
  methods: {
    didFinish: function () {
      this.$emit("didFinish");
    },
    createReportAction() {
      const self = this;
      self.is_loading = true;
      self.dataModel.blockable_type = self.blockable_type;
      self.dataModel.blockable_id = self.blockable_id;
      self.$stores.block.createBlock(self.dataModel).then(() => {
        self.hidePostModal();
        self.didFinish();
      }).catch(errors => {
        try {
          if (errors.response.data) {
            self.errorMessage = errors.response.data.message;
          }
        } catch (err) {
          self.errorMessage = err;
        }
      }).finally(() => {
        self.is_loading = false;
      });
    },
    showModal() {},
    hideModal() {
      this.clearData();
    },
    clearData() {
      this.errorMessage = null;
    },
    handleOk() {
      // Prevent modal from closing
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      if (this.is_loading) return;
      // Submit data to backend server
      this.createReportAction();
    },
    hidePostModal() {
      // Hide the modal manually
      this.$nextTick(() => {
        this.showLocal = false;
      });
    }
  }
};
</script>

<style scoped>
#fileInput {
    display: none;
}
h1,
h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: var(--color-primary);
}
.my-8 {
    margin-top: 4rem;
    margin-bottom: 4rem;
}
</style>
