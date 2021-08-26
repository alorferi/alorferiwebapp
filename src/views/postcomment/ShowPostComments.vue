<template>
    <div>


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
        comments() {
            return this.post.comments;
        }
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
