<template>
    <div>
        <div class="d-flex justify-content-between">
            <div >
                <div v-if="totalLikes == 1" class="p-1">
                    <i class="far fa-thumbs-up text-primary"></i> {{likes[0].attributes.user.first_name}}
                </div>

                <div v-else-if="totalLikes == 2" class="p-1">
                    <i class="far fa-thumbs-up text-primary"></i> {{likes[0].attributes.user.first_name}} and {{likes[1].attributes.user.first_name}}
                </div>

                <div v-else-if="totalLikes > 2" class="p-1">
                    <i class="far fa-thumbs-up text-primary"></i> {{likes[0].attributes.user.first_name}}, {{likes[1].attributes.user.first_name}} and
                    {{ totalLikes-2 }} other
                </div>

                <div v-else> </div>
            </div>

            <div>
                <div v-if="totalComments > 0" class="p-1">
                    <i class="far fa-comment-dots"></i>
                    {{ totalComments }} comments
                </div>
            </div>
        </div>

        <div
            class="d-flex justify-content-between border border-left-0 border-right-0 border-bottom-0"
        >
            <div>
                <button class="btn  "  type="button"  @click="storeOrRemoveLikeAction" v-bind:class="{'btn-light':!hasMyLike, 'btn-outline-primary':hasMyLike, 'border-bottom-0':hasMyLike, 'border-top-0':hasMyLike, 'border-left-0':hasMyLike, 'border-right-0':hasMyLike}">
                    <i class="far fa-thumbs-up"></i> Like</button
                >
            </div>

            <a class="btn btn-light">
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
            return this.post.comments == null
                ? 0
                : this.post.comments.meta.total;
        },

        comments() {
            return this.post.comments == null ? [] : this.post.comments.data;
        },
        totalLikes() {
            return this.post.likes == null ? 0 : this.post.likes.meta.total;
        },

        likes() {
            return this.post.likes == null ? [] : this.post.likes.data;
        }
        ,
         hasMyLike() {
            return this.post.my_like != null ;
        }
    },
    mounted() {
        this.fetchPostCommentsAction();
        this.fetchPostLikesAction();
        this.fetchPostMyLikeAction();
    },

    methods: {
        fetchPostCommentsAction() {
            this.is_loading = true;
            this.$store
                .dispatch("fetchPostComments", this.post)
                .then(() => {})
                .catch(() => {})
                .finally(() => {
                    this.is_loading = false;
                });
        },
        fetchPostLikesAction() {
            // this.is_loading = true;
            this.$store
                .dispatch("fetchPostLikes", this.post)
                .then(() => {})
                .catch(() => {})
                .finally(() => {
                    this.is_loading = false;
                });
        },        fetchPostMyLikeAction() {
            this.is_loading = true;
            this.$store
                .dispatch("fetchPostMyLike", this.post)
                .then(() => {})
                .catch(() => {})
                .finally(() => {
                    // this.is_loading = false;
                });
        },
        storeOrRemoveLikeAction() {


            if(this.post.attributes.my_like){

                //Remove or Delete Like

            }else{

                //Create Like
                 const packet = {
                overhead: {
                    post: this.post
                },
                payload: {
                    emoji_html_code: "&#x1F44D;"
                }
            };

            this.$store
                .dispatch("storePostLike", packet)
                .then(() => {})
                .catch(() => {})
                .finally(() => {
                });

            }


        }
    }
};
</script>
