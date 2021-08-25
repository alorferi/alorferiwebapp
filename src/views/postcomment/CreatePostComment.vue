<template>
    <div class="media p-3" >

            <div class="media-body">
        <form ref="form" @submit.stop.prevent="handleSubmit">
            <div class="form-group d-flex">
                <UserPhoto
                    :user="this.$store.getters.activeUser"
                    size="24"
                ></UserPhoto>

                <b-form-input
                    class="form-control ml-2"
                    v-model="body"
                    placeholder="Type your comment here"
                    v-on:keyup="handleSubmit"
                ></b-form-input>
            </div>
        </form>
        </div>
    </div>
</template>

<script>
import UserPhoto from "../user/UserPhoto";

export default {
    name: "CreatePostComment",
    props: ["post"],
    components: { UserPhoto },
    data() {
        return {
            body: "",
            bodyState: null
        };
    },
    methods: {
        createPostCommenAction() {
            // let formData = new FormData();

            // formData.append("body", this.body);
            // formData.append("post_id", this.post.id);

            let packet = {
                overhead: {
                    post_id: this.post.id
                },
                payload: {
                    body: this.body
                }
            };

            this.$store
                .dispatch("createPostComment", packet)
                .then(() => {
                    // this.hideCreatePostModal();
                    alert("CommentSaved");
                })
                .catch(() => {
                    alert("Faild to sve comment");
                })
                .finally();
        },

        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            this.bodyState = valid;
            return valid;
        },
        resetModal() {
            this.body = "";
            this.bodyState = null;
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault();
            // Trigger submit handler
            this.handleSubmit();
        },
        handleSubmit(e) {
            if (e.keyCode === 13) {
                // Exit when the form isn't valid
                if (!this.checkFormValidity()) {
                    return;
                }
                // Subit data to backend server
                this.createPostCommenAction();
            }
        }
    }
};
</script>
