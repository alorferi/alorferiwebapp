<template>
    <div >

        <TopSlider class="mb-5 mt-6" style="margin-top: 85px;"/>

        <!-- <AboutAlorFeri class="mb-5 mt-6"/> -->

        <OurServices class="mb-5 mt-6"/>

        <OurProducts/>

        <NewsAndMediaReports class="mb-5" />

        <LibraryPatrons class="mb-5" />

        <!-- <AwardsAndAchievements /> -->
    </div>
</template>

<script>
// import AboutAlorFeri from "@/views/welcome/AboutAlorFeri";
import TopSlider from "@/views/welcome/TopSlider";
import LibraryPatrons from "@/views/welcome/LibraryPatrons";
import NewsAndMediaReports from "@/views/welcome/NewsAndMediaReports";
// import AwardsAndAchievements from "@/views/welcome/AwardsAndAchievements";

import OurServices from "@/views/welcome/OurServices";
import OurProducts from "@/views/welcome/OurProducts";


export default {
    name: "Welcome",
    components: {
        TopSlider,
        LibraryPatrons,
        NewsAndMediaReports,
        // AwardsAndAchievements,
        // AboutAlorFeri,
        OurServices,
        OurProducts
    },
    mounted: function() {},
    computed: {},
    props: {
        msg: String
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
