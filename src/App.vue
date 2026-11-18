<template>
    <div id="app" :class="{ 'app-secure': isLoggedIn, 'social-typing': typing }">
        <nav v-if="isLoggedIn" class="app-navbar social-topbar" :aria-label="$t('social.account')">
            <HomeNav :menu-open="menuOpen" @menu="menuOpen = !menuOpen" />
        </nav>
        <nav v-else class="flex min-h-[56px] items-center px-4 py-2 fixed inset-x-0 top-0 z-50 app-navbar">
            <div class="app-container"><GuestNav /></div>
        </nav>
        <a v-if="isLoggedIn" class="social-skip" href="#social-main">{{ $t("social.skip") }} ↓</a>
        <div class="app-content" :class="isLoggedIn ? 'social-app-content' : 'app-container mt-[70px]'">
            <div v-if="isLoggedIn" class="social-layout">
                <AppSidebar v-model="menuOpen" />
                <main id="social-main" class="social-main" tabindex="-1">
                    <PageHeading
                        v-if="heading"
                        :title="$t('social.' + heading[0])"
                        :description="$t('social.' + heading[1])"
                    >
                        <router-link
                            v-if="['libraries', 'my-libraries'].includes($route.name)"
                            class="ui-button ui-button-primary"
                            :to="{ name: 'library-create' }"
                            ><i class="fas fa-plus" aria-hidden="true"></i>{{ $t("social.createLibrary") }}</router-link
                        >
                    </PageHeading>
                    <router-view :key="$route.path" />
                    <BottomBar v-if="$route.name !== 'home'" compact />
                </main>
            </div>
            <div v-else><router-view /></div>
            <BottomBar v-if="!isLoggedIn" />
        </div>
        <nav v-if="isLoggedIn" class="social-bottom-nav" :aria-label="$t('social.navigation')">
            <router-link
                v-for="link in bottomLinks"
                :key="link.name"
                :to="{ name: link.name }"
                :class="{ 'is-current': bottomActive(link.name) }"
                :aria-current="bottomActive(link.name) ? 'page' : undefined"
                ><i :class="link.icon" aria-hidden="true"></i><span>{{ $t("social." + link.label) }}</span></router-link
            >
            <button type="button" :aria-expanded="menuOpen ? 'true' : 'false'" @click="menuOpen = true">
                <i class="fas fa-bars" aria-hidden="true"></i><span>{{ $t("social.more") }}</span>
            </button>
        </nav>
        <portal-target name="dialogs" multiple class="ui-modal-target" />
    </div>
</template>
<script>
import GuestNav from "@/views/navbars/GuestNav";
import HomeNav from "@/views/navbars/HomeNav";
import BottomBar from "@/views/navbars/BottomBar";
import AppSidebar from "@/components/social/AppSidebar";
import PageHeading from "@/components/social/PageHeading";
export default {
    name: "App",
    components: { GuestNav, HomeNav, BottomBar, AppSidebar, PageHeading },
    data() {
        return { menuOpen: false, typing: false };
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        },
        heading() {
            return {
                libraries: ["libraries", "librariesDescription"],
                users: ["readers", "readersDescription"],
                "my-libraries": ["myLibraries", "myLibrariesDescription"],
                "courses.index": ["courses", "coursesDescription"],
                "my-courses": ["myCourses", "myCoursesDescription"],
                "users.edit-me": ["editProfile", "profileDescription"],
                "library-create": ["createLibrary", "createDescription"],
                "library-edit": ["editLibrary", "editDescription"],
                "courses.apply": ["applyCourse", "applyDescription"],
            }[this.$route.name];
        },
        bottomLinks() {
            return [
                { name: "home", label: "feed", icon: "fas fa-home" },
                { name: "libraries", label: "libraries", icon: "fas fa-book-open" },
                { name: "users", label: "readers", icon: "fas fa-user-friends" },
            ];
        },
    },
    created() {
        this.$i18n.locale = this.$store.getters.activeLanguage;
        this.$store.dispatch("setPageTitle", this.$route.meta.title || "Alor Feri");
    },
    mounted() {
        document.addEventListener("focusin", this.trackFocus);
        document.addEventListener("focusout", this.trackFocus);
        window.addEventListener("resize", this.screenChanged);
    },
    beforeDestroy() {
        document.removeEventListener("focusin", this.trackFocus);
        document.removeEventListener("focusout", this.trackFocus);
        window.removeEventListener("resize", this.screenChanged);
    },
    watch: {
        $route(to, from) {
            this.menuOpen = false;
            this.typing = false;
            this.$store.dispatch("setPageTitle", to.meta.title || "Alor Feri");
            if (to.path !== from.path) this.$nextTick(() => window.scrollTo(0, 0));
        },
        isLoggedIn(value) {
            if (!value) {
                this.menuOpen = false;
                this.typing = false;
            }
        },
    },
    methods: {
        bottomActive(name) {
            if (name === "libraries") return this.$route.path.startsWith("/librar");
            if (name === "users") return this.$route.path.startsWith("/users");
            return this.$route.name === name;
        },
        trackFocus() {
            if (!this.isLoggedIn) return;
            this.$nextTick(() => {
                this.typing = !!(
                    document.activeElement &&
                    document.activeElement.matches("input,textarea,select,[contenteditable=true]")
                );
            });
        },
        screenChanged() {
            if (window.innerWidth >= 1024) this.menuOpen = false;
        },
    },
};
</script>
