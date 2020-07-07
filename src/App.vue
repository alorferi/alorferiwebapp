<template>
  <div id="app">

  <nav class="navbar navbar-default navbar-fixed-top" style="background:#F5BA14">

        <MyNav v-if="isLoggedIn"></MyNav>
         <GuestNav v-else></GuestNav>
</nav>

<div class="container" style="margin-top:100px;">
 <router-view/>
  </div>

  </div>
</template>

<script>
import GuestNav from './components/GuestNav.vue'
import MyNav from './components/MyNav.vue'

export default {
  name: 'App',
  components: {
     GuestNav,MyNav
  },
      computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
        methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    },
}
</script>

<style>

</style>
