<template>
  <div class="h-100">
    <NewsFeeds v-if="$store.getters.isLoggedIn"></NewsFeeds>
    <Welcome v-else></Welcome>
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from "@/views/Welcome.vue";
import NewsFeeds from "@/views/home/NewsFeeds";

export default {
  name: "home",
  components: {
    Welcome,
    NewsFeeds,
  },
};
</script>
