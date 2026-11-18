<template>
    <div class="social-topbar-inner">
        <button
            type="button"
            class="social-menu-toggle ui-button ui-button-light"
            :aria-label="$t('social.navigation')"
            :aria-expanded="menuOpen ? 'true' : 'false'"
            @click="$emit('menu')"
        >
            <i class="fas fa-bars" aria-hidden="true"></i>
        </button>
        <router-link class="social-brand" :to="{ name: 'home' }"
            ><img src="@/assets/images/defaults/alorferi_logo_brand.png" alt="" width="40" height="40" /><span
                >Alor Feri<small>{{ $t("social.community") }}</small></span
            ></router-link
        >
        <div class="social-topbar-actions">
            <LanguageToggleButton />
            <span
                class="social-cart"
                role="status"
                :aria-label="$t('social.cart') + ': ' + $store.getters.myCart.length"
                ><i class="fas fa-shopping-bag" aria-hidden="true"></i
                ><span>{{ $store.getters.myCart.length }}</span></span
            >
            <UiDropdown
                trigger-id="navbarDropdown"
                trigger-class="social-account-trigger"
                :label="$t('social.account')"
            >
                <template #trigger
                    ><UserPhoto :user="activeUser" size="32" /><span class="social-account-name">{{
                        activeUser.first_name
                    }}</span></template
                >
                <router-link class="ui-menu-item social-account-item" :to="{ name: 'users.me' }">
                    <i class="far fa-user" aria-hidden="true"></i><span>{{ $t("social.profile") }}</span>
                </router-link>
                <router-link class="ui-menu-item social-account-item" :to="{ name: 'my-libraries' }">
                    <i class="fas fa-book-open" aria-hidden="true"></i><span>{{ $t("social.myLibraries") }}</span>
                </router-link>
                <router-link class="ui-menu-item social-account-item" :to="{ name: 'my-courses' }">
                    <i class="fas fa-graduation-cap" aria-hidden="true"></i><span>{{ $t("social.myCourses") }}</span>
                </router-link>
                <div class="ui-menu-separator"></div>
                <button type="button" class="ui-menu-item social-account-item" @click="logoutMe">
                    <i class="fas fa-sign-out-alt" aria-hidden="true"></i><span>{{ $t("logout") }}</span>
                </button>
            </UiDropdown>
        </div>
    </div>
</template>
<script>
import UserPhoto from "@/views/user/UserPhoto";
import LanguageToggleButton from "@/components/LanguageToggleButton";
export default {
    name: "HomeNav",
    components: { UserPhoto, LanguageToggleButton },
    props: { menuOpen: Boolean },
    computed: {
        activeUser() {
            return this.$store.getters.activeUser;
        },
    },
    methods: {
        async logoutMe() {
            await this.$store.dispatch("logout");
            this.$router.push({ name: "home" }).catch(() => {});
        },
    },
};
</script>
