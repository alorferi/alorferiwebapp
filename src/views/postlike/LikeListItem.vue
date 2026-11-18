<template>
    <div class="flex items-start p-2">
        <div class="min-w-0 flex-1 border border-l-0 border-r-0 border-t-0">
            <div class="flex justify-between">
                <h6>
                    <UserPhoto :user="like.user" size="24" class="mr-4 mt-4"></UserPhoto> {{ like.user.first_name }}
                    {{ like.user.surname }}
                </h6>

                <div v-html="like.emoji_html_code"></div>
            </div>
        </div>
    </div>
</template>

<script>
import UserPhoto from "@/views/user/UserPhoto";
export default {
  name: "likeListItem",
  props: ["like", "post"],
  components: {
    UserPhoto
  },
  data() {
    return {
      body: "",
      bodyState: null
    };
  },
  methods: {},
  computed: {
    isMylike() {
      return this.like.user.id == this.$stores.user.activeUser.id;
    }
  }
};
</script>
