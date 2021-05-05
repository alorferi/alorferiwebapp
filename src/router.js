import Vue from "vue";
import Router from "vue-router";
import store from "./stores/index.js";
import Home from "./views/home/Home.vue";
import About from "./views/about/About.vue";
import Login from "./views/auth/Login.vue";
import Secure from "./views/auth/Secure.vue";
import Register from "./views/auth/Register.vue";
// import NewsFeeds from "./views/home/NewsFeeds.vue";
import ShowMyLibraries from "./views/library/ShowMyLibraries.vue";
import AutoCompleteTest from "./views/library/AutocompleteTest.vue";
import LibraryCreate from "./views/library/LibraryCreate.vue";
import LibraryEdit from "./views/library/LibraryEdit.vue";
import LibraryShow from "./views/library/LibraryShow.vue";
import LibraryAbout from "./views/library/LibraryAbout.vue";
import ShowMe from "./views/user/ShowMe";
import ShowUser from "./views/user/ShowUser";
import HomeLeftMenu from "./views/menus/HomeLeftMenu";
import LibraryLeftMenu from "./views/menus/LibraryLeftMenu";
import LibraryBadge from "./views/badges/LibraryBadge";
// import UserBadge from "./views/badges/UserBadge";

Vue.use(Router);

let router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            leftMenu: HomeLeftMenu,
            meta:{title: "Home"}

        },
        {
            path: "/auth/login",
            name: "login",
            component: Login,
            meta:{title: "Login"}
        },
        {
            path: "/auth/register",
            name: "register",
            component: Register,
            meta:{title: "Register"}
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

        // {
        //     path: "/newsfeeds",
        //     name: "newsfeeds",
        //     component: NewsFeeds,
        //     leftMenu: HomeLeftMenu,
        //     meta:{title: "News Feed"}

        // },
        {
            path: "/users/me",
            name: "users.me",
            component: ShowMe,
            leftMenu: HomeLeftMenu,
            meta:{title: "Profile"}
        },
        {
            path: "/users/:user_id",
            name: "user.show",
            component: ShowUser,
            leftMenu: HomeLeftMenu,
            meta:{title: "User Profile"}
        },
        // {
        //     path: "/users/profile/edit",
        //     name: "user-profile-edit",
        //     component: UserProfile,
        //     leftBadge: UserBadge
        // },
        {
            path: "/libraries/my-libraries",
            name: "my-libraries",
            component: ShowMyLibraries,
            leftMenu: HomeLeftMenu,
            meta:{title: "My Libraries"}

        },
        {
            path: "/libraries/autocomplete",
            name: "autocomplete",
            component: AutoCompleteTest,
            leftMenu: HomeLeftMenu,
            meta:{title: "AutoCompleteTest"}

        },
        {
            path: "/libraries/create",
            name: "library-create",
            component: LibraryCreate,
            leftMenu: HomeLeftMenu,

        },
        {
            path: "/libraries/:id",
            name: "library-show",
            component: LibraryShow,
            leftMenu: HomeLeftMenu,
            // leftBadge: LibraryBadge
        },
        {
            path: "/libraries/:id/edit",
            name: "library-edit",
            component: LibraryEdit,
            leftMenu: HomeLeftMenu,
            // leftBadge: LibraryBadge
        },
        {
            path: "/libraries/:id/about",
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
