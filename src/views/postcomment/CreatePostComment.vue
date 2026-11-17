<template>
    <div class="flex items-start p-4">
        <div class="min-w-0 flex-1">
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <div class="mb-4 flex">
                    <UserPhoto :user="this.$store.getters.activeUser" size="24"></UserPhoto>

                    <input
                        aria-label="Write a comment"
                        class="ui-field ml-2"
                        v-model="body"
                        placeholder="Type your comment here"
                        required :disabled="isSubmitting"
                    />
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
            bodyState: null,
            isSubmitting: false
        };
    },
    methods: {
        storePostCommenAction() {

            let packet = {
                overhead: {
                    post: this.post
                },
                payload: {
                    body: this.body
                }
            };

            this.$store
                .dispatch("storePostComment", packet)
                .then(() => {
                     this.body = ""
                })
                .catch(() => {
                })
                .finally(() => { this.isSubmitting = false; });
        },

        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            this.bodyState = valid;
            return valid;
        },
        handleSubmit() {
            if (this.isSubmitting || !this.body.trim() || !this.checkFormValidity()) return;
            this.isSubmitting = true;
            this.storePostCommenAction();
        }
    }
};
</script>
