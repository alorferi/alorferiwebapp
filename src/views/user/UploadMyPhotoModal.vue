<template>
    <div>
        <b-modal
            ref="modal"
            :title="modalTile"
            v-model="showLocal"
            @show="showModal"
            @hidden="hideModal"
            ok-title="Save"
            @ok="handleOk"
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

                <div class="d-flex justify-content-center m-2">
                    <img
                        :src="imgUrl"
                        style="max-width:460px; max-height:460px"
                    />
                </div>
                <b-form-file
                    v-model="imgFile"
                    accept="image/*"
                    placeholder="Choose an image or drop it here..."
                    drop-placeholder="Drop your image here..."
                    @change="onFileChange"
                ></b-form-file>
            </form>
        </b-modal>
        <!-- </div> -->
    </div>
</template>

<script>
// import UserPhoto from "../user/UserPhoto";
import Loading from "@/components/Loading";
// import ImageUploader from "vue-image-upload-resize";
// import ImageAutoResize from "../../components/ImageAutoResize";

export default {
    name: "UploadMyPhotoModal",
    components: {
        // UserPhoto,
        // ImageAutoResize
        // ImageUploader,
        Loading
    },
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
            is_loading: false,
            modalTile: "Upload your photo from computer."
        };
    },
    methods: {
        onFileChange(e) {
            const file = e.target.files[0];
            this.imgUrl = URL.createObjectURL(file);
        },

        updateUserPhoto() {
            const self = this;

            let formData = new FormData();

            if (self.imgFile) {
                formData.append("photo", self.imgFile);
            }

            self.is_loading = true;

            var packet = {
                formData: formData
            };

            self.$store
                .dispatch("uploadMyPhoto", packet)
                .then(() => {
                    self.hideThisModal();
                })
                .catch(() => {})
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
            this.imgUrl = null;
            this.imgFile = null;
        },
        showData() {
            this.imgUrl = this.getApiUrl(this.user.photo_url);
            this.imgFile = null;
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
