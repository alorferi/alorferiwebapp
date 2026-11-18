<template>
    <PostFeed source="/api/posts" />
</template>

<script>
import PostFeed from "./PostFeed";

export default {
    name: "ShowPosts",
    components: { PostFeed },
};
</script>
