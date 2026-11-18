<template>
    <div>
        <UserCoverPhotoWithUpload :user="user" />

        <div class="ui-card social-identity-card">
            <div class="social-identity">
                <div class="shrink-0">
                    <UserPhotoWithUpload :user="user" size="96" />
                </div>

                <div class="social-identity-info min-w-0 grow">
                    <h2 class="break-words">
                        {{ user.first_name }} {{ user.surname }}
                        {{ user.nickname }}
                    </h2>

                    <UserFollowersModal
                        :show="showUserFollowers"
                        @updateVisibleState="showUserFollowers = $event"
                        :user="user"
                    />

                    <UserFollowingListModal
                        :show="showUserFollowings"
                        @updateVisibleState="showUserFollowings = $event"
                        :user="user"
                    />

                    <div class="social-identity-actions">
                        <button
                            v-if="!isItMe(user)"
                            class="ui-button ui-button-primary"
                            type="button"
                            :disabled="followBusy || !followReady"
                            @click="toggleFollow"
                        >
                            {{ $t(isFollowingByMe ? "social.unfollow" : "social.follow") }}
                        </button>
                        <router-link v-else class="ui-button ui-button-light" :to="{ name: 'users.edit-me' }">{{
                            $t("social.editProfile")
                        }}</router-link>
                        <div v-if="followError" class="text-danger text-sm w-full">
                            <span role="alert">{{ $t("social.followError") }}</span
                            ><button type="button" class="social-read-more ml-2" @click="fetchUserFollowingByMeAction">
                                {{ $t("social.retry") }}
                            </button>
                        </div>
                        <button
                            class="ui-button ui-button-small ui-button-link mt-1 mb-1 mr-1"
                            @click="showUserFollowings = !showUserFollowings"
                        >
                            {{ totalFollowings }}
                        </button>

                        <button
                            class="ui-button ui-button-small ui-button-link mt-1 mb-1 mr-1"
                            @click="showUserFollowers = !showUserFollowers"
                        >
                            {{ totalFollowers }}
                        </button>

                        <UiDropdown
                            trigger-class="ui-button ui-button-small ui-button-link mt-1 mb-1 border-t border-l border-r border-b"
                            :label="$t('social.actions')"
                            ><template #trigger>
                                <i class="fas fa-ellipsis-h" aria-hidden="true"></i>
                            </template>

                            <router-link class="ui-menu-item" v-if="isItMe(user)" :to="{ name: 'users.edit-me' }">
                                {{ $t("social.editProfile") }}
                            </router-link>
                            <div class="ui-menu-separator"></div>
                            <a
                                class="ui-menu-item text-danger"
                                href="#"
                                v-if="!isItMe(user)"
                                @click.prevent="showCreateReportModel = !showCreateReportModel"
                            >
                                <i class="fas fa-exclamation-triangle"></i>
                                {{ $t("social.report") }}</a
                            >

                            <a
                                class="ui-menu-item text-danger"
                                href="#"
                                v-if="!isItMe(user)"
                                @click.prevent="showCreateBlockModel = !showCreateBlockModel"
                            >
                                <i class="fas fa-exclamation-triangle"></i>
                                {{ $t("social.block") }}</a
                            >
                        </UiDropdown>
                    </div>

                    <div></div>
                </div>
            </div>

            <div class="social-profile-tabs">
                <ul class="flex flex-wrap ui-tabs [&>li]:flex-1 [&>li]:text-center">
                    <li class="" v-for="(tab, index) in getTabs" v-bind:key="index">
                        <a
                            class="ui-nav-link"
                            href="#"
                            :class="{ 'ui-selected': tab.active }"
                            @click.prevent="clickTabItem(tab)"
                            >{{ tabLabel(tab) }}</a
                        >
                    </li>
                </ul>
            </div>
        </div>

        <CreateReportModal
            :show="showCreateReportModel"
            @updateVisibleState="showCreateReportModel = $event"
            :user="user"
            complainable_type="User"
            :complainable_id="user.id"
        />

        <CreateBlockModal
            :show="showCreateBlockModel"
            @updateVisibleState="showCreateBlockModel = $event"
            :user="user"
            blockable_type="User"
            :blockable_id="user.id"
            @didFinish="didFinishBlockingUser"
        />

        <component :is="tabBody" :user="user"></component>
    </div>
</template>

<script>
import { markRaw } from "vue";
import UserPhotoWithUpload from "@/views/user/UserPhotoWithUpload";
import UserTimeline from "@/views/user/UserTimeline";
import UserAbout from "@/views/user/UserAbout";
import UserFollowersModal from "@/views/follower/UserFollowersModal.vue";
import UserFollowingListModal from "@/views/follower/UserFollowingListModal.vue";
import UserCoverPhotoWithUpload from "@/views/user/UserCoverPhotoWithUpload.vue";
import CreateReportModal from "@/views/complain/CreateReportModal.vue";
import CreateBlockModal from "@/views/complain/CreateBlockModal.vue";
export default {
  name: "UserPager",
  props: ["user"],
  components: {
    UserPhotoWithUpload,
    UserTimeline,
    UserAbout,
    UserFollowersModal,
    UserFollowingListModal,
    UserCoverPhotoWithUpload,
    CreateReportModal,
    CreateBlockModal
  },
  async mounted() {
    const self = this;
    self.fetchUserFollowersAction();
    self.fetchUserFollowingAction();
    self.fetchUserFollowingByMeAction();
    self.initTabItems();
    self.$stores.pageTitle.setPageTitle(self.user.first_name);
  },
  computed: {
    isFollowingByMe() {
      return this.$stores.follower.followingSource === "user:" + this.user.id && this.$stores.follower.followingByMe != null;
    },
    getTabs() {
      return this.tabs;
    },
    tabBody() {
      return this.activeTab.tabBody;
    },
    totalFollowers() {
      var total = 0;
      if (this.$stores.follower.followersResponse.meta) {
        total = this.$stores.follower.followersResponse.meta.total;
      }
      return this.$t("social.followers") + " (" + total + ")";
    },
    totalFollowings() {
      var total = 0;
      if (this.$stores.userFollowing.userFollowingsResponse.meta) {
        total = this.$stores.userFollowing.userFollowingsResponse.meta.total;
      }
      return this.$t("social.following") + " (" + total + ")";
    }
  },
  methods: {
    tabLabel(tab) {
      const key = {
        TimeLine: "timeline",
        Timeline: "timeline",
        About: "about"
      }[tab.title] || (tab.title.startsWith("Books") ? "books" : tab.title.startsWith("Members") ? "members" : null);
      const count = tab.title.match(/\(.*\)/);
      return key ? this.$t("social." + key) + (count ? " " + count[0] : "") : tab.title;
    },
    async toggleFollow() {
      if (this.followBusy || !this.followReady) return;
      this.followBusy = true;
      this.followError = false;
      try {
        await this.$actions[this.isFollowingByMe ? "unFollowUserByMe" : "followUserByMe"]({
          user_id: this.user.id
        });
      } catch (error) {
        this.followError = true;
      } finally {
        this.followBusy = false;
      }
    },
    initTabItems() {
      this.tabs.push({
        title: "TimeLine",
        tabBody: markRaw(UserTimeline),
        active: true
      });
      this.tabs.push({
        title: "About",
        tabBody: markRaw(UserAbout),
        active: false
      });
      this.activeTab = this.tabs[0];
    },
    isActive: function (item) {
      return {
        active: item.active
      };
    },
    clickTabItem(tab) {
      if (tab != this.activeTab) {
        tab.active = true;
        this.activeTab.active = false;
        this.activeTab = tab;
      }
    },
    fetchUserFollowersAction() {
      const self = this;
      this.$stores.userFollower.fetchUserFollowers({
        user_id: self.user.id
      }).then(() => {
        console.log("fetchUserFollowers", this.$stores.follower.followersResponse.meta.total);
      }).catch(() => {}).finally(() => {});
    },
    fetchUserFollowingAction() {
      const self = this;
      this.$stores.userFollowing.fetchUserFollowings({
        user_id: self.user.id
      }).then(() => {}).catch(() => {}).finally(() => {});
    },
    followUserByMeAction() {
      const self = this;
      this.$stores.userFollower.followUserByMe({
        user_id: self.user.id
      }).then(() => {}).catch(() => {}).finally(() => {});
    },
    unFollowUserByMeAction() {
      const self = this;
      this.$stores.userFollower.unFollowUserByMe({
        user_id: self.user.id
      }).then(() => {}).catch(() => {}).finally(() => {});
    },
    fetchUserFollowingByMeAction() {
      const self = this;
      self.followReady = false;
      this.$stores.userFollower.fetchUserFollowingByMe({
        user_id: self.user.id
      }).then(() => {
        self.followReady = true;
        self.followError = false;
      }).catch(error => {
        if (error.response && error.response.status === 404) self.followReady = true;else self.followError = true;
      });
    },
    didFinishBlockingUser() {
      this.$stores.post.removePostsOfUser(this.user);
      this.$router.push({
        name: "home"
      });
    }
  },
  data: function () {
    return {
      tabs: [],
      activeTab: {},
      followBusy: false,
      followReady: false,
      followError: false,
      showUploadMyCoverModal: false,
      showUserFollowers: false,
      showUserFollowings: false,
      showCreateReportModel: false,
      showCreateBlockModel: false,
      is_loading: false
    };
  }
};
</script>

<style scoped></style>
