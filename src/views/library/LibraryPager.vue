<template>
    <div>
        <div
            class="d-flex flex-column pt-2 pl-2 pr-2 bg-light card"
            :style="{
                // 'background-image':
                //     'url(' +
                //     'https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80' +
                //     ')'
            }"
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

                    <button type="button" class="btn btn-danger" v-if=" myLibraryMembership == null ">Request to be member</button>

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

        <component :is="tabBody" :library="library"></component>
    </div>
</template>

<script>
import LibraryLogo from "./LibraryLogo";
import LibraryTimeline from "./LibraryTimeline";
import LibraryBookIssuedHistory from "./LibraryBookIssuedHistory";
import LibraryAbout from "./LibraryAbout";
import ShowLibraryBooks from "../librarybook/ShowLibraryBooks";
import ShowLibraryMembers from "../librarymember/ShowLibraryMembers";
export default {
    name: "LibraryPager",
    components: {
        LibraryLogo,
        LibraryTimeline,
        LibraryAbout,
        ShowLibraryMembers,
        ShowLibraryBooks,
        LibraryBookIssuedHistory
    },
    mounted: function() {
        this.initTabItems();
        this.$store.dispatch("setPageTitle", this.library.name);
    },
    computed: {
        library() {
            return this.$store.getters.library;
        },
        myLibraryMembership() {
            return  this.getMyLibraryMembership(this.library.id);
        },
        myLibraryMemberRequest() {
            return  this.getMyLibraryMemberRequest(this.library.id);
        },

        getTabs() {
            return this.tabs;
        },
        tabBody() {
            return this.activeTab.tabBody;
        }
    },
    methods: {
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
    },
    data: function() {
        return {
            tabs: [],
            activeTab: {}
        };
    }
};
</script>

<style scoped></style>
