<template>
  <div id="app">

  <nav class="navbar navbar-default navbar-fixed-top" style="background:#F5BA14">
            <div class="container">


     <router-link to="/" class="navbar-brand"> <img src="./assets/alorferi_logo_brand.png" height="24px" alt="Alor Feri logo"></router-link> 
     
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
 
    </div> 

       
            <div class="collapse navbar-collapse" id="navbar">
                <ul class="nav navbar-nav navbar-left">

              
                    <li>
                       <router-link to="/about">About</router-link>
                    </li>

                <li v-if="isLoggedIn">
                   <a @click="logout">Logout</a>
                </li>
                </ul>

            </div>


  </div>
</nav>

<div class="container" style="margin-top:100px;">
 <router-view/>
  </div>

  </div>
</template>

<script>
// import Welcome from './components/Welcome.vue'

export default {
  name: 'App',
  components: {
    // Welcome
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
