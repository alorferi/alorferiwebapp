<template>
    <div>
        <div class="list-group mt-2">
            <a
                href="/"
                class="list-group-item list-group-item-action"
                @click="reload"
                >News Feed</a
            >

            <!-- <router-link
            class="list-group-item list-group-item-action"
            :to="{ name: 'home' }"
            >NewsFeed</router-link
        > -->
            <router-link
                class="list-group-item list-group-item-action"
                :to="{ name: 'my-libraries' }"
                >My Libraries</router-link
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

        <div
            class="d-flex align-items-start flex-column"
            style="height: 550px;"
        >
            <div class="mt-auto p-2 border-top">  <router-link :to="{ name: 'about' }">About</router-link>
            |  <router-link :to="{ name: 'help' }">Help</router-link>
            </div>
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
