<template>
    <div class="container-fluid">
        <router-link :to="{ name: 'home' }" class="navbar-brand">
            <img
                src="@/assets/alorferi_logo_brand.png"
                height="24px"
                alt="Alor Feri logo"
            />
        </router-link>

        <form class="form-inline" action="/action_page.php">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <i class="fas fa-mobile-alt"></i>
                    </span>

                    <select class="form-control">
                        <option value="Library" selected>Library</option>
                        <option value="+91">Book</option>
                        <option value="+1">Blood</option>
                        <option value="+1">Jobs</option>
                    </select>
                </div>

                <input
                    class="form-control"
                    type="text"
                    placeholder="Search"
                />

                    <div class="input-group-prepend">
                    <span class="input-group-text">
                        <a href="#"> <i class="fas fa-search"></i></a>
                        <!-- <button type="submit"> <i class="fas fa-search"></i> </button> -->
                    </span>
                </div>
            </div>
            <!-- <button class="btn btn-success" type="submit">Search</button> -->
        </form>

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
            <ul class="nav navbar-nav mr-auto">
                <li>
                    <router-link class="nav-link" :to="{ name: 'home' }">
                        <i class="fas fa-home"></i
                    ></router-link>
                </li>

                <li>
                    <router-link class="nav-link" :to="{ name: 'user.me' }">
                        <i class="far fa-user-circle"></i
                    ></router-link>
                </li>
            </ul>

            <ul class="navbar-nav ml-auto">
                <!-- Dropdown -->
                <li class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle bg-primary "
                        href="#"
                        id="navbardrop"
                        data-toggle="dropdown"
                    >
                        <i class="far fa-user-circle" style=""></i>
                        {{ user.first_name }} {{ user.surname }}
                    </a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="/user/profile"
                            >Profile</a
                        >
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
import { mapGetters } from "vuex";
export default {
    name: "HomeNav",
    components: {
        // Logout,
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters({
            user: "user"
        })
    },
    mounted() {},
    methods: {
        logoutMe: function() {
            this.$store.dispatch("logout").then(() => {
                this.$router.push({ name: "home" }).catch(() => {});
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
