<template>
    <div>
        <UiModal
            :busy="is_loading"
            ref="modal"
            :title="titleTotalFollowings"
            v-model="showLocal"
            ok-only
            close-on-confirm
            centered
            @opened="showModal"
            @closed="hideModal"
            ok-title="OK"
            @confirm="handleOk"
        >
            <Loading v-if="is_loading"></Loading>
            <UserFollowerListItem
                v-else
                v-for="follower in followings"
                :user="follower.attributes.followable"
                v-bind:key="follower.attributes.id"
            />
        </UiModal>
    </div>
</template>

<script>
import UserFollowerListItem from "@/views/follower/UserFollowerListItem";
import Loading from "@/components/Loading";
export default {
  emits: ["updateVisibleState"],
  name: "UserFollowingListModal",
  props: ["user", "show"],
  components: {
    UserFollowerListItem,
    Loading
  },
  data() {
    return {
      is_loading: false,
      scrolledToBottom: false
    };
  },
  computed: {
    followings() {
      return this.$stores.userFollowing.userFollowingsResponse.data;
    },
    showLocal: {
      get: function () {
        return this.show;
      },
      set: function (value) {
        this.$emit("updateVisibleState", value);
      }
    },
    totalFollowings() {
      if (this.$stores.userFollowing.userFollowingsResponse.meta) {
        return this.$stores.userFollowing.userFollowingsResponse.meta.total;
      } else {
        return 0;
      }
    },
    titleTotalFollowings() {
      return "Following (" + this.totalFollowings + ")";
    },
    myLike() {
      return this.user.my_like;
    }
  },
  async mounted() {},
  methods: {
    handleOk() {},
    showModal() {
      // this.fetchFollowerFeedAction();
    },
    hideModal() {},
    fetchFollowerFeedAction() {
      const self = this;
      self.is_loading = true;
      this.$stores.userFollowing.fetchUserFollowings({
        user_id: this.user.id
      }).then(() => {}).catch(() => {}).finally(() => {
        this.is_loading = false;
        this.scrolledToBottom = false;
      });
    }
  }
};
</script>
