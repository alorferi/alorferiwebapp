import Vue from "vue";
import Router from "vue-router";
import store from "./store.js";
import Home from "./views/home/Home.vue";
import About from "./views/about/About.vue";
import Login from "./views/auth/Login.vue";
import Secure from "./views/auth/Secure.vue";
import Register from "./views/auth/Register.vue";
import Feeds from "./views/home/Feeds.vue";
import MyLibraryList from "./views/library/MyLibraryList.vue";
import LibraryCreate from "./views/library/LibraryCreate.vue";
import LibraryEdit from "./views/library/LibraryEdit.vue";
import LibraryShow from "./views/library/LibraryShow.vue";
import UserProfile from "./views/user/UserProfile";

Vue.use(Router);

let router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            layout: "main"
        },
        {
            path: "user/login",
            name: "login",
            component: Login
        },
        {
            path: "user/register",
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
            component: Feeds
        },
        {
            path: "/user/profile",
            name: "user-profile",
            component: UserProfile
        },
        {
            path: "/user/profile/edit",
            name: "user-profile-edit",
            component: UserProfile
        },
        {
            path: "/library/my-libraries",
            name: "my-libraries",
            component: MyLibraryList
        },
        {
            path: "/library/create",
            name: "library-create",
            component: LibraryCreate
        },
        {
            path: "/library/:id",
            name: "library-show",
            component: LibraryShow
        },
        {
            path: "/library/:id/edit",
            name: "library-edit",
            component: LibraryEdit
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
