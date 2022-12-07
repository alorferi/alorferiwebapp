import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import Home from "./views/home/Home.vue";
import SearchShow from "./views/home/SearchShow.vue";
import About from "./views/about/About.vue";
import Login from "./views/auth/Login.vue";
import Register from "./views/auth/Register.vue";
// import NewsFeeds from "./views/home/NewsFeeds.vue";
import MyLibraryListView from "./views/library/MyLibraryListView.vue";
import AllLibraryListView from "./views/library/AllLibraryListView.vue";
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
import LoginWithOtcToResetPassword from "./views/auth/LoginWithOtcToResetPassword";
import ResetPasswordWithToken from "./views/auth/ResetPasswordWithToken";

Vue.use(Router);

let router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            leftMenu: HomeLeftMenu,
            meta: { title: "Home" }
        },

        {
            path: "/libraries",
            name: "libraries",
            component: AllLibraryListView,
            leftMenu: HomeLeftMenu,
            meta: { title: "My Libraries", requiresAuth: true}
        },
        {
            path: "/auth/login",
            name: "login",
            component: Login,
            meta: { title: "Login" }
        },
        {
            path: "/auth/register",
            name: "register",
            component: Register,
            meta: { title: "Register" }
        },
        {
            path: "/auth/login-with-otc-to-reset-password",
            name: "login-with-otc-to-reset-password",
            component: LoginWithOtcToResetPassword,
            meta: { title: "Reset password" }
        },
        {
            path: "/auth/reset-password-with-token",
            name: "reset-password-with-token",
            component: ResetPasswordWithToken,
            meta: { title: "Reset password" }
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
            meta: { title: "Profile", requiresAuth: true }
        },
        {
            path: "/users/:user_id",
            name: "users.show",
            component: ShowUser,
            leftMenu: HomeLeftMenu,
            meta: { title: "User Profile", requiresAuth: true }
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
            component: MyLibraryListView,
            leftMenu: HomeLeftMenu,
            meta: { title: "My Libraries", requiresAuth: true}
        },
        // {
        //     path: "/libraries/autocomplete",
        //     name: "autocomplete",
        //     component: AutoCompleteTest,
        //     leftMenu: HomeLeftMenu,
        //     meta: { title: "AutoCompleteTest" }
        // },
        {
            path: "/libraries/create",
            name: "library-create",
            component: LibraryCreate,
            leftMenu: HomeLeftMenu,
            meta: { title: "Create Library", requiresAuth: true}
        },
        {
            path: "/libraries/:id",
            name: "library-show",
            component: LibraryShow,
            leftMenu: HomeLeftMenu,
            // leftBadge: LibraryBadge,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/libraries/:id/edit",
            name: "library-edit",
            component: LibraryEdit,
            leftMenu: HomeLeftMenu,
            // leftBadge: LibraryBadge,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/libraries/:id/about",
            name: "library-about",
            component: LibraryAbout,
            leftMenu: LibraryLeftMenu,
            leftBadge: LibraryBadge,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/:username",
            name: "unique-name",
            component: SearchShow,
            leftMenu: HomeLeftMenu,
            // leftBadge: LibraryBadge,
            meta: {
                title: "",
                requiresAuth: true
            }
        },
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next();
            return;
        }
        // next("/auth/login");

        const loginpath = window.location.pathname;
        next({ name: 'login', query: { from: loginpath } });

    } else {
        next();
    }
});

export default router;
