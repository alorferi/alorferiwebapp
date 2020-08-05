<template>
  <div id="app">

<<<<<<< HEAD
        <nav class="navbar navbar-expand-sm bg-warning navbar-dark fixed-top">
            <MyNav v-if="isLoggedIn"></MyNav>
            <GuestNav v-else></GuestNav>
        </nav>

        <div class="container h-100" style="margin-top:80px">
            <div v-if="isLoggedIn" class="row h-100">
                <div class="col-sm-2">
                    <component :is="leftBadge"></component>

                    <div>
                        <component :is="leftMenu"></component>
                    </div>
                </div>

                <div class="col-sm-10 h-100" style="overflow-y: scroll;">
                    <router-view></router-view>
                </div>
            </div>

            <div v-else class="h-100">
                <router-view></router-view>
            </div>
        </div>
    </div>
=======
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
>>>>>>> parent of 4463ec0... Merge branch 'development' of https://github.com/alorferi/alorferiwebapp into development
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
