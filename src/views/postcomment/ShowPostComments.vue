<template>
    <div>

        <CommentListItem
            v-for="comment in post.comments"
            :comment="comment.attributes"
            v-bind:key="comment.id"
        />


        <CreatePostComment :post="post" />
    </div>
</template>

<script>
import CreatePostComment from "../postcomment/CreatePostComment";
import CommentListItem from "../postcomment/CommentListItem";

export default {
    name: "ShowPostComments",
    props: ["post"],
    components: {  CreatePostComment,CommentListItem },
    data() {
        return {};
    },
    computed: {},

    methods: {
                fetchPostCommentsAction() {
            this.$store
                .dispatch("fetchPostComments")
                .then(() => {})
                .catch(() => {})
                .finally(() => {
                    this.is_loading = false;
                    this.scrolledToBottom = false;
                });
        },
    }
};
</script>
