headful<template>
  <div id="app" class="h-100">
    <nav class="navbar navbar-expand-sm bg-warning navbar-dark fixed-top">
      <HomeNav v-if="isLoggedIn"></HomeNav>
      <GuestNav v-else></GuestNav>
    </nav>

    <div class="container-fluid h-100" style="margin-top:80px">
      <div v-if="isLoggedIn" class="h-100">

           <!-- class="row h-100" -->
        <!-- <div class="col-sm-10 h-100" style="overflow-y: scroll;"> -->
          <router-view></router-view>
        <!-- </div> -->
      </div>

      <div v-else class="h-100">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import GuestNav from "./views/navbars/GuestNav";
import HomeNav from "./views/navbars/HomeNav.vue";
// import UserBadge from "./views/badges/UserBadge";
// import HomeLeftMenu from "./views/menus/HomeLeftMenu";
// import LibraryLeftMenu from "./views/menus/LibraryLeftMenu";

export default {
  name: "App",
  components: {
    GuestNav,
    HomeNav,
    // UserBadge,
    // HomeLeftMenu,
    // LibraryLeftMenu,
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
    leftBadge() {
      var name = this.$route.name;
      var routes = this.$router.options.routes.filter(function (route) {
        return route.name == name;
      });
      if (routes.length == 1) {
        return routes[0].leftBadge;
      }

      return null;
    },
    leftMenu() {
      var name = this.$route.name;
      var routes = this.$router.options.routes.filter(function (route) {
        return route.name == name;
      });
      if (routes.length == 1) {
        return routes[0].leftMenu;
      }

      return null;
    },
  },
  methods: {

  },
  created(){
      this.$store.dispatch("setPageTitle", this.$route.meta.title)
  },
  watch:{
      $route(to){
          this.$store.dispatch("setPageTitle", to.meta.title)
      }
  },
  goBack() {
    window.history.length > 1 ? this.$router.go(-1) : this.$router.push({name:"home"});
  },
};
</script>

<style></style>
