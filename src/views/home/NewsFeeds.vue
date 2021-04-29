<template>
    <div >
        <!-- <div class="row h-100"> -->
            <!-- <div class="col-sm-2 h-100">
                <HomeLeftMenu></HomeLeftMenu>
            </div> -->
            <!-- <div class="col-sm-8 h-100" style="overflow-y: scroll;"> -->
                <NewPost></NewPost>

                <p v-if="is_loading_posts">Loading posts</p>
                <Post
                    v-else
                    v-for="post in posts"
                    v-bind:key="post.id"
                    :post="post"
                />

                <p v-if="!is_loading_posts && posts.length < 1">
                    No post found.
                </p>

                <br />
            <!-- </div> -->

            <!-- <div class="col-sm-2 h-100"></div> -->
        <!-- </div> -->
    </div>
</template>

<script>
import Post from "@/views/post/Post";
import NewPost from "@/views/post/NewPost";
// import HomeLeftMenu from "@/views/menus/HomeLeftMenu";

// import { mapGetters } from "vuex";
export default {
    name: "NewsFeeds",
    computed: {
        // ...mapGetters({
        //     access_token: "access_token"
        // })
    },
    components: { NewPost, Post },
    data: () => {
        return {
            posts: [],
            is_loading_posts: true
        };
    },
    mounted() {
        this.$axios
            .get(this.getApiUrl("/api/posts"), this.getBearerToken())
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
