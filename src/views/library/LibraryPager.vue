<template>
    <div>
        <LibraryCoverPhotoWithUpload :user="this.$store.getters.activeUser" :library="library" />
        <div class="flex flex-col pt-2 pl-2 pr-2 ui-card">
            <div class="flex">
                <div class="p-2">
                    <LibraryLogoWithUpload :library="library" size="96" />
                </div>

                <div class="min-w-0 grow p-2">
                    <h3 class="text-success">{{ library.name }}</h3>

                    <h5>
                        <span v-if="library.address.house != null && library.address.house.length != 0">
                            {{ library.address.house }},
                        </span>

                        <span v-if="library.address.village != null && library.address.village.length != 0">
                            {{ library.address.village }},
                        </span>

                        <span v-if="library.address.police_station != null">
                            {{ library.address.police_station.name }},
                        </span>

                        <span v-if="library.address.district != null">
                            {{ library.address.district.name }}
                        </span>

                        <span v-if="library.address.post_code != null"> - {{ library.address.post_code }} </span>
                    </h5>

                    <LibraryFollowersModal
                        :show="showLibraryFollowers"
                        @updateVisibleState="showLibraryFollowers = $event"
                        :library="library"
                    />

                    <div class="inline-flex items-center">
                        <button
                            class="ui-button ui-button-small ui-button-link mt-1 mb-1 mr-1"
                            @click="showLibraryFollowers = !showLibraryFollowers"
                        >
                            {{ totalFollowers }}
                        </button>

                        <UiDropdown
                            trigger-class="ui-button ui-button-small ui-button-link mt-1 mb-1 border-t border-l border-r border-b"
                            label="Actions"
                            ><template #trigger>
                                <span class="sr-only">Toggle Dropdown</span>
                            </template>
                            <a class="ui-menu-item" href="#" v-if="!isFollowingByMe" @click="followLibraryByMeAction()"
                                >Follow</a
                            >

                            <a class="ui-menu-item" href="#" v-if="isFollowingByMe" @click="unFollowLibraryByMeAction()"
                                >Unfollow</a
                            >

                            <a
                                class="ui-menu-item"
                                href="#"
                                v-if="myLibraryMembership == null && computeMyLibraryMemberRequest == null"
                                @click="showMemberRequestModal = true"
                            >
                                Request to be member
                            </a>

                            <a class="ui-menu-item" href="#" v-if="computeMyLibraryMemberRequest != null">
                                Member request sent
                            </a>
                        </UiDropdown>
                    </div>
                </div>

                <div class="p-2">
                    <img class="h-[64px]" :src="getQRCodeUrl(library)" alt="QR Code" width="64" height="64" />
                </div>
            </div>

            <div class="pt-1">
                <ul class="flex flex-wrap ui-tabs [&>li]:flex-1 [&>li]:text-center">
                    <li class="" v-for="(tab, index) in getTabs" v-bind:key="index">
                        <a
                            class="ui-nav-link"
                            href="#"
                            :class="{ 'ui-selected': tab.active }"
                            @click="clickTabItem(tab)"
                            >{{ tab.title }}</a
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
        LibraryCoverPhotoWithUpload
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
            return this.$store.getters.followingByMe != null;
        },
        totalFollowers() {
            var total = 0;
            if (this.$store.getters.followersResponse.meta) {
                total = this.$store.getters.followersResponse.meta.total;
            }

            return "Followers (" + total + ")";
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
        }
    },
    data: function() {
        return {
            tabs: [],
            activeTab: {},
            showMemberRequestModal: false,
            myLibraryMemberRequest: null,
            showLibraryFollowers:false,
        };
    },
    methods: {
        fetchLibraryFollowersAction() {
            const self = this;

            this.$store
                .dispatch("fetchLibraryFollowers", { library_id: self.library.id })
                .then(() => {
                })
                .catch(() => {})
                .finally(() => {});
        },
        fetchLibraryFollowingByMeAction() {
            const self = this;

            this.$store
                .dispatch("fetchLibraryFollowingByMe", {
                    library_id: self.library.id
                })
                .then(() => {})
                .catch(() => {})
                .finally(() => {});
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
                    library_id: self.library.id
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
                active: true
            });
            // this.tabs.push({
            //     title: "Issued Books",
            //     tabBody: LibraryBookIssuedHistory,
            //     active: false
            // });
            this.tabs.push({
                title: "Books (" + library.total_books + ")",
                tabBody: ShowLibraryBooks,
                active: false
            });
            this.tabs.push({
                title: "Members(" + library.total_members + ")",
                tabBody: ShowLibraryMembers,
                active: false
            });
            this.tabs.push({
                title: "About",
                tabBody: LibraryAbout,
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
        getQRCodeUrl(library) {
            return this.getApiUrl(
                "/qr-codes/library_qr_codes/lib_qr_" + library.id + ".svg"
            );
        }
    }
};
</script>

<style scoped></style>
