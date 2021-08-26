<template>
    <div>

                <div class="d-flex justify-content-between">
                    <div class="p-2">
                        <i class="far fa-thumbs-up"></i> Iqbal and 137 others
                    </div>

                    <div class="p-2">
                        <i class="far fa-comment-dots"></i> {{ totalComments }} comments
                    </div>
                </div>

                <div
                    class="d-flex justify-content-between border border-left-0 border-right-0 border-bottom-0"
                >
                    <div>
                        <a href="#" class="btn btn-light">
                            <i class="far fa-thumbs-up"></i> Like</a
                        >
                    </div>

                    <a href="#" class="btn btn-light">
                        <i class="far fa-comment-dots"></i> Comment</a
                    >
                </div>

        <Loading v-if="is_loading"></Loading>

        <CommentListItem
            v-else
            v-for="comment in comments"
            :comment="comment.attributes"
            :post="post"
            v-bind:key="comment.attributes.id"
        />

         <CreatePostComment :post="post" />

    </div>
</template>

<script>
import CreatePostComment from "../postcomment/CreatePostComment";
import CommentListItem from "../postcomment/CommentListItem";
import Loading from "@/components/Loading";

export default {
    name: "ShowPostComments",
    props: ["post"],
    components: { CreatePostComment, CommentListItem, Loading },
    data() {
        return {
            is_loading: true
        };
    },
    computed: {
                 totalComments() {
            return this.post.comments == null ? 0 : this.post.comments.meta.total;
        },

        comments() {
            return this.post.comments == null ? [] : this.post.comments.data;
        },

    },
    mounted() {
        this.fetchPostCommentsAction();
    },

    methods: {
        fetchPostCommentsAction() {
            this.$store
                .dispatch("fetchPostComments", this.post)
                .then(() => {})
                .catch(() => {})
                .finally(() => {
                    this.is_loading = false;
                });
        }
    }
};
</script>
