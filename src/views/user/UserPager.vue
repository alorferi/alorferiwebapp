<template>
    <div>
        <UserCoverPhotoWithUpload :user="user" />

        <div class="bg-light">
            <div class="d-flex  border-left border-right">
                <div class="pl-3 pt-2 pb-2 text-center">
                    <UserPhotoWithUpload :user="user" size="96" />
                </div>

                <div class="flex-grow-1 p-2">
                    <h2 class="text-dark m-2">
                        {{ user.first_name }} {{ user.surname }}
                        {{ user.nickname }}
                    </h2>

                    <UserFollowersModal
                        :show="showUserFollowers"
                        @updateVisibleState="showUserFollowers = $event"
                        :user="user"
                    />

                    <UserFollowingModal
                        :show="showUserFollowings"
                        @updateVisibleState="showUserFollowings = $event"
                        :user="user"
                    />

                    <div class="btn-group">
                        <button
                            class="btn btn-sm btn-link  mt-1 mb-1 mr-1"
                            @click="showUserFollowings = !showUserFollowings"
                        >
                            {{ totalFollowings }}
                        </button>

                        <button
                            class="btn btn-sm btn-link   mt-1 mb-1  mr-1"
                            @click="showUserFollowers = !showUserFollowers"
                        >
                            {{ totalFollowers }}
                        </button>

                        <button
                            type="button"
                            class="dropdown-toggle dropdown-toggle-split btn btn-sm btn-link mt-1 mb-1
                        border-top border-left border-right border-bottom
                        "
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <div class="dropdown-menu">
                            <a
                                class="dropdown-item"
                                href="#"
                                v-if="!isItMe(user) && !isFollowingByMe"
                                @click="followUserByMeAction()"
                                >Follow</a
                            >

                            <a
                                class="dropdown-item"
                                v-if="!isItMe(user) && isFollowingByMe"
                                href="#"
                                @click="unFollowUserByMeAction()"
                                >Unfollow</a
                            >

                            <router-link
                                class="dropdown-item"
                                v-if="isItMe(user)"
                                :to="{ name: 'users.edit-me' }"
                            >
                                Edit My Profile
                            </router-link>
                            <div class="dropdown-divider"></div>
                            <a
                                class="dropdown-item text-danger"
                                href="#"
                                v-if="!isItMe(user)"
                                @click="
                                    showCreateReportModel = !showCreateReportModel
                                "
                            >
                                <i class="fas fa-exclamation-triangle"></i>
                                Report this user</a
                            >

                            <a
                                class="dropdown-item text-danger"
                                href="#"
                                v-if="!isItMe(user)"
                                @click="
                                    showCreateBlockModel = !showCreateBlockModel
                                "
                            >
                                <i class="fas fa-exclamation-triangle"></i>
                                Block this user</a
                            >
                        </div>
                    </div>

                    <div></div>
                </div>
            </div>

            <div class="pt-1">
                <ul class="nav nav-tabs nav-justified">
                    <li
                        class="nav-item"
                        v-for="(tab, index) in getTabs"
                        v-bind:key="index"
                    >
                        <a
                            class="nav-link"
                            href="#"
                            :class="{ active: tab.active }"
                            @click="clickTabItem(tab)"
                            >{{ tab.title }}</a
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
        self.$store.dispatch("setPageTitle", self.user.first_name);
    },

    computed: {
        isFollowingByMe() {
            return this.$store.getters.followingByMe != null;
        },
        getTabs() {
            return this.tabs;
        },
        tabBody() {
            return this.activeTab.tabBody;
        },
        totalFollowers() {
            var total = 0;
            if (this.$store.getters.followersResponse.meta) {
                total = this.$store.getters.followersResponse.meta.total;
            }

            return "Followers (" + total + ")";
        },
        totalFollowings() {
            var total = 0;
            if (this.$store.getters.userFollowingsResponse.meta) {
                total = this.$store.getters.userFollowingsResponse.meta.total;
            }

            return "Following (" + total + ")";
        }
    },
    methods: {
        initTabItems() {
            this.tabs.push({
                title: "TimeLine",
                tabBody: UserTimeline,
                active: true
            });

            this.tabs.push({
                title: "About",
                tabBody: UserAbout,
                active: false
            });

            this.activeTab = this.tabs[0];
        },

        isActive: function(item) {
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

            this.$store
                .dispatch("fetchUserFollowers", { user_id: self.user.id })
                .then(() => {
                    console.log(
                        "fetchUserFollowers",
                        this.$store.getters.followersResponse.meta.total
                    );
                })
                .catch(() => {})
                .finally(() => {});
        },
        fetchUserFollowingAction() {
            const self = this;

            this.$store
                .dispatch("fetchUserFollowings", { user_id: self.user.id })
                .then(() => {})
                .catch(() => {})
                .finally(() => {});
        },
        followUserByMeAction() {
            const self = this;

            this.$store
                .dispatch("followUserByMe", { user_id: self.user.id })
                .then(() => {})
                .catch(() => {})
                .finally(() => {});
        },
        unFollowUserByMeAction() {

            const self = this;

            this.$store
                .dispatch("unFollowUserByMe", { user_id: self.user.id })
                .then(() => {})
                .catch(() => {})
                .finally(() => {});
        },
        fetchUserFollowingByMeAction() {
            const self = this;

            this.$store
                .dispatch("fetchUserFollowingByMe", { user_id: self.user.id })
                .then(() => {})
                .catch(() => {})
                .finally(() => {});
        },
        didFinishBlockingUser() {
            this.$store.dispatch("removePostsOfUser", this.user);
            this.$router.push({ name: "home" });
        }
    },
    data: function() {
        return {
            tabs: [],
            activeTab: {},
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
