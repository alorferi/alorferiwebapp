<template>
    <div >

                <CreatePost></CreatePost>

                <ShowPosts></ShowPosts>
    </div>
</template>

<script>
import ShowPosts from "@/views/post/ShowPosts";
import CreatePost from "@/views/post/CreatePost";

export default {
    name: "NewsFeeds",
    computed: {
    },
    components: { CreatePost, ShowPosts },
    data: () => {
        return {
        };
    },
    mounted() {
    },

    methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
