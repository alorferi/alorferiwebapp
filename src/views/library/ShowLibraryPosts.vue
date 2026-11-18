<template>
    <PostFeed :source="'/api/libraries/' + library.id + '/posts'" />
</template>

<script>
import PostFeed from "@/views/post/PostFeed";
export default {
  name: "ShowLibraryPosts",
  components: {
    PostFeed
  },
  props: ["library"]
};
</script>
