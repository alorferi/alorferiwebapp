import {createRouter,createWebHistory} from "vue-router";
import stores from "@/store";
import Home from "@/views/home/Home.vue";
const SearchShow = () => import("@/views/home/SearchShow.vue");
import { companyLinks } from "@/config/company";
const Research = () => import("@/views/about/Research.vue");
const Awards = () => import("@/views/about/Awards.vue");
const Advertisers = () => import("@/views/about/Advertisers.vue");
const ApiOverview = () => import("@/views/developer/ApiOverview.vue");
const Pricing = () => import("@/views/about/Pricing.vue");
const Help = () => import("@/views/about/Help.vue");
const PrivacyPolicy = () => import("@/views/about/PrivacyPolicy.vue");
// import Login from "@/views/auth/Login.vue";
const LoginContainer = () => import("@/views/auth/LoginContainer.vue");
const Register = () => import("@/views/auth/Register.vue");
// import NewsFeeds from "@/views/home/NewsFeeds.vue";
const MyLibraryListView = () => import("@/views/library/MyLibraryListView.vue");
const SearchLibraryListView = () => import("@/views/library/SearchLibraryListView.vue");
const SearchUserListView = () => import("@/views/user/SearchUserListView.vue");
const LibraryCreate = () => import("@/views/library/LibraryCreate.vue");
const LibraryEdit = () => import("@/views/library/LibraryEdit.vue");
const LibraryShow = () => import("@/views/library/LibraryShow.vue");
const LibraryAbout = () => import("@/views/library/LibraryAbout.vue");
const ShowMe = () => import("@/views/user/ShowMe.vue");
const ShowUser = () => import("@/views/user/ShowUser.vue");
const EditMyProfile = () => import("@/views/user/EditMyProfile.vue");
import HomeLeftMenu from "@/views/menus/HomeLeftMenu";
import LibraryLeftMenu from "@/views/menus/LibraryLeftMenu";
import LibraryBadge from "@/views/badges/LibraryBadge";
const LoginWithOtcToResetPassword = () => import("@/views/auth/LoginWithOtcToResetPassword.vue");
const ResetPassword = () => import("@/views/auth/ResetPassword.vue");
const AwardsAndAchievements = () => import("@/views/welcome/AwardsAndAchievements.vue");
const ShowCourses = () => import("@/views/courses/ShowCourses.vue");
const ShowCourse = () => import("@/views/courses/ShowCourse.vue");
const ApplyCourse = () => import("@/views/courses/ApplyCourse.vue");
const MyCourses = () => import("@/views/courses/MyCourses.vue");
// import i18n from "./i18n";


function redirectToCompany(url) {
  return () => {
    window.location.replace(url);
  };
}
let router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: "/",
    name: "home",
    component: Home,
    leftMenu: HomeLeftMenu,
    meta: {
      title: "Home"
    }
  }, {
    path: "/libraries",
    name: "libraries",
    component: SearchLibraryListView,
    leftMenu: HomeLeftMenu,
    meta: {
      title: "My Libraries",
      requiresAuth: true
    }
  }, {
    path: "/users",
    name: "users",
    component: SearchUserListView,
    leftMenu: HomeLeftMenu,
    meta: {
      title: "Users",
      requiresAuth: true
    }
  }, {
    path: "/login",
    name: "login",
    component: LoginContainer,
    meta: {
      title: "Login"
    }
  }, {
    path: "/achievements",
    name: "achievements",
    component: AwardsAndAchievements,
    meta: {
      title: "Achievements"
    }
  }, {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      title: "Register"
    }
  }, {
    path: "/login-with-otc-to-reset-password",
    name: "login-with-otc-to-reset-password",
    component: LoginWithOtcToResetPassword,
    meta: {
      title: "Reset password"
    }
  }, {
    path: "/reset-password",
    name: "reset-password",
    component: ResetPassword,
    meta: {
      title: "Reset password"
    }
  }, {
    path: "/about",
    name: "about",
    component: { render: () => null },
    beforeEnter: redirectToCompany(companyLinks.about),
    meta: {
      title: "About"
    }
  }, {
    path: "/help",
    name: "help",
    component: Help,
    meta: {
      title: "Help"
    }
  }, {
    path: "/awards",
    name: "awards",
    component: Awards,
    meta: {
      title: "Awards"
    }
  }, {
    path: "/products",
    name: "products",
    component: { render: () => null },
    beforeEnter: redirectToCompany(companyLinks.products),
    meta: {
      title: "Products"
    }
  }, {
    path: "/research",
    name: "research",
    component: Research,
    meta: {
      title: "Research"
    }
  }, {
    path: "/courses/:slug",
    name: "courses.show",
    component: ShowCourse,
    meta: {
      title: "Show Course",
      requiresAuth: true
    }
  }, {
    path: "/courses/:id/apply",
    name: "courses.apply",
    component: ApplyCourse,
    meta: {
      title: "Apply Course",
      requiresAuth: true
    }
  }, {
    path: "/courses",
    name: "courses.index",
    component: ShowCourses,
    meta: {
      title: "Courses"
    }
  }, {
    path: "/my-courses",
    name: "my-courses",
    component: MyCourses,
    meta: {
      title: "MyCourses",
      requiresAuth: true
    }
  }, {
    path: "/advertisers",
    name: "advertisers",
    component: Advertisers,
    meta: {
      title: "Advertisers"
    }
  }, {
    path: "/careers",
    name: "careers",
    component: { render: () => null },
    beforeEnter: redirectToCompany(companyLinks.careers),
    meta: {
      title: "Careers"
    }
  }, {
    path: "/pricing",
    name: "pricing",
    component: Pricing,
    meta: {
      title: "Pricing"
    }
  }, {
    path: "/privacy-policy",
    name: "privacy-policy",
    component: PrivacyPolicy,
    meta: {
      title: "Privacy Policy"
    }
  }, {
    path: "/contact-us",
    name: "contact-us",
    component: { render: () => null },
    beforeEnter: redirectToCompany(companyLinks.contact),
    meta: {
      title: "Contact Us"
    }
  }, {
    path: "/developers/api-overview",
    name: "api-overview",
    component: ApiOverview,
    meta: {
      title: "API Overview"
    }
  }, {
    path: "/users/me",
    name: "users.me",
    component: ShowMe,
    leftMenu: HomeLeftMenu,
    meta: {
      title: "Profile",
      requiresAuth: true
    }
  }, {
    path: "/users/edit-me",
    name: "users.edit-me",
    component: EditMyProfile,
    leftMenu: HomeLeftMenu,
    meta: {
      title: "Edit My Profile",
      requiresAuth: true
    }
  }, {
    path: "/users/:user_id",
    name: "users.show",
    component: ShowUser,
    leftMenu: HomeLeftMenu,
    meta: {
      title: "User Profile",
      requiresAuth: true
    }
  }, {
    path: "/libraries/my-libraries",
    name: "my-libraries",
    component: MyLibraryListView,
    leftMenu: HomeLeftMenu,
    meta: {
      title: "My Libraries",
      requiresAuth: true
    }
  }, {
    path: "/libraries/create",
    name: "library-create",
    component: LibraryCreate,
    leftMenu: HomeLeftMenu,
    meta: {
      title: "Create Library",
      requiresAuth: true
    }
  }, {
    path: "/libraries/:id",
    name: "library-show",
    component: LibraryShow,
    leftMenu: HomeLeftMenu,
    // leftBadge: LibraryBadge,
    meta: {
      requiresAuth: true
    }
  }, {
    path: "/libraries/:id/edit",
    name: "library-edit",
    component: LibraryEdit,
    leftMenu: HomeLeftMenu,
    // leftBadge: LibraryBadge,
    meta: {
      requiresAuth: true
    }
  }, {
    path: "/libraries/:id/about",
    name: "library-about",
    component: LibraryAbout,
    leftMenu: LibraryLeftMenu,
    leftBadge: LibraryBadge,
    meta: {
      requiresAuth: true
    }
  }, {
    path: "/:username",
    name: "unique-name",
    component: SearchShow,
    leftMenu: HomeLeftMenu,
    // leftBadge: LibraryBadge,
    meta: {
      title: "",
      requiresAuth: true
    }
  }]
});
router.beforeEach(to => {
  if (to.matched.some(record => record.meta.requiresAuth) && !stores.auth.isLoggedIn) {
    return { name: "login", query: { from: to.fullPath } };
  }
});
export default router;
