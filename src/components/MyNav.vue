<template>
  <div class="container">
    <router-link to="/feeds" class="navbar-brand">
      <img src="../assets/alorferi_logo_brand.png" height="24px" alt="Alor Feri logo" />
    </router-link>

    <!-- Toggler/collapsibe Button -->
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#collapsibleNavbar"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="collapsibleNavbar">
      <ul class="nav navbar-nav mr-auto">
        <li>
          <router-link class="nav-link" to="/my-libraries">My Libraries</router-link>
        </li>
      </ul>

      <ul class="navbar-nav ml-auto">
        <!-- Dropdown -->
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbardrop"
            data-toggle="dropdown"
          >Babul Mirdha</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Link 1</a>
            <a class="dropdown-item" href="#">Link 2</a>
            <a class="dropdown-item" href="#">Link 3</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import Logout from './Logout'
export default {
  name: "MyNav",
  components: {
    // Logout
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    logoutMe: function () {
      this.$parent.logout();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
