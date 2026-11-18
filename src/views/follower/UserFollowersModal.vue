<template>
    <div>
        <UiModal
            :busy="is_loading"
            ref="modal"
            :title="titleTotalFollowers"
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
                v-for="follower in followers"
                :user="follower.attributes.user"
                v-bind:key="follower.attributes.id"
            />

            <!-- <div class=" text-right">Total: {{ totalFollowers }}</div> -->
        </UiModal>
    </div>
</template>

<script>
import UserFollowerListItem from "@/views/follower/UserFollowerListItem";
import Loading from "@/components/Loading";
export default {
  emits: ["updateVisibleState"],
  name: "UserFollowersModal",
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
    followers() {
      return this.$stores.follower.followersResponse.data;
    },
    showLocal: {
      get: function () {
        return this.show;
      },
      set: function (value) {
        this.$emit("updateVisibleState", value);
      }
    },
    totalFollowers() {
      if (this.$stores.follower.followersResponse.meta) {
        return this.$stores.follower.followersResponse.meta.total;
      } else {
        return 0;
      }
    },
    titleTotalFollowers() {
      return "Followers (" + this.totalFollowers + ")";
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
      this.$stores.userFollower.fetchUserFollowers({
        user_id: this.user.id
      }).then(() => {}).catch(() => {}).finally(() => {
        this.is_loading = false;
        this.scrolledToBottom = false;
      });
    }
  }
};
</script>
