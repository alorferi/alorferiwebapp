<template>
    <div>
        <!-- <div class="card"> -->
        <b-modal
            ref="modal"
            :title="modalTile"
            v-model="showLocal"
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
            <form ref="form" @submit.stop.prevent="handleSubmit" class="mb-2">
                <b-form-input
                    class="form-control mb-2"
                    v-model="title"
                    placeholder="What is the title of your discussion?"
                ></b-form-input>

                <b-form-textarea
                    id="textarea"
                    v-model="body"
                    placeholder="What do you want to discussion about?"
                    rows="4s"
                    max-rows="6"
                    :state="bodyState"
                    required
                >
                </b-form-textarea>

                <Loading v-if="is_loading"></Loading>

                <div class="d-flex justify-content-center m-2">
                    <img
                        v-if="imgUrl"
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
        <!-- </div> -->
    </div>
</template>

<script>
import UserPhoto from "../user/UserPhoto";
import Loading from "@/components/Loading";
// import ImageUploader from "vue-image-upload-resize";
// import ImageAutoResize from "../../components/ImageAutoResize";

export default {
    name: "CreateOrEditPostModal",
    components: {
        UserPhoto,
        // ImageAutoResize
        // ImageUploader,
        Loading
    },
    mounted: function() {},
    props: ["show", "post"],
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
            is_loading: false,
            modalTile:
                this.post == null ? "Write a discussion" : "Edit the discussion"
        };
    },
    methods: {
        onFileChange(e) {
            const file = e.target.files[0];
            this.imgUrl = URL.createObjectURL(file);
        },
        updatePostAction() {
            let formData = new FormData();

            if (this.imgFile) {
                formData.append("image", this.imgFile);
            }

            formData.append("title", this.title == null ? "" : this.title);
            formData.append("body", this.body == null ? "" : this.body);

            const packet = {
                overhead: { post: this.post },
                formData: formData
            };

            this.is_loading = true;
            if (this.post) {
                this.$store
                    .dispatch("updatePost", packet)
                    .then(() => {
                        this.hidePostModal();
                    })
                    .catch(() => {})
                    .finally(() => {
                        this.is_loading = false;
                    });
            } else {
                this.$store
                    .dispatch("storePost", formData)
                    .then(() => {
                        this.hidePostModal();
                    })
                    .catch(() => {})
                    .finally(() => {
                        this.is_loading = false;
                    });
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