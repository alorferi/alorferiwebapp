<template>
  <div id="nav">
    <nav class="navbar navbar-expand-lg ml-auto">
      <a class="navbar-brand" href="#">
        <img src="@/assets/images/defaults/alorferi_logo_brand.png" style="width:40px;" alt="Alor Feri logo" />
      </a>
      <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#myNavbar" aria-controls="myNavbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="/home">{{ $t('home') }}</a>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link" href="/achievements">{{ $t('training') }}</a>
          </li> -->
          <li class="nav-item">
            <a class="nav-link" href="/about">{{ $t('about') }}</a>
          </li>
        </ul>
        <!-- Right aligned nav items -->
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="/login">{{ $t('login') }}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/register">{{ $t('sign_up') }}</a>
          </li>
          <li class="nav-item">
            <LanguageToggleButton />
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
  
<script>
    import LanguageToggleButton from "@/components/LanguageToggleButton";
    export default {
        name: "GuestNav",
        components: {
            LanguageToggleButton
        },
        data() {
            return {};
        },
        computed: {},
        async mounted() {},
        methods: {}
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
