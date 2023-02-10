<template>
    <div id="app" class="">
        <nav
            class="navbar navbar-expand-sm navbar-light fixed-top shadow-sm  bg-white"
            v-if="isLoggedIn"
        >
            <div class="container">
                <HomeNav v-if="isLoggedIn"></HomeNav>
                <!-- <GuestNav v-else></GuestNav> -->
            </div>
        </nav>

        <div class="container" style="margin-top:70px;">
            <div v-if="isLoggedIn">
                <div class="row">
                    <div class="col-sm-2">
                        <component :is="leftBadge"></component>
                        <component :is="leftMenu"></component>
                    </div>
                    <!-- style="overflow-y: scroll;" -->
                    <div class="col-sm-8">
                        <router-view></router-view>
                    </div>
                    <div class="col-sm-2"></div>
                </div>
            </div>

            <div v-else class="">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
// import GuestNav from "@/views/navbars/GuestNav";
import HomeNav from "@/views/navbars/HomeNav.vue";
// import UserBadge from "./views/badges/UserBadge";
// import HomeLeftMenu from "./views/menus/HomeLeftMenu";
// import LibraryLeftMenu from "./views/menus/LibraryLeftMenu";

export default {
    name: "App",
    components: {
        // GuestNav,
        HomeNav
    },
    computed: {
        isLoggedIn: function() {
            return this.$store.getters.isLoggedIn;
        },
        leftBadge() {
            var name = this.$route.name;
            var routes = this.$router.options.routes.filter(function(route) {
                return route.name == name;
            });
            if (routes.length == 1) {
                return routes[0].leftBadge;
            }

            return null;
        },
        leftMenu() {
            var name = this.$route.name;
            var routes = this.$router.options.routes.filter(function(route) {
                return route.name == name;
            });
            if (routes.length == 1) {
                return routes[0].leftMenu;
            }

            return null;
        }
    },
    methods: {},
    created() {
        this.$store.dispatch("setPageTitle", this.$route.meta.title);
    },
    watch: {
        $route(to) {
            this.$store.dispatch("setPageTitle", to.meta.title);
        }
    },
    goBack() {
        window.history.length > 1
            ? this.$router.go(-1)
            : this.$router.push({ name: "home" });
    }
};
</script>

<style></style>
