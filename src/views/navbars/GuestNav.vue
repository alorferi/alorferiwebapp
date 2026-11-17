<template>
    <div class="flex w-full flex-wrap items-center">
        <router-link :to="{ name: 'home' }" class="mr-4 inline-flex items-center whitespace-nowrap text-xl">
            <img src="@/assets/images/defaults/alorferi_logo_brand.png" style="width: 40px" alt="Alor Feri logo" />
        </router-link>

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
            <ul class="m-0 flex list-none flex-col p-0 lg:flex-row lg:items-center mr-auto">
                <li class="" style="margin-left: 5px; margin-right: 5px">
                    <router-link class="ui-nav-link mx-2" :to="{ name: 'home' }">
                        <i class="fas fa-home"></i>
                        {{ $t("home") }}</router-link
                    >
                </li>

                <li class="" style="margin-left: 5px; margin-right: 5px">
                    <router-link class="ui-nav-link mx-2" :to="{ name: 'courses.index' }"> Training</router-link>
                </li>

                <!-- <li class="nav-item" style="margin-left: 5px;margin-right: 5px;">
                <router-link class="nav-link" :to="{ name: 'achievements' }">{{ $t('training') }}</router-link>
            </li> -->

                <li class="" style="margin-left: 5px; margin-right: 5px">
                    <a class="ui-nav-link" :href="companyLinks.about" target="_blank" rel="noopener noreferrer">{{
                        $t("about")
                    }}</a>
                </li>

                <li class="" style="margin-left: 5px; margin-right: 5px">
                    <a class="ui-nav-link" :href="companyLinks.contact" target="_blank" rel="noopener noreferrer"
                        >Contact</a
                    >
                </li>

                <li class="" style="margin-left: 5px; margin-right: 5px">
                    <a class="ui-nav-link" :href="companyLinks.careers" target="_blank" rel="noopener noreferrer">
                        Careers</a
                    >
                </li>
            </ul>

            <ul class="m-0 flex list-none flex-col p-0 lg:flex-row lg:items-center ml-auto">
                <li class="" style="margin-left: 5px; margin-right: 5px">
                    <router-link class="ui-nav-link" :to="{ name: 'login' }">{{ $t("login") }}</router-link>
                </li>
                <li class="" style="margin-left: 5px; margin-right: 5px">
                    <router-link class="ui-nav-link" :to="{ name: 'register' }"> {{ $t("sign_up") }}</router-link>
                </li>
                <li class="">
                    <LanguageToggleButton />
                </li>

                <li class="" style="margin-left: 5px; margin-right: 5px">
                    <a href="#" class="ui-nav-link">
                        <i class="fas fa-shopping-cart"></i>
                        <span
                            class="inline-block px-2 py-1 text-xs font-bold leading-none rounded-full bg-danger text-white cart_item_count"
                            style="font-size: 10px"
                        >
                            {{ myCart.length }}
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import LanguageToggleButton from "@/components/LanguageToggleButton";
import { companyLinks } from "@/config/company";
export default {
    name: "GuestNav",
    components: {
        LanguageToggleButton,
    },
    data() {
        return { companyLinks, navOpen: false };
    },
    computed: {
        myCart() {
            return this.$store.getters.myCart;
        },
    },
    async mounted() {},
    methods: {},
    watch: { $route() { this.navOpen = false; } },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
