<template>
    <div id="app" class="h-100">
        <vue-headful
            title="আলোর ফেরী"
            description="Description from vue-headful"
        />

        <nav
            class="navbar navbar-expand-sm navbar-dark"
            style="background:#F5BA14"
        >
            <MyNav v-if="isLoggedIn"></MyNav>
            <GuestNav v-else></GuestNav>
        </nav>

        <div class="container h-100 mt-3 ">
            <div class="row h-100">
                <div class="col-sm-2">
                    <div class="card">
                        <div class="card-body p-2 text-center">
                            <i
                                class="far fa-user-circle"
                                style="width:100px;height:100px"
                            ></i>

                            <a href="/user/profile" class="stretched-link"> </a>
                        </div>
                        <!-- <img
                            src="@/assets/logo.png"
                            class="rounded m-2"
                            alt="Alor Feri Logo"
                        /> -->

                        <div class="card-footer text-center">
                            <span>Babul Mirdha</span>
                        </div>
                    </div>

                    <div class="list-group mt-2">
                        <router-link
                            class="list-group-item list-group-item-action"
                            to="/feeds"
                            >Feeds</router-link
                        >
                        <router-link
                            class="list-group-item list-group-item-action"
                            to="/library/my-libraries"
                            >My Libraries</router-link
                        >
                        <router-link
                            to="/library/create"
                            class="list-group-item list-group-item-action"
                            >Create Library kjkj kjk mnj jjj kkk kkk
                        </router-link>

                        <a
                            href="#"
                            class="list-group-item list-group-item-action"
                            >Messages</a
                        >
                        <a
                            href="#"
                            class="list-group-item list-group-item-action"
                            >Create</a
                        >
                    </div>
                </div>

                <div class="col-sm-10 h-100" style="overflow-y: scroll;">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GuestNav from "./views/layouts/navbars/GuestNav";
import MyNav from "./views/layouts/navbars/MyNav.vue";
import VueHeadful from "vue-headful";

export default {
    name: "App",
    components: {
        GuestNav,
        MyNav,
        VueHeadful
    },
    computed: {
        isLoggedIn: function() {
            return this.$store.getters.isLoggedIn;
        }
    },
    methods: {
        logout: function() {
            this.$store.dispatch("logout").then(() => {
                this.$router.push("/login");
            });
        }
    }
};
</script>

<style></style>
