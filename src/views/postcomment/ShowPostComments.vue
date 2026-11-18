<template>
    <div>
        <div class="social-engagement">
            <button v-if="likeCount" type="button" @click="showLikesModal = true">
                <i class="far fa-thumbs-up" aria-hidden="true"></i> <span v-if="myLike">{{ $t("social.you") }} · </span
                >{{ likeCount }} {{ $t("social.likes") }}</button
            ><span v-else></span>
            <button v-if="commentCount" type="button" @click="focusComment">
                {{ commentCount }} {{ $t("social.comments") }}
            </button>
        </div>
        <div class="social-post-actions">
            <button
                type="button"
                class="ui-button ui-button-link"
                :disabled="likeBusy || !likeReady"
                :aria-pressed="myLike ? 'true' : 'false'"
                @click="onClikcLike"
            >
                <i class="far fa-thumbs-up" aria-hidden="true"></i>{{ $t(myLike ? "social.liked" : "social.like") }}
            </button>
            <button type="button" class="ui-button ui-button-link" @click="focusComment">
                <i class="far fa-comment" aria-hidden="true"></i>{{ $t("social.comment") }}
            </button>
        </div>
        <p v-if="actionError" role="alert" class="social-inline-error">{{ $t("social.requestError") }}</p>
        <Loading v-if="is_loading" />
        <div v-else-if="loadError" class="social-inline-error">
            <p role="alert">{{ $t("social.requestError") }}</p>
            <button type="button" class="social-read-more" @click="loadDetails">{{ $t("social.retry") }}</button>
        </div>
        <div v-else class="social-comments">
            <CommentListItem
                v-for="comment in comments"
                :key="comment.attributes.id"
                :comment="comment.attributes"
                :post="post"
            />
        </div>
        <CreatePostComment ref="comment" :post="post" />
        <PostLikesModal :show="showLikesModal" :post="post" @updateVisibleState="showLikesModal = $event" />
    </div>
</template>
<script>
import CreatePostComment from "./CreatePostComment";
import CommentListItem from "./CommentListItem";
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
      showLikesModal: false,
      likeBusy: false,
      likeReady: false,
      actionError: false,
      loadError: false
    };
  },
  computed: {
    comments() {
      return this.post.comments_data && this.post.comments_data.data || [];
    },
    likes() {
      return this.post.likes_data && this.post.likes_data.data || [];
    },
    myLike() {
      return this.post.my_like;
    },
    likeCount() {
      return this.post.likes_data && this.post.likes_data.meta && this.post.likes_data.meta.total || this.likes.length;
    },
    commentCount() {
      return this.post.comments_data && this.post.comments_data.meta && this.post.comments_data.meta.total || this.comments.length;
    }
  },
  mounted() {
    this.loadDetails();
  },
  methods: {
    async loadDetails() {
      if (this._detailsLoading) return;
      this._detailsLoading = true;
      this.is_loading = true;
      this.loadError = false;
      const results = await Promise.allSettled(["fetchPostComments", "fetchPostLikes", "fetchPostMyLike"].map(action => this.$actions[action](this.post)));
      this.likeReady = results[2].status === "fulfilled" || results[2].reason && results[2].reason.response && results[2].reason.response.status === 404;
      this.loadError = results.slice(0, 2).some(r => r.status === "rejected") || !this.likeReady;
      this.is_loading = false;
      this._detailsLoading = false;
    },
    focusComment() {
      this.$refs.comment.focusInput();
    },
    async onClikcLike() {
      if (this.likeBusy || !this.likeReady) return;
      this.likeBusy = true;
      this.actionError = false;
      try {
        await this.$actions[this.myLike ? "deletePostLike" : "storePostLike"]({
          overhead: {
            post: this.post
          },
          payload: {
            emoji_html_code: "&#x1F44D;"
          }
        });
      } catch (error) {
        this.actionError = true;
      } finally {
        this.likeBusy = false;
      }
    }
  }
};
</script>
