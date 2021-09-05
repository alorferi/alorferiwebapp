<template>
    <div>
        <div
            class="d-flex flex-column pt-2 pl-2 pr-2"
           :style="{'background-image': 'url(' + 'https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80' + ')'}"
        >
            <div class="d-flex">
                <div class="p-2">
                    <UserPhoto :user="user" size="96" />
                </div>

                <div class="flex-grow-1 p-2">
                    <h3 class="text-success">{{ user.first_name }} {{ user.surname }} {{ user.nickname }}</h3>
                    <h5>
                        {{ user.address }}
                    </h5>
                </div>

                <div class="p-2">
                    <img src="#" alt="QR Code" width="96" height="96" />
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

           <component :is="tabBody" :user="user" ></component>

    </div>
</template>

<script>
import UserPhoto from "@/views/user/UserPhoto";
import UserTimeline from "@/views/user/UserTimeline"
import UserAbout from "@/views/user/UserAbout"
export default {
    name: "UserPager",
      props:["user"] ,
    components: {
        UserPhoto,UserTimeline,UserAbout
    },
    mounted: function() {
        this.initTabItems();
        this.$store.dispatch("setPageTitle",this.user.first_name);
    },

    computed: {


        getTabs() {
            return this.tabs;
        },
        tabBody() {
            return this.activeTab.tabBody;
        },
    },
    methods: {
        initTabItems() {

            this.tabs.push({ title: "TimeLine", tabBody: UserTimeline , active: true});

            this.tabs.push({  title: "About", tabBody: UserAbout , active: false });


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
