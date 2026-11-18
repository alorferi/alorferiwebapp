<template>
    <div class="flex items-start gap-3 p-2">
        <UserPhoto :user="comment.user" size="28" />
        <div class="min-w-0 flex-1 social-comment-bubble">
            <div class="flex justify-between gap-2">
                <div class="min-w-0">
                    <router-link
                        class="font-semibold text-sm break-words"
                        :to="{ name: 'users.show', params: { user_id: comment.user.id } }"
                        >{{ comment.user.first_name }} {{ comment.user.surname }}</router-link
                    >
                    <time class="block text-xs text-secondary" :datetime="comment.created_at">{{
                        momentFromNow(comment.created_at)
                    }}</time>
                </div>
                <UiDropdown
                    v-if="isAbletoDeleteComment"
                    trigger-class="ui-button ui-button-link"
                    :label="$t('social.commentActions')"
                >
                    <template #trigger><i class="fas fa-ellipsis-h" aria-hidden="true"></i></template>
                    <button type="button" class="ui-menu-item text-danger" :disabled="deleting" @click="deleteComment">
                        {{ $t("social.deleteComment") }}
                    </button>
                </UiDropdown>
            </div>
            <p class="whitespace-pre-line break-words text-sm mb-0 mt-2">{{ comment.body }}</p>
            <p v-if="failed" role="alert" class="text-sm text-danger mt-2 mb-0">{{ $t("social.requestError") }}</p>
        </div>
    </div>
</template>
<script>
import UserPhoto from "../user/UserPhoto";
export default {
    name: "CommentListItem",
    props: ["comment", "post"],
    components: { UserPhoto },
    data() {
        return { deleting: false, failed: false };
    },
    computed: {
        isAbletoDeleteComment() {
            return (
                this.comment.user.id === this.$store.getters.activeUser.id ||
                this.post.user.id === this.$store.getters.activeUser.id
            );
        },
    },
    methods: {
        async deleteComment() {
            if (this.deleting) return;
            this.deleting = true;
            this.failed = false;
            try {
                await this.$store.dispatch("deletePostComment", {
                    overhead: { post: this.post, comment: this.comment },
                });
            } catch (error) {
                this.failed = true;
            } finally {
                this.deleting = false;
            }
        },
    },
};
</script>
