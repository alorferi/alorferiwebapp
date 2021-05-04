<template>
    <div >

                <p v-if="is_loading_posts">Loading posts</p>
                <PostListItem
                    v-else
                    v-for="post in posts"
                    v-bind:key="post.id"
                    :post="post.attributes"
                />

                <p v-if="!is_loading_posts && posts.length < 1">
                    No post found.
                </p>

                <br />
    </div>
</template>

<script>
import PostListItem from "./PostListItem";

export default {
    name: "ShowPosts",
    computed: {
    },
    components: {  PostListItem },
    data: () => {
        return {
            posts: [],
            is_loading_posts: true
        };
    },
    mounted() {
        this.$axios
            .get(this.getApiUrl("/api/posts"), this.getHeaderWithAuthorizationBearerToken())
            .then(response => (this.posts = response.data.data))
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                this.is_loading_posts = false;
            });
    },

    methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
