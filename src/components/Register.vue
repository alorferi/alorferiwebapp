<template>

   <div class="panel panel-default">
       <div class="panel-heading">  Register </div> 
         <div class="panel-body">
              
            <form class="login form-horizontal" @submit.prevent="register">
                         <div class="col-md-12">
                             <div class="form-group">

                                   <input id="name" v-model="name"  type="text" class="form-control" name="name" placeholder="Full Name" required autofocus>

                            </div>

                              <div class="form-group">
                                   <input id="password"  v-model="password" type="password" class="form-control" name="password" placeholder="Password" required>
                            </div>
                           
                                       <div class="form-group">

                                   <input id="mobile" v-model="mobile"  type="text" class="form-control"  placeholder="Full Name" required autofocus>

                            </div>


                             <div class="form-group">
                            
                                <button type="submit" class="btn btn-primary"  style="width:100%">
                                    Login
                                </button>

                             </div>

                        </div>


            </form>

         </div>
   </div>
</template>

<script>
export default {
  name: 'Register',
  props: {
    msg: String
  },    
  data(){
      return {
        name : "",
        mobile : "",
        password : "",
  

      }
    },
 methods: {
      register: function () {
        let data = {
          name: this.name,
          email: this.mobile,
          password: this.password,
        }
        this.$store.dispatch('register', data)
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
