<template>
    <div>
        <div class="flex flex-col mt-2">
            <a href="/" :aria-current="$route.path === '/' ? 'page' : undefined" class="ui-list-item hover:bg-light focus:bg-light" @click="reload"> {{ $t("news_feed") }}</a>

            <!-- <router-link
        class="list-group-item list-group-item-action"
        :to="{ name: 'home' }"
        >NewsFeed</router-link
    > -->
            <router-link class="ui-list-item hover:bg-light focus:bg-light" :to="{ name: 'my-libraries' }">
                {{ $t("my_libraries") }}</router-link
            >

            <!-- <router-link
  class="list-group-item list-group-item-action"
  :to="{ name: 'autocomplete' }"
>Autocomplete</router-link> -->

            <!-- <router-link
  :to="{ name: 'library-create' }"
  class="list-group-item list-group-item-action"
>Create Library</router-link> -->

            <!-- <a href="#" class="list-group-item list-group-item-action">Messages</a> -->
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: "HomeLeftMenu",
    components: {},
    methods: {
        reload: function() {
            this.$router.go(this.$router.currentRoute);
        }
    }
};
</script>
