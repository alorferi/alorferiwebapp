<template>
    <div>
        <div
            class="d-flex flex-column pt-2 pl-2 pr-2"
            style="background: #ecedf8"
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
    </div>
</template>

<script>
import LibraryLogo from "./LibraryLogo";
export default {
    name: "LibraryHeader",
    components: {
        LibraryLogo
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
    },
    methods: {
        initTabItems() {
            var library = this.$store.getters.library;

            this.tabs.push({ title: "Home", active: true });
            this.tabs.push({
                title: "Books (" + library.total_books + ")",
                active: false
            });
            this.tabs.push({
                title: "Members(" + library.total_members + ")",
                active: false
            });
            this.tabs.push({  title: "About", active: false });


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
            activeTab: null
        };
    }
};
</script>

<style scoped></style>
