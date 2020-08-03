<template>
    <div id="app">
        <vue-headful
            title="আলোর ফেরী"
            description="Description from vue-headful"
        />

        <nav
            class="navbar navbar-expand-sm navbar-dark navbar-fixed-top"
            style="background:#F5BA14"
        >
            <MyNav v-if="isLoggedIn"></MyNav>
            <GuestNav v-else></GuestNav>
        </nav>

        <div class="container" style="margin-top:100px;">
            <router-view />
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
