<template>
    <div id="app" :class="{ 'app-secure': isLoggedIn }">
        <nav
            class="flex min-h-[56px] items-center px-4 py-2 fixed inset-x-0 top-0 z-50 app-navbar"
            v-if="isLoggedIn"
        >
            <div class="app-container">
                <HomeNav />
            </div>
        </nav>

        <nav class="flex min-h-[56px] items-center px-4 py-2 fixed inset-x-0 top-0 z-50 app-navbar" v-else>
            <div class="app-container">
                <GuestNav />
            </div>
        </nav>

        <div class="app-content app-container mt-[70px]">
            <div v-if="isLoggedIn">
                <div v-if="leftBadge || leftMenu">
                    <div class="-mx-[15px] flex flex-wrap">
                        <div class="relative w-full px-[15px] sm:w-1/6">
                            <component :is="leftBadge"></component>
                            <component :is="leftMenu"></component>
                        </div>
                        <!-- style="overflow-y: scroll;" -->
                        <div class="relative w-full px-[15px] sm:w-2/3">
                            <router-view></router-view>
                        </div>
                        <div class="relative w-full px-[15px] sm:w-1/6"></div>
                    </div>
                </div>

                <div v-else>
                    <router-view></router-view>
                </div>
            </div>

            <div v-else class="">
                <router-view></router-view>
            </div>

            <BottomBar />
        </div>
        <portal-target name="dialogs" multiple class="ui-modal-target" />
    </div>
</template>

<script>
    import GuestNav from "@/views/navbars/GuestNav";
    import HomeNav from "@/views/navbars/HomeNav.vue";
    // import HomeLeftMenu from "./views/menus/HomeLeftMenu";
    // import LibraryLeftMenu from "./views/menus/LibraryLeftMenu";
    import BottomBar from "@/views/navbars/BottomBar";

    export default {
        name: "App",
        components: {
            GuestNav,
            HomeNav,
            BottomBar
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
            this.$i18n.locale = this.$store.getters.activeLanguage;
            this.$store.dispatch("setPageTitle", this.$route.meta.title);
        },
        watch: {
            $route(to) {
                this.$store.dispatch("setPageTitle", to.meta.title);
            }
        },
        goBack() {
            window.history.length > 1 ?
                this.$router.go(-1) :
                this.$router.push({
                    name: "home"
                });
        }
    };
</script>

<style></style>
