<template>
    <div class="social-feed-layout">
        <section class="social-feed-main" :aria-label="$t('social.feed')">
            <h1 class="sr-only">{{ $t("social.feed") }}</h1>
            <CreateUserPost /><ShowPosts /><BottomBar compact />
        </section>
        <aside class="social-feed-aside"><FeedLibraries /></aside>
    </div>
</template>
<script>
import ShowPosts from "@/views/post/ShowPosts";
import CreateUserPost from "@/views/user/CreateUserPost";
import FeedLibraries from "@/components/social/FeedLibraries";
import BottomBar from "@/views/navbars/BottomBar";
export default {
  name: "NewsFeeds",
  components: {
    ShowPosts,
    CreateUserPost,
    FeedLibraries,
    BottomBar
  }
};
</script>
