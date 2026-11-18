<template>
    <div>
        <div class="-mx-[15px] flex flex-wrap">
            <div class="relative w-full px-[15px] sm:w-1/4"></div>
            <div class="relative w-full px-[15px] sm:w-1/2 pl-12 pr-12">
                <br />
                <br />
                <Login class="ml-6 mr-6" />
            </div>
            <div class="relative w-full px-[15px] sm:w-1/4"></div>
        </div>
        <br />
        <br />
        <br />
        <br />
    </div>
</template>

<script>
import Login from "@/views/auth/Login";
export default {
  name: "LoginContainer",
  props: {
    msg: String
  },
  components: {
    Login
  },
  mounted: function () {
    if (this.$stores.auth.isLoggedIn) {
      if (this.$route.query.from) {
        this.$router.push(this.$route.query.from);
      } else {
        this.$router.push({
          name: "home"
        });
      }
    }
  },
  computed: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
