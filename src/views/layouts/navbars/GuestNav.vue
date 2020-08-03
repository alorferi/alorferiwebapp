<template>
    <div class="container">
        <router-link to="/" class="navbar-brand">
            <img
                src="../../../assets/alorferi_logo_brand.png"
                style="width:40px;"
                alt="Alor Feri logo"
            />
        </router-link>

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
            <ul class="navbar-nav  mr-auto">
                <li class="nav-item">
                    <router-link class="nav-link" to="/about"
                        >About</router-link
                    >
                </li>
            </ul>

            <ul class="navbar-nav  ml-auto">
                <li class="nav-item">
                    <router-link class="nav-link" to="/about"
                        >About</router-link
                    >
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "GuestNav",
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
