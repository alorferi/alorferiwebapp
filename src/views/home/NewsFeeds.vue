<template>
    <div>
        <NewPost></NewPost>

        <Post></Post>
        <Post></Post>
        <Post></Post>
        <Post></Post>

    </div>
</template>

<script>
import Post from "@/views/home/Post"
import NewPost from "@/views/home/NewPost";
export default {
    name: "NewsFeeds",
    components: { NewPost,Post },

    mounted() {},

    methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
