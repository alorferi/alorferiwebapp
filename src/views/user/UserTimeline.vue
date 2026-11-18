<template>
    <div>
        <CreateUserPost class="mb-4" v-if="user.id == $stores.user.activeUser.id" />
        <PostFeed :source="'/api/users/' + user.id + '/posts'" empty-message="No available posts." />
    </div>
</template>

<script>
import PostFeed from "@/views/post/PostFeed";
import CreateUserPost from "@/views/user/CreateUserPost";
export default {
  name: "UserTimeline",
  props: ["user"],
  components: {
    PostFeed,
    CreateUserPost
  }
};
</script>
