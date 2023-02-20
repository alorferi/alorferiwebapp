<template>
    <div>


        <LibraryCoverPhotoWithUpload :user="this.$store.getters.activeUser" :library="library" />

        <div
            class="d-flex flex-column pt-2 pl-2 pr-2 bg-light card"
        >
            <div class="d-flex">
                <div class="p-2">
                    <LibraryLogo :library="library" size="96" />
                </div>

                <div class="flex-grow-1 p-2">
                    <h3 class="text-success">{{ library.name }}</h3>

                    <h5>
                        <span
                            v-if="
                                library.address.house != null &&
                                    library.address.house.length != 0
                            "
                        >
                            {{ library.address.house }},
                        </span>

                        <span
                            v-if="
                                library.address.village != null &&
                                    library.address.village.length != 0
                            "
                        >
                            {{ library.address.village }},
                        </span>

                        <span v-if="library.address.police_station != null">
                            {{ library.address.police_station.name }},
                        </span>

                        <span v-if="library.address.district != null">
                            {{ library.address.district.name }}
                        </span>

                        <span v-if="library.address.post_code != null">
                            - {{ library.address.post_code }}
                        </span>
                    </h5>

                    <!-- <UserFollowerModal
                        :show="showUserFollowers"
                        @updateVisibleState="showUserFollowers = $event"
                        :user="user"
                    /> -->

                    <div class="btn-group">
                        <button class="btn btn-sm btn-link   mt-1 mb-1  mr-1">
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
                                @click="followUserByMeAction()"
                                >Follow</a
                            >

                            <a
                                class="dropdown-item"
                                href="#"
                                @click="unFollowUserByMeAction()"
                                >Unfollow</a
                            >

                            <a
                                class="dropdown-item"
                                href="#"
                                v-if="
                                    myLibraryMembership == null &&
                                        computeMyLibraryMemberRequest == null
                                "
                                @click="showMemberRequestModal = true"
                            >
                                Request to be member
                            </a>


                            <a
                                class="dropdown-item"
                                href="#"
                                v-if="computeMyLibraryMemberRequest != null"
                            >
                            Member request sent
                            </a>

                        </div>
                    </div>

                </div>

                <div class="p-2">
                    <img
                        :src="getQRCodeUrl(library)"
                        alt="QR Code"
                        width="64"
                        height="64"
                    />
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
import LibraryLogo from "@/views/library/LibraryLogo";
import LibraryTimeline from "@/views/library/LibraryTimeline";
import LibraryBookIssuedHistory from "@/views/library/LibraryBookIssuedHistory";
import LibraryAbout from "@/views/library/LibraryAbout";
import ShowLibraryBooks from "@/views/librarybook/ShowLibraryBooks";
import ShowLibraryMembers from "@/views/librarymember/ShowLibraryMembers";
import CreateLibraryMemberRequestModal from "@/views/librarymember/CreateLibraryMemberRequestModal";
import LibraryCoverPhotoWithUpload from "@/views/library/LibraryCoverPhotoWithUpload";
// import UserFollowerModal from "@/views/follower/UserFollowerModal.vue";

export default {
    name: "LibraryPager",
    components: {
        LibraryLogo,
        LibraryTimeline,
        LibraryAbout,
        ShowLibraryMembers,
        ShowLibraryBooks,
        LibraryBookIssuedHistory,
        CreateLibraryMemberRequestModal,
        // UserFollowerModal,
        LibraryCoverPhotoWithUpload
    },
    mounted: function() {
        this.initTabItems();
        this.$store.dispatch("setPageTitle", this.library.name);
    },
    computed: {
        totalFollowers() {
            var total = 0;

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
            showUserFollowers: false
        };
    },
    methods: {
        unFollowUserByMeAction() {},
        followUserByMeAction() {},
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
