<template>
    <div id="app" class="h-100">
        <vue-headful
            title="আলোর ফেরী"
            description="Description from vue-headful"
        />

        <nav class="navbar navbar-expand-sm bg-warning navbar-dark">
            <MyNav v-if="isLoggedIn"></MyNav>
            <GuestNav v-else></GuestNav>
        </nav>

        <div class="container h-100 mt-3 ">
            <div class="row h-100">
                <div class="col-sm-2">
                    <UserBadge></UserBadge>

                    <div class="list-group mt-2">
                        <router-link
                            class="list-group-item list-group-item-action"
                            to="{ name: 'feeds'}"
                            >Feeds</router-link
                        >
                        <router-link
                            class="list-group-item list-group-item-action"
                            to="{ name: 'my-libraries'}"
                            >My Libraries</router-link
                        >
                        <router-link
                            to="{ name: 'library-create'}"
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
                            >{{ currentRouteName }}</a
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
import UserBadge from "./views/badges/UserBadge";

export default {
    name: "App",
    components: {
        GuestNav,
        MyNav,
        VueHeadful,
        UserBadge
    },
    computed: {
        isLoggedIn: function() {
            return this.$store.getters.isLoggedIn;
        },
        currentRouteName() {
            return this.$route.name;
        }
    },
    methods: {
        logout: function() {
            this.$store.dispatch("logout").then(() => {
                this.$router.push("/login");
            });
        }
    },
    goBack() {
        window.history.length > 1
            ? this.$router.go(-1)
            : this.$router.push("/");
    }
};
</script>

<style></style>
