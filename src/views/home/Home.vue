<template>
  <div class="">
    <NewsFeeds v-if="$stores.auth.isLoggedIn"></NewsFeeds>
    <Welcome v-else></Welcome>
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from "@/views/welcome/Welcome.vue";
import NewsFeeds from "@/views/home/NewsFeeds";
export default {
  name: "home",
  components: {
    Welcome,
    NewsFeeds
  }
};
</script>
