<template>
    <div class="list-group mt-2">
        <div class="list-group-item list-group-item-action">
            <router-link
                class="list-group-item-action"
                :to="{ name: 'library-books', params: this.$route.params.id }"
                >Books</router-link
            >
        </div>

        <router-link
            class="list-group-item list-group-item-action"
            :to="{ name: 'library-members', params: this.$route.params.id }"
            >Members</router-link
        >

        <router-link
            class="list-group-item list-group-item-action"
            :to="{ name: 'library-about', params: this.$route.params.id }"
            >About</router-link
        >
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: "HomeLeftMenu",
    components: {}
};
</script>
