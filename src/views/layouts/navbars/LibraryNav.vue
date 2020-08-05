<template>
    <div class="container">
        <router-link :to="{ name: 'home' }" class="navbar-brand">
            <img
                src="./assets/alorferi_logo_brand.png"
                height="24px"
                alt="Alor Feri logo"
        /></router-link>

        <div class="navbar-header">
            <button
                type="button"
                class="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar"
            >
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>

        <div class="collapse navbar-collapse" id="navbar">
            <ul class="nav navbar-nav navbar-left">
                <li>
                    <router-link :to="{ name: 'about' }">Library</router-link>
                </li>

                <li v-if="isLoggedIn">
                    <a @click="logout">Logout</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "LibraryNav",
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
