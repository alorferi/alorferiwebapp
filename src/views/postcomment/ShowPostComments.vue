<template>
    <div>
        <div class="d-flex justify-content-between">
            <div>
                <div v-if="totalLikes == 1" class="p-1">
                    <a
                        class="btn btn-link"
                        @click="showLikesModal = !showLikesModal"
                    >
                        <i class="far fa-thumbs-up text-primary"></i>

                        <span v-if="myLike != null">
                            You
                        </span>

                        <span v-else>
                            {{ likes[0].attributes.user.first_name }}
                        </span>
                    </a>
                </div>

                <div v-else-if="totalLikes == 2" class="p-1">
                    <a
                        class="btn btn-link"
                        @click="showLikesModal = !showLikesModal"
                    >
                        <i class="far fa-thumbs-up text-primary"></i>

                        {{ textForTwoLikes }}
                    </a>
                </div>

                <div v-else-if="totalLikes >= 3" class="p-1">
                    <a
                        class="btn btn-link"
                        @click="showLikesModal = !showLikesModal"
                    >
                        <i class="far fa-thumbs-up text-primary"></i>

                        {{ textForGreatterThanOrEqualThreeLikes }}
                    </a>
                </div>

                <div v-else></div>
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
                <button
                    class="btn  "
                    type="button"
                    @click="onClikcLike"
                    v-bind:class="{
                        'btn-light': !myLike,
                        'btn-outline-primary': myLike,
                        'border-bottom-0': myLike,
                        'border-top-0': myLike,
                        'border-left-0': myLike,
                        'border-right-0': myLike
                    }"
                >
                    <i class="far fa-thumbs-up"></i> Like
                </button>
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

        <PostLikesModal
            :show="showLikesModal"
            :post="post"
            @updateVisibleState="showLikesModal = $event"
        />
    </div>
</template>

<script>
import CreatePostComment from "../postcomment/CreatePostComment";
import CommentListItem from "../postcomment/CommentListItem";
import Loading from "@/components/Loading";
import PostLikesModal from "../postlike/PostLikesModal";

export default {
    name: "ShowPostComments",
    props: ["post"],
    components: {
        CreatePostComment,
        CommentListItem,
        Loading,
        PostLikesModal
    },
    data() {
        return {
            is_loading: true,
            showLikesModal: false
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
        },
        myLike() {
            return this.post.my_like;
        },
        twoOtherLikes() {
            var collectedLikes = [];

            if (this.my_like == null) {
                for (let like of this.likes) {
                    collectedLikes.push(like);
                    if (collectedLikes.length == 2) {
                        break;
                    }
                }
            } else {
                for (let like of this.likes) {
                    if (like.attributes.id != this.my_like.id) {
                        collectedLikes.push(like);
                    }
                    if (collectedLikes.length == 2) {
                        break;
                    }
                }
            }

            return collectedLikes;
        },
        textForTwoLikes() {
            var text = "";

            if (this.myLike != null) {
                text = "You and ";

                if (this.likes[0].attributes.user.id != this.myLike.user.id) {
                    text = text + this.likes[0].attributes.user.first_name;
                } else {
                    text = text + this.likes[1].attributes.user.first_name;
                }
            } else {
                text =
                    this.likes[0].attributes.user.first_name +
                    " and " +
                    this.likes[1].attributes.user.first_name;
            }

            return text;
        },
        textForGreatterThanOrEqualThreeLikes() {
            var text = "";

            if (this.myLike != null) {
                text = "You, ";

                if (this.likes[0].attributes.user.id != this.myLike.user.id) {
                    text = text + this.likes[0].attributes.user.first_name;
                } else {
                    text = text + this.likes[2].attributes.user.first_name;
                }
            } else {
                text =
                    this.likes[0].attributes.user.first_name +
                    ", " +
                    this.likes[1].attributes.user.first_name;
            }

            if (this.totalLikes == 3) {
                text = text + " and 1 other";
            } else if (this.totalLikes > 3) {
                text = text + " and " + (this.totalLikes - 2 ).toString()+ " others";
            }

            return text;
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
        },
        fetchPostMyLikeAction() {
            this.is_loading = true;
            this.$store
                .dispatch("fetchPostMyLike", this.post)
                .then(() => {})
                .catch(() => {})
                .finally(() => {
                    // this.is_loading = false;
                });
        },
        onClikcLike() {
            if (this.post.my_like == null) {
                this.storeLikeAction();
            } else {
                this.removeLikeAction();
            }
        },
        storeLikeAction() {
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
                .finally(() => {});
        },

        removeLikeAction() {
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
                .dispatch("deletePostLike", packet)
                .then(() => {})
                .catch(() => {})
                .finally(() => {});
        }
    }
};
</script>
