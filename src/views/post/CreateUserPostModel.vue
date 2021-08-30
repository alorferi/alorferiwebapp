<template>
    <div>
        <b-modal
            id="createPostModal"
            ref="modal"
            title="Write a discussion"
            v-model="showLocal"
            @show="resetModal"
            @hidden="resetModal"
            ok-title="Post"
            @ok="handleOk"
            centered
        >
            <div class="d-flex align-items-center mb-3">
                <UserPhoto :user="activeUser" size="16"></UserPhoto>

                <div class="ml-2">
                    <h6>
                        {{ activeUser.first_name }} {{ activeUser.surname }}
                        {{ activeUser.nickname }}
                    </h6>
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
</template>
<script>
import UserPhoto from "../user/UserPhoto";
import Loading from "@/components/Loading";

export default {
    name: "CreateUserPostModel",
    components: {
        UserPhoto,
        Loading
        // CreateUserPostModel
        // ImageAutoResize
        // ImageUploader
    },
    mounted: function() {},
    props: ["show"],
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
            title: "",
            body: "",
            bodyState: null,
            imgUrl: null,
            imgFile: null,
            hasImage: false,
            is_loading: false
        };
    },

    methods: {
        onFileChange(e) {
            const file = e.target.files[0];
            this.imgUrl = URL.createObjectURL(file);
        },
        storePostAction() {
            this.is_loading = true;
            let formData = new FormData();

            if (this.imgFile) {
                formData.append("image", this.imgFile);
            }

            formData.append("title", this.title);
            formData.append("body", this.body);

            this.$store
                .dispatch("storePost", formData)
                .then(() => {
                    this.hideCreatePostModal();
                })
                .catch(() => {})
                .finally(() => {
                    this.is_loading = true;
                });
        },

        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            this.bodyState = valid;
            return valid;
        },
        resetModal() {
            this.title = "";
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
            this.storePostAction();
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
