<template>
    <div>
        <div class="card">
            <div class="card-body d-flex  align-items-center">
                <UserPhoto :user="activeUser" size="32"> </UserPhoto>

                <button
                    type="button"
                    class="ml-3 form-control btn btn-outline-info"
                    v-b-modal.createPostModal
                >
                    Write something...
                </button>
            </div>

            <b-modal
                id="createPostModal"
                ref="modal"
                title="Write something"
                @show="resetModal"
                @hidden="resetModal"
                ok-title="Post"
                @ok="handleOk"
                centered
            >
                <div class="d-flex align-items-center mb-3">
                    <UserPhoto :user="activeUser" size="16"></UserPhoto>

                    <div class="ml-2">
                        {{ activeUser.first_name }} {{ activeUser.surname }}
                        {{ activeUser.nickname }}
                    </div>
                </div>
                <form
                    ref="form"
                    @submit.stop.prevent="handleSubmit"
                    class="mb-2"
                >
                    <b-form-textarea
                        id="textarea"
                        v-model="body"
                        placeholder="Enter something here..."
                        rows="3s"
                        max-rows="6"
                        :state="bodyState"
                        required
                    >
                    </b-form-textarea>

                    <div class="d-flex justify-content-center m-2">
                        <img v-if="imgUrl && imgFile!=null " :src="imgUrl" style="max-width:460px; max-height:320px" />
                    </div>

                    <b-form-file
                        v-model="imgFile"
                        accept="image/*"
                        placeholder="Choose an image or drop it here..."
                        drop-placeholder="Drop image here..."
                        @change="onFileChange"
                    ></b-form-file>


                </form>
            </b-modal>
        </div>
    </div>
</template>

<script>
import UserPhoto from "../user/UserPhoto";

export default {
    name: "CreatePost",
    components: {
        UserPhoto
    },
    computed: {
        activeUser() {
            return this.$store.getters.activeUser;
        },
    },
    data() {
        return {
            body: "",
            bodyState: null,
            imgUrl: null,
            imgFile: null,
        };
    },
    methods: {
        onFileChange(e) {
            const file = e.target.files[0];
            this.imgUrl = URL.createObjectURL(file);
        },
        createPostAction() {

            let formData = new FormData();

            if(this.imgFile){
                formData.append('image', this.imgFile);
            }

            formData.append('body', this.body);

            this.$store
                .dispatch("createPost", formData)
                .then(() => {
                    this.hideCreatePostModal();
                })
                .catch(() => {})
                .finally();
        },

        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            this.bodyState = valid;
            return valid;
        },
        resetModal() {
            this.body = "";
               this.imgUrl = null;
               this.imgFile = null;
            this.bodyState = null;
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
            this.createPostAction();
        },

        hideCreatePostModal() {
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide("createPostModal");
            });
        }
    }
};
</script>

<style scoped>

</style>
