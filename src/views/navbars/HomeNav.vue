<template>
    <div class="container-fluid">
        <!-- <router-link :to="{ name: 'home' }" class="navbar-brand"    @click="reload">
            <img
                src="@/assets/images/defaults/alorferi_logo_brand.png"
                height="24px"
                alt="Alor Feri logo"
            />
        </router-link> -->

        <a href="/" class="navbar-brand" @click="reload">
            <img
                src="@/assets/images/defaults/alorferi_logo_brand.png"
                height="24px"
                alt="Alor Feri logo"
            />
        </a>


        <!-- Toggler/collapsibe Button -->
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="nav navbar-nav">

                <li class="pl-2 pr-1">
                    <a href="/" class="nav-link" @click="reload">
                    <i class="fas fa-home"></i> <span class="pl-1"> {{ $t('home') }} </span>
                    </a>
                </li>
                <li class="pl-1 pr-1">
                    <a href="/libraries" class="nav-link" @click="reload">
                        {{ $t('libraries') }}
                    </a>
                </li>

                <li class="pl-1 pr-1">
                    <a href="/users" class="nav-link" @click="reload">
                       {{ $t('users') }}
                    </a>
                </li>


            </ul>
            <!-- <NavBarSearch class="ml-4"/> -->
            <ul class="nav navbar-nav ml-auto">

                <li class="nav-item">
                    <LanguageToggleButton/>
                </li>

                <!-- Dropdown -->
                <li class="nav-item dropdown">
                    <a
                        id="navbarDropdown"
                        class="nav-link dropdown-toggle "
                        href="#"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <UserPhoto :user="activeUser" size="12" />

                        {{ activeUser.first_name }}
                    </a>
                    <div
                        class="dropdown-menu dropdown-menu-right"
                        aria-labelledby="navbarDropdown"
                    >
                        <router-link
                            class="dropdown-item"
                            :to="{ name: 'users.me' }"
                        >
                        {{ $t('profile') }}
                        </router-link>

                        <div class="dropdown-divider"></div>
                        <a
                            class="dropdown-item"
                            href="#"
                            @click="logoutMe"
                            v-if="this.$store.getters.isLoggedIn"
                            > {{ $t('logout') }}</a
                        >
                    </div>
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
// import NavBarSearch from '@/views/navbars/NavBarSearch.vue';
export default {
    name: "HomeNav",
    components: {
        UserPhoto,
        // NavBarSearch
        LanguageToggleButton
    },
    data() {
        return {};
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
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
