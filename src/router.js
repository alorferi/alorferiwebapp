import Vue from "vue";
import Router from "vue-router";
import store from "./store.js";
import Home from "./views/home/Home.vue";
import About from "./views/about/About.vue";
import Login from "./views/auth/Login.vue";
import Secure from "./views/auth/Secure.vue";
import Register from "./views/auth/Register.vue";
import Feeds from "./views/home/Feeds.vue";
import MyLibraries from "./views/library/MyLibraries.vue";
import LibraryCreate from "./views/library/LibraryCreate.vue";
import LibraryEdit from "./views/library/LibraryEdit.vue";
import LibraryShow from "./views/library/LibraryShow.vue";
import UserProfile from "./views/user/UserProfile";
import HomeLeftMenu from "./views/menus/HomeLeftMenu";
import LibraryLeftMenu from "./views/menus/LibraryLeftMenu";
import LibraryBadge from "./views/badges/LibraryBadge";
import UserBadge from "./views/badges/UserBadge";

Vue.use(Router);

let router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            leftMenu: HomeLeftMenu,
            leftBadge: UserBadge
        },
        {
            path: "/user/login",
            name: "login",
            component: Login
        },
        {
            path: "/user/register",
            name: "register",
            component: Register
        },
        {
            path: "/secure",
            name: "secure",
            component: Secure,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/about",
            name: "about",
            component: About
        },

        {
            path: "/feeds",
            name: "feeds",
            component: Feeds,
            leftMenu: HomeLeftMenu,
            leftBadge: UserBadge
        },
        {
            path: "/user/profile",
            name: "user-profile",
            component: UserProfile,
            leftBadge: UserBadge
        },
        {
            path: "/user/profile/edit",
            name: "user-profile-edit",
            component: UserProfile,
            leftBadge: UserBadge
        },
        {
            path: "/library/my-libraries",
            name: "my-libraries",
            component: MyLibraries,
            leftMenu: HomeLeftMenu,
            leftBadge: UserBadge
        },
        {
            path: "/library/create",
            name: "library-create",
            component: LibraryCreate,
            leftMenu: HomeLeftMenu,
            leftBadge: UserBadge
        },
        {
            path: "/library/:id",
            name: "library-show",
            component: LibraryShow,
            leftMenu: LibraryLeftMenu,
            leftBadge: LibraryBadge
        },
        {
            path: "/library/:id/edit",
            name: "library-edit",
            component: LibraryEdit,
            leftMenu: LibraryLeftMenu,
            leftBadge: LibraryBadge
        },
        {
            path: "/library/:id/books",
            name: "library-books",
            component: LibraryEdit,
            leftMenu: LibraryLeftMenu,
            leftBadge: LibraryBadge
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next();
            return;
        }
        next("/login");
    } else {
        next();
    }
});

export default router;
