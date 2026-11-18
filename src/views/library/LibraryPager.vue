<template>
    <div>
        <LibraryCoverPhotoWithUpload :user="this.$store.getters.activeUser" :library="library" />
        <div class="ui-card social-identity-card">
            <div class="social-identity">
                <div class="shrink-0">
                    <LibraryLogoWithUpload :library="library" size="96" />
                </div>

                <div class="social-identity-info min-w-0 grow">
                    <h3 class="text-success">{{ library.name }}</h3>

                    <h5>
                        <span
                            v-if="library.address && library.address.house != null && library.address.house.length != 0"
                        >
                            {{ library.address.house }},
                        </span>

                        <span
                            v-if="
                                library.address &&
                                library.address.village != null &&
                                library.address.village.length != 0
                            "
                        >
                            {{ library.address.village }},
                        </span>

                        <span v-if="library.address && library.address.police_station != null">
                            {{ library.address.police_station.name }},
                        </span>

                        <span v-if="library.address && library.address.district != null">
                            {{ library.address.district.name }}
                        </span>

                        <span v-if="library.address && library.address.post_code != null">
                            - {{ library.address.post_code }}
                        </span>
                    </h5>

                    <LibraryFollowersModal
                        :show="showLibraryFollowers"
                        @updateVisibleState="showLibraryFollowers = $event"
                        :library="library"
                    />

                    <div class="social-identity-actions">
                        <button
                            class="ui-button ui-button-primary"
                            type="button"
                            :disabled="followBusy || !followReady"
                            @click="toggleFollow"
                        >
                            {{ $t(isFollowingByMe ? "social.unfollow" : "social.follow") }}
                        </button>
                        <button
                            v-if="myLibraryMembership == null && computeMyLibraryMemberRequest == null"
                            class="ui-button ui-button-light"
                            type="button"
                            @click="showMemberRequestModal = true"
                        >
                            {{ $t("social.memberRequest") }}
                        </button>
                        <div v-if="followError" class="text-danger text-sm w-full">
                            <span role="alert">{{ $t("social.followError") }}</span
                            ><button
                                type="button"
                                class="social-read-more ml-2"
                                @click="fetchLibraryFollowingByMeAction"
                            >
                                {{ $t("social.retry") }}
                            </button>
                        </div>
                        <button
                            class="ui-button ui-button-small ui-button-link mt-1 mb-1 mr-1"
                            @click="showLibraryFollowers = !showLibraryFollowers"
                        >
                            {{ totalFollowers }}
                        </button>

                        <router-link
                            v-if="hasMemberPermission('library_edit')"
                            class="ui-button ui-button-light"
                            :to="{ name: 'library-edit', params: { id: library.id } }"
                            >{{ $t("social.editLibrary") }}</router-link
                        >
                        <span
                            v-if="computeMyLibraryMemberRequest != null"
                            class="text-sm text-secondary"
                            role="status"
                            >{{ $t("social.memberRequested") }}</span
                        >
                    </div>
                </div>

                <div class="social-library-qr">
                    <img class="h-[64px]" :src="getQRCodeUrl(library)" alt="QR Code" width="64" height="64" />
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

        <CreateLibraryMemberRequestModal
            :showMemberRequestModal="showMemberRequestModal"
            @onUpdateVisibleState="showMemberRequestModal = $event"
            :library="library"
            @onClickOk="myLibraryMemberRequest = $event"
        />
        <component :is="tabBody" :library="library"></component>
    </div>
</template>

<script>
import LibraryLogoWithUpload from "@/views/library/LibraryLogoWithUpload";
import LibraryTimeline from "@/views/library/LibraryTimeline";
import LibraryBookIssuedHistory from "@/views/library/LibraryBookIssuedHistory";
import LibraryAbout from "@/views/library/LibraryAbout";
import ShowLibraryBooks from "@/views/librarybook/ShowLibraryBooks";
import ShowLibraryMembers from "@/views/librarymember/ShowLibraryMembers";
import CreateLibraryMemberRequestModal from "@/views/librarymember/CreateLibraryMemberRequestModal";
import LibraryCoverPhotoWithUpload from "@/views/library/LibraryCoverPhotoWithUpload";
import LibraryFollowersModal from "@/views/follower/LibraryFollowersModal.vue";

export default {
    name: "LibraryPager",
    components: {
        LibraryLogoWithUpload,
        LibraryTimeline,
        LibraryAbout,
        ShowLibraryMembers,
        ShowLibraryBooks,
        LibraryBookIssuedHistory,
        CreateLibraryMemberRequestModal,
        LibraryFollowersModal,
        LibraryCoverPhotoWithUpload,
    },
    async mounted() {
        this.fetchLibraryFollowersAction();
        // this.fetchLibraryFollowingAction();
        this.fetchLibraryFollowingByMeAction();

        this.initTabItems();
        this.$store.dispatch("setPageTitle", this.library.name);
    },
    computed: {
        isFollowingByMe() {
            return (
                this.$store.getters.followingSource === "library:" + this.library.id &&
                this.$store.getters.followingByMe != null
            );
        },
        totalFollowers() {
            var total = 0;
            if (this.$store.getters.followersResponse.meta) {
                total = this.$store.getters.followersResponse.meta.total;
            }

            return this.$t("social.followers") + " (" + total + ")";
        },
        library() {
            return this.$store.getters.library;
        },
        myLibraryMembership() {
            return this.getMyLibraryMembership(this.library.id);
        },
        computeMyLibraryMemberRequest() {
            if (this.myLibraryMemberRequest) {
                return this.myLibraryMemberRequest;
            } else {
                return this.getMyLibraryMemberRequest(this.library.id);
            }
        },
        getTabs() {
            return this.tabs;
        },
        tabBody() {
            return this.activeTab.tabBody;
        },
    },
    data: function () {
        return {
            tabs: [],
            activeTab: {},
            followBusy: false,
            followReady: false,
            followError: false,
            showMemberRequestModal: false,
            myLibraryMemberRequest: null,
            showLibraryFollowers: false,
        };
    },
    methods: {
        tabLabel(tab) {
            const key =
                { TimeLine: "timeline", Timeline: "timeline", About: "about" }[tab.title] ||
                (tab.title.startsWith("Books") ? "books" : tab.title.startsWith("Members") ? "members" : null);
            const count = tab.title.match(/\(.*\)/);
            return key ? this.$t("social." + key) + (count ? " " + count[0] : "") : tab.title;
        },
        async toggleFollow() {
            if (this.followBusy || !this.followReady) return;
            this.followBusy = true;
            this.followError = false;
            try {
                await this.$store.dispatch(this.isFollowingByMe ? "unFollowLibraryByMe" : "followLibraryByMe", {
                    library_id: this.library.id,
                });
            } catch (error) {
                this.followError = true;
            } finally {
                this.followBusy = false;
            }
        },
        fetchLibraryFollowersAction() {
            const self = this;

            this.$store
                .dispatch("fetchLibraryFollowers", { library_id: self.library.id })
                .then(() => {})
                .catch(() => {})
                .finally(() => {});
        },
        fetchLibraryFollowingByMeAction() {
            const self = this;
            self.followReady = false;

            this.$store
                .dispatch("fetchLibraryFollowingByMe", {
                    library_id: self.library.id,
                })
                .then(() => {
                    self.followReady = true;
                    self.followError = false;
                })
                .catch((error) => {
                    if (error.response && error.response.status === 404) self.followReady = true;
                    else self.followError = true;
                });
        },
        followLibraryByMeAction() {
            const self = this;

            this.$store
                .dispatch("followLibraryByMe", { library_id: self.library.id })
                .then(() => {})
                .catch(() => {})
                .finally(() => {});
        },
        unFollowLibraryByMeAction() {
            const self = this;

            this.$store
                .dispatch("unFollowLibraryByMe", {
                    library_id: self.library.id,
                })
                .then(() => {})
                .catch(() => {})
                .finally(() => {});
        },
        initTabItems() {
            var library = this.$store.getters.library;

            this.tabs.push({
                title: "Timeline",
                tabBody: LibraryTimeline,
                active: true,
            });
            // this.tabs.push({
            //     title: "Issued Books",
            //     tabBody: LibraryBookIssuedHistory,
            //     active: false
            // });
            this.tabs.push({
                title: "Books (" + library.total_books + ")",
                tabBody: ShowLibraryBooks,
                active: false,
            });
            this.tabs.push({
                title: "Members(" + library.total_members + ")",
                tabBody: ShowLibraryMembers,
                active: false,
            });
            this.tabs.push({
                title: "About",
                tabBody: LibraryAbout,
                active: false,
            });

            this.activeTab = this.tabs[0];
        },

        isActive: function (item) {
            return {
                active: item.active,
            };
        },
        clickTabItem(tab) {
            if (tab != this.activeTab) {
                tab.active = true;
                this.activeTab.active = false;
                this.activeTab = tab;
            }
        },
        getQRCodeUrl(library) {
            return this.getApiUrl("/qr-codes/library_qr_codes/lib_qr_" + library.id + ".svg");
        },
    },
};
</script>

<style scoped></style>
