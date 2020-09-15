<template>
    <div>{{ firstName }} </div>
</template>

<script>
export default {
    name: "UserName",
    data() {
        return {
            user: null
        };
    },
    computed: {
          firstName: function () {
      return this.$store.getters.user.first_name;
    },
    },
    mounted() {
    },
    methods: {}
};
</script>

<style></style>
