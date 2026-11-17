<template>
    <div class="flex flex-col mt-2">
        <div class="ui-list-item hover:bg-light focus:bg-light">
            <router-link
                class="hover:bg-light focus:bg-light"
                :to="{ name: 'library-books', params: this.$route.params.id }"
                >Books</router-link
            >
        </div>

        <router-link
            class="ui-list-item hover:bg-light focus:bg-light"
            :to="{ name: 'library-members', params: this.$route.params.id }"
            >Members</router-link
        >

        <router-link
            class="ui-list-item hover:bg-light focus:bg-light"
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
