<template>
             <div class="container">


     <router-link to="/feeds" class="navbar-brand"> <img src="../assets/alorferi_logo_brand.png" height="24px" alt="Alor Feri logo">
     </router-link>

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
                       <router-link to="/my-libraries">My Libraries</router-link>
                    </li>

                </ul>

                     <ul class="nav navbar-nav navbar-right">


                        <li class="nav-item"><a href="#" class="navbar-item is-primary">Search Here</a></li>


                        <li class="nav-item dropdown">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre><i
                                    class="fa fa-fw fa-bell-o"></i> Notifications <span
                                    class="badge">0</span></a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a href="#"><i class="fa fa-fw fa-book"></i> <span class="badge">request</span>Shakil
                                    request to read your book</a>
                                <a href="#"><i class="fa fa-fw fa-thumbs-o-up"></i> <span
                                        class="badge">Like</span>
                                    Hasan likes your review</a>
                                <a href="#"><i class="fa fa-fw fa-comments-o"></i> <span
                                        class="badge">comment</span> Ehsita commented on your review</a>
                                <a href="#"><i class="fa fa-fw fa-commenting"></i> <span
                                        class="badge">reply</span>
                                    Rubel replied to your comment</a>
                            </div>

                        </li>
                        <li class="nav-item dropdown">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>

                                <img class="img-circle" src="#" width="24" height="24"/>
                                Babul Mirdha <span class="caret"></span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">

                                <a href="#"><span
                                        class="icon">
                              <i class="fa fa-fw fa-user-circle-o m-r-5"></i>
                            </span> My Profile
                                </a>

                                <a href="#"><span class="icon">
                                <i class="fa fa-fw fa-user-circle-o m-r-5"></i>
                              </span>Switch to admin
                                </a>


                              <a class="nav-link" href="#" @click="logoutMe" v-if="this.$store.getters.isLoggedIn">Logout</a>



                            </div>
                        </li>

                </ul>

            </div>


  </div>
</template>

<script>

// import Logout from './Logout'
  export default {
    name: 'MyNav',
    components:{
// Logout
    },
    data() {
      return {}
    },
         computed : {


    },
    mounted() {

    },
    methods: {
        logoutMe: function(){
               this.$parent.logout()
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
