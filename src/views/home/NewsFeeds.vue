<template>
    <div >

                <CreateUserPost class="mt-2 mb-3"></CreateUserPost>

                <ShowPosts></ShowPosts>
    </div>
</template>

<script>
import ShowPosts from "@/views/post/ShowPosts";
import CreateUserPost from "@/views/user/CreateUserPost";

export default {
    name: "NewsFeeds",
    computed: {
    },
    components: { CreateUserPost, ShowPosts },
    data: () => {
        return {
        };
    },
  async mounted(){
    },

    methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
