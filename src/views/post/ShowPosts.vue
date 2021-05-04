<template>
    <div >

                <Loading v-if="is_loading"></Loading>

                <PostListItem
                    v-else
                    v-for="post in posts"
                    :item="post.attributes"
                    v-bind:key="post.id"
                />

                <p v-if="!is_loading && posts.length < 1">
                    No post found.
                </p>

                <br />
    </div>
</template>

<script>
import PostListItem from "./PostListItem";
import Loading from "@/components/Loading";

export default {
    name: "ShowPosts",
    computed: {
    },
    components: {  PostListItem,Loading },
    data: () => {
        return {
            posts: [],
            is_loading: true
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
                this.is_loading = false;
            });
    },

    methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
