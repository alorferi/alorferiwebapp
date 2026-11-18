<template>
    <div>
        <UiModal
            :busy="is_loading"
            ref="modal"
            :title="modalTile"
            v-model="showLocal"
            @opened="showModal"
            @closed="hideModal"
            ok-title="Submit"
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

            <form ref="form" @submit.stop.prevent="handleSubmit" class="mb-2">
                <select
                    aria-label="Report reason"
                    class="ui-field"
                    v-model="dataModel.subject"
                    :aria-invalid="subjectState === false ? 'true' : undefined"
                    required
                >
                    <option v-for="option in options" :key="String(option.value)" :value="option.value">
                        {{ option.text }}
                    </option>
                </select>

                <textarea
                    aria-label="Report details"
                    class="ui-field"
                    id="textarea"
                    v-model="dataModel.body"
                    placeholder="What do you want to discussion about?"
                    rows="4"
                    :aria-invalid="bodyState === false ? 'true' : undefined"
                    required
                >
                </textarea>

                <Loading v-if="is_loading"></Loading>
            </form>
        </UiModal>
    </div>
</template>

<script>
// import UserPhoto from "../user/UserPhoto";
import Loading from "@/components/Loading";
export default {
  emits: ["updateVisibleState"],
  name: "CreateReportModal",
  components: {
    // UserPhoto,
    Loading
  },
  async mounted() {},
  props: ["show", "complainable_type", "complainable_id", "user"],
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
    },
    options() {
      var options = [];
      options.push({
        value: null,
        text: "Please select an option"
      });
      this.$stores.complain.complainTypesResponse.data.forEach(function (item) {
        options.push({
          value: item,
          text: item
        });
      });
      return options;
    }
  },
  data() {
    return {
      dataModel: {
        subject: null,
        body: null,
        complainable_id: null,
        complainable_type: null
      },
      subjectState: null,
      bodyState: null,
      is_loading: false,
      modalTile: "Report!",
      errorMessage: null
    };
  },
  methods: {
    fetchComplainTypesAction() {
      const self = this;
      self.$stores.complain.fetchComplainTypes(self.complainable_type).then(() => {}).catch(() => {}).finally(() => {
        self.is_loading = false;
      });
    },
    createReportAction() {
      const self = this;
      self.is_loading = true;
      self.dataModel.complainable_type = self.complainable_type;
      self.dataModel.complainable_id = self.complainable_id;
      console.log("dataModel", self.dataModel);
      self.$stores.complain.createReport(self.dataModel).then(() => {
        self.hidePostModal();
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
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.subjectState = valid;
      this.bodyState = valid;
      return valid;
    },
    showModal() {
      this.fetchComplainTypesAction();
    },
    hideModal() {
      this.clearData();
    },
    clearData() {
      this.dataModel.subject = "";
      this.dataModel.body = "";
      this.subjectState = null;
      this.bodyState = null;
      this.errorMessage = null;
    },
    handleOk() {
      // Prevent modal from closing
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      if (this.is_loading) return;
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Subit data to backend server
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
