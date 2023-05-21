<template>
    <div class="container-fluid">
        <router-link :to="{ name: 'home' }" class="navbar-brand">
            <img
                src="@/assets/images/defaults/alorferi_logo_brand.png"
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
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <!-- <router-link class="nav-link" :to="{ name: 'about' }"
                        >About</router-link
          >-->
                </li>
            </ul>

            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <LanguageToggleButton/>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'login' }"
                        >{{ $t('login') }}</router-link
                    >
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'register' }"
                        > {{ $t('sign_up') }}</router-link
                    >
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import LanguageToggleButton from "@/components/LanguageToggleButton";
export default {
    name: "GuestNav",
    components: {LanguageToggleButton},
    data() {
        return {};
    },
    computed: {},
    async mounted() {},
    methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
