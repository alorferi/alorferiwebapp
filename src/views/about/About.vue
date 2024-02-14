<template>
    <div class="about">


        <AboutEn v-if="isEnLang"/>
        <AboutBn v-else/>


    </div>
</template>

<script>
import AboutEn from "@/views/about/AboutEn";
import AboutBn from "@/views/about/AboutBn";

export default {
    name: "About",
    components: {
        AboutEn, AboutBn
    },
    mounted: function() {},
    computed: {
        isEnLang: function() {
            return this.$store.getters.activeLanguage == "en";
        },
    },
    props: {

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
