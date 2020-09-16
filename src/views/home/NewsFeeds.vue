<template>
    <div>
        <NewPost></NewPost>

        <Post v-for="post in posts" v-bind:key="post.id" :post="post"/>

    </div>
</template>

<script>
import Post from "@/views/home/Post";
import NewPost from "@/views/home/NewPost";
export default {
    name: "NewsFeeds",
    components: { NewPost, Post },
    data: () => {
        return {
            posts: null
        };
    },
    mounted() {
        this.$axios
            .get(this.getApiUrl("/api/posts"))
            .then(response => (this.posts = response.data.data))
            .catch(err => {
                console.log(err);
            });
    },

    methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
