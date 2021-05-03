<template>
    <div >
        <!-- <div class="row"> -->
            <!-- <div class="col-sm-2">
                <HomeLeftMenu></HomeLeftMenu>
            </div> -->
            <!-- <div class="col-sm-8 " style="overflow-y: scroll;"> -->
                <CreatePost></CreatePost>

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
            <!-- </div> -->

            <!-- <div class="col-sm-2 "></div> -->
        <!-- </div> -->
    </div>
</template>

<script>
import PostListItem from "@/views/post/PostListItem";
import CreatePost from "@/views/post/CreatePost";
// import HomeLeftMenu from "@/views/menus/HomeLeftMenu";

// import { mapGetters } from "vuex";
export default {
    name: "NewsFeeds",
    computed: {
        // ...mapGetters({
        //     access_token: "access_token"
        // })
    },
    components: { CreatePost, PostListItem },
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
