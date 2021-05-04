<template>
    <div>
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

        posts(){
            return this.$store.getters.postsResponse.data;
        }

    },
    components: { PostListItem, Loading },
    data: () => {
        return {
            is_loading: true
        };
    },
    mounted() {
        this.fetchPostsAction();
    },

    methods: {

        fetchPostsAction() {
            this.$store
                .dispatch("fetchPosts")
                .then(() => {
                })
                .catch(() => {
                })
                .finally(() => {
                    this.is_loading = false;
                });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
