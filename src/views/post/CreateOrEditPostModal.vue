<template>
    <div>
        <!-- <div class="card"> -->
        <UiModal
            :busy="is_loading"
            ref="modal"
            :title="modalTile"
            v-model="showLocal"
            @opened="showModal"
            @closed="hideModal"
            ok-title="Post"
            @confirm="handleOk"
            centered
        >
            <div class="flex items-center mb-4">
                <UserPhoto :user="activeUser" size="16"></UserPhoto>

                <div class="ml-2">
                    {{ activeUser.first_name }} {{ activeUser.surname }}
                    {{ activeUser.nickname }}
                </div>
            </div>
            <form ref="form" @submit.stop.prevent="handleSubmit" class="mb-2">
                <textarea
                    aria-label="Discussion"
                    class="ui-field"
                    id="textarea"
                    v-model="body"
                    placeholder="What do you want to discussion about?"
                    rows="4"
                    :aria-invalid="bodyState === false ? 'true' : undefined"
                    required
                >
                </textarea>

                <Loading v-if="is_loading"></Loading>
                <div class="flex justify-center m-2">
                    <img v-if="imgUrl" :src="imgUrl" style="max-width: 460px; max-height: 320px" />
                </div>

                <UiFileInput
                    v-model="imgFile"
                    accept="image/*"
                    placeholder="Choose an image or drop it here..."
                    @change="onFileChange"
                ></UiFileInput>
            </form>
            <p v-if="requestError" role="alert" class="mt-3 text-danger">{{ requestError }}</p>
        </UiModal>
        <!-- </div> -->
    </div>
</template>

<script>
import { requestErrorMessage } from "@/components/ui/requestError";
import UserPhoto from "../user/UserPhoto";
import Loading from "@/components/Loading";
// import ImageUploader from "vue-image-upload-resize";

export default {
    name: "CreateOrEditPostModal",
    components: {
        UserPhoto,
        // ImageUploader,
        Loading
    },
    beforeDestroy() { if (this.imgUrl && this.imgUrl.startsWith("blob:")) URL.revokeObjectURL(this.imgUrl); },
    mounted: function() {},
    props: ["show", "post", "postable_type", "postable_id"],
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
        }
    },
    data() {
        return {
            title:
                this.post == null || this.post.title == null
                    ? ""
                    : this.post.title,
            body:
                this.post == null || this.post.body == null
                    ? ""
                    : this.post.body,
            bodyState: null,
            imgUrl: null,
            imgFile: null,
            hasImage: false,
            requestError: "",
            is_loading: false,
            modalTile:
                this.post == null ? this.$t('write_a_discussion') : this.$t('edit_a_discussion')
        };
    },
    methods: {
        onFileChange(file) {
            if (this.imgUrl && this.imgUrl.startsWith("blob:")) URL.revokeObjectURL(this.imgUrl);
            this.imgFile = file;
            this.imgUrl = file ? URL.createObjectURL(file) : null;
        },
        processUserPost(packet) {
            const self = this;

            if (self.post) {
                self.$store
                    .dispatch("updateUserPost", packet)
                    .then(() => {
                        self.hidePostModal();
                    })
                    .catch(error => { self.requestError = requestErrorMessage(error, self.$store.getters.activeLanguage); })
                    .finally(() => {
                        self.is_loading = false;
                    });
            } else {
                self.$store
                    .dispatch("storeUserPost", packet)
                    .then(() => {
                        self.hidePostModal();
                    })
                    .catch(error => { self.requestError = requestErrorMessage(error, self.$store.getters.activeLanguage); })
                    .finally(() => {
                        self.is_loading = false;
                    });
            }
        },

        processLibraryPost(packet) {
            const self = this;
            if (self.post) {
                self.$store
                    .dispatch("updateLibraryPost", packet)
                    .then(() => {
                        self.hidePostModal();
                    })
                    .catch(error => { self.requestError = requestErrorMessage(error, self.$store.getters.activeLanguage); })
                    .finally(() => {
                        self.is_loading = false;
                    });
            } else {
                self.$store
                    .dispatch("storeLibraryPost", packet)
                    .then(() => {
                        self.hidePostModal();
                    })
                    .catch(error => { self.requestError = requestErrorMessage(error, self.$store.getters.activeLanguage); })
                    .finally(() => {
                        self.is_loading = false;
                    });
            }
        },
        createOrUpdatePostAction() {
            const self = this;

            let formData = new FormData();

            if (self.imgFile) {
                formData.append("image", self.imgFile);
            }

            formData.append("title", self.title == null ? "" : self.title);
            formData.append("body", self.body == null ? "" : self.body);

            console.log("formData",  self.title, self.body);
            console.log("self.postable_type", self.postable_type);

            self.requestError = "";
            self.is_loading = true;
            switch (self.postable_type) {
                case "user":
                case "User":
                case "App\\Models\\User":
                    var packet = {
                        overhead: { post: self.post },
                        formData: formData
                    };
                    this.processUserPost(packet);
                    break;
                case "library":
                case "Library":
                case "App\\Models\\Library":
                    packet = {
                        overhead: {
                            postable_id: self.postable_id,
                            post: self.post
                        },
                        formData: formData
                    };

                    this.processLibraryPost(packet);

                    break;
            }
        },

        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            this.bodyState = valid;
            return valid;
        },
        showModal() {
            if (this.post) {
                this.showData();
            }
        },
        hideModal() {
            this.clearData();
        },
        clearData() {
            this.requestError = "";
            if (this.imgUrl && this.imgUrl.startsWith("blob:")) URL.revokeObjectURL(this.imgUrl);
            this.title = "";
            this.body = "";
            this.imgUrl = null;
            this.imgFile = null;
            this.bodyState = null;
        },
        showData() {
            (this.body = this.post.body),
                (this.imgUrl = this.getApiUrl(this.post.image_url));
            this.imgFile = null;
            this.bodyState = null;
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
            this.createOrUpdatePostAction();
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
