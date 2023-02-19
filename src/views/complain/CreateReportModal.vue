<template>
    <div>
        <b-modal
            ref="modal"
            :title="modalTile"
            v-model="showLocal"
            @show="showModal"
            @hidden="hideModal"
            ok-title="Submit"
            @ok="handleOk"
            centered
        >
            <div class="d-flex align-items-center mb-3">
                <UserPhoto :user="user" size="16"></UserPhoto>

                <div class="ml-2">
                    {{ user.first_name }} {{ user.surname }}
                    {{ user.nickname }}
                </div>
            </div>

            <div class="alert alert-danger alert-dismissible" v-if="errorMessage"
            >
                <button type="button" class="close" data-dismiss="alert">
                    &times;
                </button>

                {{ errorMessage }}
            </div>

            <form ref="form" @submit.stop.prevent="handleSubmit" class="mb-2">
                <b-form-select
                    v-model="dataModel.subject"
                    :options="options"
                    :state="subjectState"
                    required
                ></b-form-select>

                <b-form-textarea
                    id="textarea"
                    v-model="dataModel.body"
                    placeholder="What do you want to discussion about?"
                    rows="4s"
                    max-rows="6"
                    :state="bodyState"
                    required
                >
                </b-form-textarea>

                <Loading v-if="is_loading"></Loading>
            </form>
        </b-modal>
    </div>
</template>

<script>
import UserPhoto from "../user/UserPhoto";
import Loading from "@/components/Loading";

export default {
    name: "CreateReportModal",
    components: {
        UserPhoto,
        Loading
    },
    async mounted() {},
    props: ["show", "complainable_type", "complainable_id", "user"],
    computed: {
        activeUser() {
            return this.$store.getters.activeUser;
        },
        showLocal: {
            get: function() {
                return this.show;
            },
            set: function(value) {
                this.$emit("updateVisibleState", value);
            }
        },
        options() {
            var options = [];

            options.push({ value: null, text: "Please select an option" });

            this.$store.getters.complainTypesResponse.data.forEach(function(
                item
            ) {
                options.push({ value: item, text: item });
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
            modalTile: "Report user",
            errorMessage: null
        };
    },
    methods: {
        onFileChange(e) {
            const file = e.target.files[0];
            this.imgUrl = URL.createObjectURL(file);
        },

        fetchComplainTypesAction() {
            const self = this;
            self.$store
                .dispatch("fetchComplainTypes", self.complainable_type)
                .then(() => {})
                .catch(() => {})
                .finally(() => {
                    self.is_loading = false;
                });
        },
        createReportAction() {
            const self = this;

            self.is_loading = true;

            self.dataModel.complainable_type = self.complainable_type;

            self.dataModel.complainable_id = self.complainable_id;

            console.log("dataModel", self.dataModel);

            self.$store
                .dispatch("createReport", self.dataModel)
                .then(() => {
                    self.hidePostModal();
                })
                .catch(errors => {
                    try {
                        if (errors.response.data) {
                            self.errorMessage = errors.response.data.message;
                        }
                    } catch (err) {
                        self.errorMessage = err;
                    }
                })
                .finally(() => {
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
    color: #42b983;
}
.my-8 {
    margin-top: 4rem;
    margin-bottom: 4rem;
}
</style>
