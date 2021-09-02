<template>
    <div>
        <Loading v-if="is_loading"></Loading>

        <PostListItem
            v-else
            v-for="post in posts"
            :post="post.attributes"
            v-bind:key="post.id"
        />

        <p v-if="!is_loading && posts.length < 1" class='text-center'>
            No discussion found.
        </p>


         <Loading v-if="scrolledToBottom" class="border mt-3"></Loading>

    </div>
</template>

<script>
import PostListItem from "@/views/post/PostListItem";
import Loading from "@/components/Loading";

export default {
    name: "ShowLibraryPosts",
      props:["library"],
    computed: {
        posts() {
            return this.$store.getters.postsResponse.data;
        }
    },
    components: { PostListItem, Loading },
    data: () => {
        return {
            is_loading: true,
            scrolledToBottom:false
        };
    },
    mounted() {
        this.fetchPostFeedAction();
        this.scroll();
    },

    methods: {
        fetchPostFeedAction() {

            const packet = {
                    overhead:{
                        library:this.library,
                    }
                }
            this.$store
                .dispatch("fetchLibraryPosts",packet)
                .then(() => {})
                .catch(() => {})
                .finally(() => {
                    this.is_loading = false;
                    this.scrolledToBottom = false;
                });
        },

        scroll() {
            window.onscroll = () => {
                let bottomOfWindow =
                    Math.max(
                        window.pageYOffset,
                        document.documentElement.scrollTop,
                        document.body.scrollTop
                    ) +
                        window.innerHeight ===
                    document.documentElement.offsetHeight;

                if (bottomOfWindow) {
                    this.scrolledToBottom = true; // replace it with your code
                     this.fetchPostFeedAction();
                }
            };
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
