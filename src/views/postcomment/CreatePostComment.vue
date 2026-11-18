<template>
    <div class="social-comment-form">
        <div class="min-w-0 flex-1">
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <div class="flex items-center">
                    <UserPhoto :user="this.$stores.user.activeUser" size="24"></UserPhoto>

                    <input
                        :aria-label="$t('social.writeComment')"
                        ref="input"
                        class="ui-field ml-2"
                        v-model="body"
                        :placeholder="$t('social.commentPlaceholder')"
                        required
                        :disabled="isSubmitting"
                    />
                </div>
            </form>
            <p v-if="requestError" class="text-sm text-danger mt-2" role="alert">{{ $t("social.requestError") }}</p>
        </div>
    </div>
</template>

<script>
import UserPhoto from "../user/UserPhoto";
export default {
  name: "CreatePostComment",
  props: ["post"],
  components: {
    UserPhoto
  },
  data() {
    return {
      body: "",
      bodyState: null,
      isSubmitting: false,
      requestError: false
    };
  },
  methods: {
    focusInput() {
      this.$refs.input.focus();
      this.$refs.input.scrollIntoView({
        block: "nearest",
        behavior: "auto"
      });
    },
    storePostCommenAction() {
      let packet = {
        overhead: {
          post: this.post
        },
        payload: {
          body: this.body
        }
      };
      this.$stores.comment.storePostComment(packet).then(() => {
        this.body = "";
      }).catch(() => {
        this.requestError = true;
      }).finally(() => {
        this.isSubmitting = false;
      });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.bodyState = valid;
      return valid;
    },
    handleSubmit() {
      if (this.isSubmitting || !this.body.trim() || !this.checkFormValidity()) return;
      this.isSubmitting = true;
      this.requestError = false;
      this.storePostCommenAction();
    }
  }
};
</script>
