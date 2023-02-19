<template>
    <div>
        <b-modal
            ref="modal"
            :title="modalTile"
            v-model="showLocal"
            @show="showModal"
            @hidden="hideModal"
            ok-title="Yes"
            cancel-title="No"
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


            <div class="text-center">
                Do you want to block this {{blockable_type}}?
            </div>


            <Loading v-if="is_loading"></Loading>


        </b-modal>
    </div>
</template>

<script>
import UserPhoto from "../user/UserPhoto";
import Loading from "@/components/Loading";

export default {
    name: "CreateBlockModal",
    components: {
        UserPhoto,
        Loading
    },
    async mounted() {},
    props: ["show", "blockable_type", "blockable_id", "user"],
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

    },
    data() {
        return {
            dataModel: {
                blockable_id: null,
                blockable_type: null
            },

            is_loading: false,
            modalTile: "Block user",
            errorMessage: null
        };
    },
    methods: {
        createReportAction() {
            const self = this;

            self.is_loading = true;

            self.dataModel.blockable_type = self.blockable_type;

            self.dataModel.blockable_id = self.blockable_id;

            console.log("dataModel", self.dataModel);

            self.$store
                .dispatch("createBlock", self.dataModel)
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


        showModal() {
        },
        hideModal() {
            this.clearData();
        },
        clearData() {
            this.errorMessage = null;
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault();
            // Trigger submit handler
            this.handleSubmit();
        },
        handleSubmit() {

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
    color: #42b983;
}
.my-8 {
    margin-top: 4rem;
    margin-bottom: 4rem;
}
</style>
