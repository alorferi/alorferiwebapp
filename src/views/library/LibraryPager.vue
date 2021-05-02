<template>
    <div>
        <div
            class="d-flex flex-column pt-2 pl-2 pr-2"
            style="background: #f2f3fb"
        >
            <div class="d-flex">
                <div class="p-2">
                    <LibraryLogo :library="library" size="96" />
                </div>

                <div class="flex-grow-1 p-2">
                    <h3 class="text-success">{{ library.name }}</h3>
                    <h5>
                        {{ library.address }}
                    </h5>
                </div>

                <div class="p-2">
                    <img src="#" alt="Library QR Code" width="96" height="96" />
                </div>
            </div>

            <div class="pt-1">
                <ul class="nav nav-tabs nav-justified">
                    <li
                        class="nav-item"
                        v-for="(tab,index) in getTabs"
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

           <component :is="body"></component>

    </div>
</template>

<script>
import LibraryLogo from "./LibraryLogo";
import LibraryTimeline from "./LibraryTimeline"
import LibraryAbout from "./LibraryAbout"
import ShowLibraryBookList from "../librarybook/ShowLibraryBookList"
import LibraryMembers from "../librarymember/LibraryMembers"
export default {
    name: "LibraryPager",
    components: {
        LibraryLogo,LibraryTimeline,LibraryAbout,LibraryMembers,ShowLibraryBookList
    },
    mounted: function() {
        this.initTabItems();
    },
    computed: {
        library() {
            return this.$store.getters.library;
        },

        getTabs() {
            return this.tabs;
        },
        body() {
            return this.activeTab.body;
        },
    },
    methods: {
        initTabItems() {
            var library = this.$store.getters.library;

            this.tabs.push({ title: "Home", body: LibraryTimeline , active: true});
            this.tabs.push({
                title: "Books (" + library.total_books + ")",
                 body: ShowLibraryBookList ,
                active: false
            });
            this.tabs.push({
                title: "Members(" + library.total_members + ")",
                                 body: LibraryMembers ,
                active: false
            });
            this.tabs.push({  title: "About", body: LibraryAbout , active: false });


           this.activeTab = this.tabs[0];


        },

        isActive: function(item) {
            return {
                active: item.active
            };
        },
        clickTabItem(tab){


            if(tab!=this.activeTab){
                tab.active = true;
                this.activeTab.active = false;
                this.activeTab = tab;
            }

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
