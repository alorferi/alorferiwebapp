<template>
    <div>

        <UserCoverPhotoWithUpload :user="user"/>

        <div class="d-flex">
            <div class="p-2 text-center">
                <UserPhotoWithUpload :user="user" size="120" />
            </div>

            <div class="flex-grow-1 p-2">
                <h3 class="text-success m-2">
                    {{ user.first_name }} {{ user.surname }}
                    {{ user.nickname }}
                </h3>

                <UserFollowerModal
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
                        class="dropdown-toggle dropdown-toggle-split btn btn-sm btn-link mt-1 mb-1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <span class="sr-only">Toggle Dropdown</span>
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#" v-if="!isItMe(user)"
                            >Follow</a
                        >

                        <router-link
                            class="dropdown-item"
                            v-if="isItMe(user)"
                            :to="{ name: 'users.edit-me' }"
                        >
                            Edit My Profile
                        </router-link>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#" v-if="!isItMe(user)"
                            >Report this user</a
                        >

                        <a class="dropdown-item" href="#" v-if="!isItMe(user)"
                            >Block this user</a
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

        <component :is="tabBody" :user="user"></component>
    </div>
</template>

<script>
import UserPhotoWithUpload from "@/views/user/UserPhotoWithUpload";
import UserTimeline from "@/views/user/UserTimeline";
import UserAbout from "@/views/user/UserAbout";


import UserFollowerModal from "@/views/follower/UserFollowerModal.vue";
import UserFollowingModal from "@/views/follower/UserFollowingModal.vue";
import UserCoverPhotoWithUpload from "@/views/user/UserCoverPhotoWithUpload.vue";
export default {
    name: "UserPager",
    props: ["user"],
    components: {
        UserPhotoWithUpload,
        UserTimeline,
        UserAbout,
        UserFollowerModal,
        UserFollowingModal,
        UserCoverPhotoWithUpload
    },
    async mounted() {
        this.fetchUserFollowerAction();
        this.fetchUserFollowingAction();
        this.initTabItems();
        this.$store.dispatch("setPageTitle", this.user.first_name);
    },

    computed: {
        userCoverUrl(){
           return this.getApiUrl('/users/' + this.user.id +'/cover_photo' )
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
            if (this.$store.getters.followingsResponse.meta) {
                total = this.$store.getters.followingsResponse.meta.total;
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
        fetchUserFollowerAction() {
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
                .then(() => {
                    console.log(
                        "fetchUserFollowings",
                        this.$store.getters.followingsResponse.meta.total
                    );
                })
                .catch(() => {})
                .finally(() => {});
        }
    },
    data: function() {
        return {
            tabs: [],
            activeTab: {},
            showUploadMyCoverModal:false,
            showUserFollowers: false,
            showUserFollowings: false
        };
    }
};
</script>

<style scoped></style>
