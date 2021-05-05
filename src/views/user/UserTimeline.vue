<template>
    <div>
        <Loading v-if="is_loading"></Loading>

        <PostListItem
            v-else
            v-for="post in posts"
            :item="post.attributes"
            v-bind:key="post.id"
        />

        <p v-if="!is_loading && posts.length < 1" class="text-center mt-3">
            No available posts.
        </p>


         <Loading v-if="scrolledToBottom" class="border mt-3"></Loading>

    </div>
</template>

<script>
import PostListItem from "../post/PostListItem";
import Loading from "@/components/Loading";

export default {
    name: "UserTimeline",
    props:['user'],
    computed: {
        posts() {
            return this.$store.getters.userPostsResponse.data;
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
        this.fetchPost();
        this.scroll();
    },

    methods: {
        fetchPost() {
            this.$store
                .dispatch("fetchUserPosts",{userId:this.user.id})
                .then(() => {})
                .catch(() => {})
                .finally(() => {
                    this.is_loading = false;
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
                }
            };
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
