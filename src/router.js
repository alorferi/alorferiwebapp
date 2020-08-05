import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './components/Login.vue'
import Secure from './components/Secure.vue'
import Register from './components/Register.vue'

Vue.use(Router)

let router = new Router({
<<<<<<< HEAD
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
            path: "/newsfeeds",
            name: "newsfeeds",
            component: NewsFeeds,
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
=======
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/secure',
      name: 'secure',
      component: Secure,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
>>>>>>> parent of 4463ec0... Merge branch 'development' of https://github.com/alorferi/alorferiwebapp into development

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router