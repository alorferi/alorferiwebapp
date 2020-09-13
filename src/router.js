import Vue from "vue";
import Router from "vue-router";
import store from "./store.js";
import Home from "./views/home/Home.vue";
import About from "./views/about/About.vue";
import Login from "./views/auth/Login.vue";
import Secure from "./views/auth/Secure.vue";
import Register from "./views/auth/Register.vue";
import NewsFeeds from "./views/home/NewsFeeds.vue";
import MyLibraries from "./views/library/MyLibraries.vue";
import LibraryCreate from "./views/library/LibraryCreate.vue";
import LibraryEdit from "./views/library/LibraryEdit.vue";
import LibraryShow from "./views/library/LibraryShow.vue";
import LibraryBooks from "./views/library/LibraryBooks.vue";
import LibraryMembers from "./views/library/LibraryMembers.vue";
import LibraryAbout from "./views/library/LibraryAbout.vue";
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

        },
        {
            path: "/auth/login",
            name: "login",
            component: Login
        },
        {
            path: "/auth/register",
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
            path: "/newsfeeds",
            name: "newsfeeds",
            component: NewsFeeds,
            leftMenu: HomeLeftMenu,

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

        },
        {
            path: "/library/create",
            name: "library-create",
            component: LibraryCreate,
            leftMenu: HomeLeftMenu,

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
            component: LibraryBooks,
            leftMenu: LibraryLeftMenu,
            leftBadge: LibraryBadge
        },
        {
            path: "/library/:id/members",
            name: "library-members",
            component: LibraryMembers,
            leftMenu: LibraryLeftMenu,
            leftBadge: LibraryBadge
        },
        {
            path: "/library/:id/book-add",
            name: "library-book-add",
            component: LibraryMembers,
            leftMenu: LibraryLeftMenu,
            leftBadge: LibraryBadge
        },
        {
            path: "/library/:id/member-add",
            name: "library-member-add",
            component: LibraryMembers,
            leftMenu: LibraryLeftMenu,
            leftBadge: LibraryBadge
        },
        {
            path: "/library/:id/about",
            name: "library-about",
            component: LibraryAbout,
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
