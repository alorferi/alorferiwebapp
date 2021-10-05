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

        <!-- <NavBarSearch/> -->

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
            <ul class="nav navbar-nav mr-auto"></ul>

            <ul class="nav navbar-nav">
                <li>
                    <!-- <router-link class="nav-link" :to="{ name: 'home' }">
                      <i class="fas fa-home"></i>
                    </router-link> -->

                    <a href="/" class="nav-link" @click="reload">
                        <i class="fas fa-home"></i>
                    </a>
                </li>

                <li>
                    <Language></Language>
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
                            Profile
                        </router-link>

                        <a class="dropdown-item" href="#">Link 2</a>
                        <div class="dropdown-divider"></div>
                        <a
                            class="dropdown-item"
                            href="#"
                            @click="logoutMe"
                            v-if="this.$store.getters.isLoggedIn"
                            >Logout</a
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
import Language from "@/components/Language";
// import NavBarSearch from '@/views/navbars/NavBarSearch.vue';
export default {
    name: "HomeNav",
    components: {
        UserPhoto,
        Language // Logout,
        // NavBarSearch
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
