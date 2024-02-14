<template>
    <div class="about">




        <!-- <div class="p-2 m-2 d-flex justify-content-around">
                <img
                    src="@/assets/images/defaults/logo_large_en.png"
                    height="180"
                    alt="Alor Feri logo"
                />



                <img
                    src="@/assets/images/defaults/af_mobile_app.png"
                    height="200"
                    alt="Alor Feri Mobile Library"
                />

                <img
                    src="@/assets/images/defaults/af_model_car.png"
                    height="200"
                    alt="Alor Feri Mobile Library"
                />


            </div> -->

        <AboutAlorFeri class="py-4" />
        <!-- <WhatWeDo class="py-4" /> -->
        <ServicesWeOffered class="py-4" />

        <WhyChooseAlorFeri  class="py-4"/>
        <TechnologyWeUse  class="py-4"/>
        <OurTeam  class="py-4"/>

    </div>
</template>

<script>
    import AboutAlorFeri from "@/views/about/AboutAlorFeri";
    // import WhatWeDo from "@/views/about/WhatWeDo";
    import ServicesWeOffered from "@/views/about/ServicesWeOffered";
    import WhyChooseAlorFeri from "@/views/about/WhyChooseAlorFeri";
    import TechnologyWeUse from "@/views/about/TechnologyWeUse";
    import OurTeam from "@/views/about/OurTeam";

    export default {
        name: "AboutEn",
        components: {
            // WhatWeDo,
            ServicesWeOffered,
            AboutAlorFeri,
            WhyChooseAlorFeri,
            TechnologyWeUse,
            OurTeam
        },
        props: {},
        mounted: function() {},
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
