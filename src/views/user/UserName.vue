<template>
    <div>{{ user.first_name }} </div>
</template>

<script>
export default {
    name: "UserName",
    data() {
        return {
            user: null
        };
    },
    computed: {},
    mounted() {
        this.$axios
            .get(this.$apiServerBaseUrl + "/api/user/me")
            .then(response => {
                console.log(response.data.data);
                this.user = response.data.data;
            })
            .catch(errors => {
                console.log(errors);
            });
    },
    methods: {}
};
</script>

<style></style>
