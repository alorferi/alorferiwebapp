<template>
    <div class="flex items-start p-2">
        <div class="min-w-0 flex-1 border border-l-0 border-r-0 border-t-0">
            <div class="flex justify-between">
                <h6>
                    <UserPhoto :user="user" size="24" class="mr-4 mt-4"></UserPhoto>
                    {{ user.first_name }} {{ user.surname }}
                </h6>
            </div>
        </div>
    </div>
</template>

<script>
import UserPhoto from "@/views/user/UserPhoto";
export default {
  name: "UserFollowerListItem",
  props: ["user"],
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
  computed: {}
};
</script>
