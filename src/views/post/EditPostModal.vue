<template>
    <div>
        <div class="card">
            <b-modal
                id="editPostModal"
                ref="modal"
                title="Edit Post"
                v-model="showEditPostModalLocal"
                @show="showModal"
                @hidden="hideModal"
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
                        rows="2s"
                        max-rows="6"
                        :state="bodyState"
                        required
                    >
                    </b-form-textarea>

                    <div class="d-flex justify-content-center m-2">
                        <img
                            v-if="imgUrl && imgFile != null"
                            :src="imgUrl"
                            style="max-width:460px; max-height:320px"
                        />
                    </div>

                    <!-- <ImageAutoResize @update:field="imgFile = $event" /> -->

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
// import ImageUploader from "vue-image-upload-resize";
// import ImageAutoResize from "../../components/ImageAutoResize";

export default {
    name: "EditPostModal",
    components: {
        UserPhoto
        // ImageAutoResize
        // ImageUploader
    },
    mounted: function() {},
    props: ["showEditPostModal", "post"],
    computed: {
        activeUser() {
            return this.$store.getters.activeUser;
        },
        showEditPostModalLocal: {
            get: function() {
                return this.showEditPostModal;
            },
            set: function(value) {
                this.$emit("updateVisibleState", value);
            }
        }
    },
    data() {
        return {
            body: this.post.body,
            bodyState: null,
            imgUrl: null,
            imgFile: null,
            hasImage: false,
        };
    },
    methods: {
        setImage: function(output) {
            this.hasImage = true;
            this.imgFile = output;
            console.log("Info", output.info);
            console.log("Exif", output.exif);
        },
        onFileChange(e) {
            const file = e.target.files[0];
            this.imgUrl = URL.createObjectURL(file);
        },
        updatePostAction() {
            let formData = new FormData();

            if (this.imgFile) {
                formData.append("image", this.imgFile);
            }

            formData.append("body", this.body);

            const packet = {
                overhead: { post: this.post },
                formData: formData
            };

            this.$store
                .dispatch("updatePost", packet)
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
        showModal() {
            this.showData()
        },
        hideModal() {
            this.clearData()
        },
        clearData() {
            this.body = "";
            this.imgUrl = null;
            this.imgFile = null;
            this.bodyState = null;
        },
             showData() {
            this.body = this.post.body,
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
            this.updatePostAction();
        },

        hideCreatePostModal() {
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide("editPostModal");
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
