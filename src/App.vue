<template>
  <div id="app">

  <nav class="navbar navbar-default navbar-fixed-top" style="background:#F5BA14">
            <div class="container">

                  <a class="navbar-brand" href="">
                     <img src="" height="24px" alt="Alor Feri logo">
                </a>

    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
 
    </div> 

  </div>
</nav>

<div class="container" style="margin-top:100px;">
 <welcome msg="Welcome to Your Vue.js App"/> 
  </div>

  </div>
</template>

<script>
import Welcome from './components/Welcome.vue'

export default {
  name: 'App',
  components: {
    Welcome
  }
}
</script>

<style>

</style>
