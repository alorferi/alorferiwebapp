<template>
    <div class="border-top">
        <!-- <div>
            <LanguageToggleLink class="ml-auto"/>
        </div> -->
        <div class="d-flex p-1">
            <div class="pl-1" v-if="$store.getters.isLoggedIn == false">
                <router-link :to="{ name: 'register' }"> Sign Up</router-link>
                &nbsp;|&nbsp;
            </div>

            <div class="pl-1" v-if="$store.getters.isLoggedIn == false">
                <router-link :to="{ name: 'login' }"> Log in</router-link>
                &nbsp;|
            </div>

            <div class="pl-1" v-if="showPrivacyPolicy">
                Privacy Policy &nbsp;|
            </div>

            <div class="pl-1"  v-if="showPricing">
                <router-link :to="{ name: 'pricing' }"> Pricing</router-link> &nbsp;|
            </div>

            <div class="pl-1"  v-if="showTerms">
                Terms &nbsp;|
            </div>

            <div class="pl-1"  v-if="showHelp">
                Help &nbsp;|
            </div>

            <div class="pl-1">
                <router-link :to="{ name: 'about' }">About</router-link>
            </div>
        </div>

        <div class="row">

            <div class="col-sm-4">
                Download : Android
            </div>
            <div class="col-sm-4"></div>
            <div class="col-sm-4"></div>
            <div class="col-sm-4"></div>

        </div>



    </div>
</template>

<script>
// import LanguageToggleLink from "@/components/LanguageToggleLink";

export default {
    name: "Login",
    props: {
        msg: String
    },
    components: {
        // LanguageToggleLink
    },
    mounted: function() {},
    data() {
        return {
            showPrivacyPolicy: false,
            showPricing: true,
            showTerms: false,
            showHelp: false,

        };
    },
    methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
