<template>
    <div class="border-top">
        <div class="text-center p-2 d-flex" >
            <div class="pl-1" v-if="$store.getters.isLoggedIn == false">
                <router-link :to="{ name: 'register' }"> Sign Up</router-link>
                &nbsp;|&nbsp;
            </div>

            <div
            class="pl-1"
            v-if="$store.getters.isLoggedIn == false"
            >
                <router-link

                    :to="{ name: 'login' }"
                >
                    Log in</router-link
                >
                &nbsp;|
            </div>

            <div  class="pl-1">
                <router-link :to="{ name: 'about' }">About</router-link>
                &nbsp;|&nbsp;
            </div>

            <div class="pl-1">
                 Privacy Policy &nbsp;|
            </div>

            <div class="pl-1">
                 Pricing
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    props: {
        msg: String
    },
    components: {
    },
    mounted: function() {},
    data() {
        return {
            username: "",
            password: "",
            is_error: false,
            error_message: "",
            errors: null
        };
    },
    methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
