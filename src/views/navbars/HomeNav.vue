<template>
    <div class="flex w-full flex-wrap items-center">
        <!-- <router-link :to="{ name: 'home' }" class="navbar-brand"    @click="reload">
        <img class="h-[24px]"
            src="@/assets/images/defaults/alorferi_logo_brand.png"
            height="24px"
            alt="Alor Feri logo"
        />
    </router-link> -->

        <a href="/" class="mr-4 inline-flex items-center whitespace-nowrap text-xl" @click="reload">
            <img class="h-[24px]" src="@/assets/images/defaults/alorferi_logo_brand.png" height="24px" alt="Alor Feri logo" />
        </a>

        <!-- Toggler/collapsibe Button -->
        <button
            class="ui-mobile-toggle"
            type="button"
            @click="navOpen = !navOpen"
            :aria-expanded="navOpen ? 'true' : 'false'"
            aria-controls="collapsibleNavbar"
            aria-label="Toggle navigation"
        >
            <span aria-hidden="true">☰</span>
        </button>

        <div
            class="w-full grow flex-col lg:w-auto lg:flex-row lg:items-center"
            :class="navOpen ? 'flex' : 'hidden lg:flex'"
            id="collapsibleNavbar"
        >
            <ul class="m-0 flex list-none flex-col p-0 lg:flex-row lg:items-center">
                <li class="pl-2 pr-1">
                    <a href="/" class="ui-nav-link" @click="reload">
                        <i class="fas fa-home"></i> <span class="pl-1"> {{ $t("home") }} </span>
                    </a>
                </li>
                <li class="pl-1 pr-1">
                    <a href="/courses" class="ui-nav-link" @click="reload"> Training </a>
                </li>
                <li class="pl-1 pr-1">
                    <a href="/libraries" class="ui-nav-link" @click="reload">
                        {{ $t("libraries") }}
                    </a>
                </li>

                <li class="pl-1 pr-1">
                    <a href="/users" class="ui-nav-link" @click="reload">
                        {{ $t("users") }}
                    </a>
                </li>
            </ul>
            <ul class="m-0 flex list-none flex-col p-0 lg:flex-row lg:items-center ml-auto">
                <li class="">
                    <LanguageToggleButton />
                </li>

                <li class="" style="margin-left: 5px; margin-right: 5px">
                    <a href="" class="ui-nav-link"> <i class="fas fa-shopping-cart"></i> My Cart</a>
                </li>

                <!-- Dropdown -->
                <li class="relative">
                    <UiDropdown trigger-id="navbarDropdown" trigger-class="ui-nav-link inline-flex items-center gap-2" label="Account menu"
                        ><template #trigger>
                            <UserPhoto :user="activeUser" size="12" />

                            {{ activeUser.first_name }}
                        </template>
                        <router-link class="ui-menu-item" :to="{ name: 'users.me' }">
                            {{ $t("profile") }}
                        </router-link>

                        <div class="ui-menu-separator"></div>

                        <router-link class="ui-menu-item" :to="{ name: 'my-courses' }">
                            {{ $t("my-courses") }}
                        </router-link>

                        <div class="ui-menu-separator"></div>

                        <a class="ui-menu-item" href="#" @click="logoutMe" v-if="this.$store.getters.isLoggedIn">
                            {{ $t("logout") }}</a
                        >
                    </UiDropdown>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
// import Logout from './Logout'
// import { mapGetters } from "vuex";
import UserPhoto from "@/views/user/UserPhoto";
import LanguageToggleButton from "@/components/LanguageToggleButton";
export default {
    name: "HomeNav",
    components: {
        UserPhoto,
        LanguageToggleButton
    },
    data() {
        return { navOpen: false };
    },
    computed: {
        activeUser() {
            return this.$store.getters.activeUser;
        }
    },
    async mounted() {},
    methods: {
        logoutMe: function() {
            this.$store.dispatch("logout").then(() => {
                this.$router.push({ name: "home" }).catch(() => {});
            });
        },
        reload: function() {
            this.$router.go(this.$router.currentRoute);
        }
    },
    watch: { $route() { this.navOpen = false; } },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
