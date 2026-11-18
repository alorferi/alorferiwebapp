<template>
    <div class="social-feed-layout">
        <section class="social-feed-main" :aria-label="$t('social.feed')"><CreateUserPost /><ShowPosts /></section>
        <aside class="social-feed-aside"><FeedLibraries /></aside>
    </div>
</template>
<script>
import ShowPosts from "@/views/post/ShowPosts";
import CreateUserPost from "@/views/user/CreateUserPost";
import FeedLibraries from "@/components/social/FeedLibraries";
export default {
    name: "NewsFeeds",
    components: { ShowPosts, CreateUserPost, FeedLibraries },
};
</script>
