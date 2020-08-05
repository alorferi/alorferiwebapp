<template>
  <div class="list-group mt-2">
    <router-link
      class="list-group-item list-group-item-action"
      :to="{ name: 'newsfeeds' }"
    >NewsFeeds</router-link>
    <router-link
      class="list-group-item list-group-item-action"
      :to="{ name: 'my-libraries' }"
    >My Libraries</router-link>
    <router-link
      :to="{ name: 'library-create' }"
      class="list-group-item list-group-item-action"
    >Create Library</router-link>

    <a href="#" class="list-group-item list-group-item-action">Messages</a>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeLeftMenu",
  components: {},
};
</script>
