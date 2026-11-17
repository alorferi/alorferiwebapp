<template>
    <div>
        <UiModal
            :busy="is_loading"
            ref="modal"
            :title="modalTile"
            v-model="showLocal"
            @opened="showModal"
            @closed="hideModal"
            ok-title="Save"
            @confirm="handleOk"
            centered
        >
            <!-- <div class="d-flex align-items-center mb-3"> -->
            <!-- <UserPhoto :user="activeUser" size="16"></UserPhoto> -->

            <!-- <div class="ml-2">
                {{ activeUser.first_name }} {{ activeUser.surname }}
                {{ activeUser.nickname }}
            </div> -->
            <!-- </div> -->
            <form ref="form" @submit.stop.prevent="handleSubmit" class="mb-2">
                <Loading v-if="is_loading"></Loading>

                <div class="flex justify-center m-2">
                    <img
                        v-if="imgUrl"
                        :src="imgUrl"
                        style="max-width: 460px; max-height: 460px"
                        class="h-[96px] rounded-full"
                        width="96px"
                        height="96px"
                    />
                </div>
                <UiFileInput
                    required
                    :disabled="is_loading"
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
// import UserPhoto from "../user/UserPhoto";
import Loading from "@/components/Loading";
// import ImageUploader from "vue-image-upload-resize";

export default {
    name: "UploadMyPhotoModal",
    components: {
        // UserPhoto,
        // ImageUploader,
        Loading
    },
    beforeDestroy() { if (this.imgUrl && this.imgUrl.startsWith("blob:")) URL.revokeObjectURL(this.imgUrl); },
    mounted: function() {},
    props: ["show"],
    computed: {
        user() {
            return this.$store.getters.activeUser;
        },
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
            imgUrl: null,
            imgFile: null,
            hasImage: false,
            requestError: "",
            is_loading: false,
            modalTile: "Upload photo from computer."
        };
    },
    methods: {
        onFileChange(file) {
            if (this.imgUrl && this.imgUrl.startsWith("blob:")) URL.revokeObjectURL(this.imgUrl);
            this.imgFile = file;
            this.imgUrl = file ? URL.createObjectURL(file) : null;
        },

        updateUserPhoto() {
            const self = this;

            let formData = new FormData();

            if (self.imgFile) {
                formData.append("photo", self.imgFile);
            }

            self.requestError = "";
            self.is_loading = true;

            var packet = {
                formData: formData
            };

            self.$store
                .dispatch("uploadMyPhoto", packet)
                .then(() => {
                    self.hideThisModal();
                })
                .catch(error => { self.requestError = requestErrorMessage(error, self.$store.getters.activeLanguage); })
                .finally(() => {
                    self.is_loading = false;
                });
        },

        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            return valid;
        },
        showModal() {
            this.showData();
        },
        hideModal() {
            this.clearData();
        },
        clearData() {
            this.requestError = "";
            if (this.imgUrl && this.imgUrl.startsWith("blob:")) URL.revokeObjectURL(this.imgUrl);
            this.imgUrl = null;
            this.imgFile = null;
        },
        showData() {
            this.imgUrl = this.getApiUrl(this.user.photo_url);
            this.imgFile = null;
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
            this.updateUserPhoto();
        },

        hideThisModal() {
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
