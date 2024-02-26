<template>
    <div>
        <Loading v-if="is_loading"></Loading>

        <CourseCardItem/>

        <p v-if="!is_loading && posts.length < 1" class="text-center">
            No discussion found.
        </p>

        <Loading v-if="scrolledToBottom" class="border mt-3"></Loading>
    </div>
</template>

<script>
// import PostListItem from "@/views/post/PostListItem";
import CourseCardItem from "@/views/courses/CourseCardItem";
import Loading from "@/components/Loading";

export default {
    name: "ShowPosts",
    computed: {
        posts() {
            return this.$store.getters.postsResponse.data;
        }
    },
    components: {  Loading, CourseCardItem },
    data: () => {
        return {
            is_loading: true,
            scrolledToBottom: false
        };
    },
    async mounted() {
        this.fetchPostFeedAction();
        this.scroll();
    },

    methods: {
        fetchPostFeedAction() {
            this.$store
                .dispatch("fetchPostFeed")
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
