<template>
    <div class="">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">


                <div class="carousel-item" v-for="item in items" v-bind:key="item.title"
                    v-bind:class="{ active: item === activeItem  }">


                    <img :src="item.image_name" :alt="item.title"
                        class="d-block w-100 img-thumbnail img-fluid" />

                    <div class="carousel-caption d-none d-md-block">

                        <div class=" p-2" style="background-color: #47434346;">
                            <h4> {{ $t(item . title) }} </h4>
                            <p style="text-align: justify;"> {{ $t(item . caption) }} </p>
                        </div>

                    </div>
                </div>


            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    </div>
</template>

<script>
    import award_patuakkhali from "@/assets/images/awards/award_patuakkhali_16x9.png";
    import award_prothom_alo from "@/assets/images/awards/award_prothom_alo_16x9.png";
    import bm_with_palak from "@/assets/images/awards/expanded_junayed_ahmed.png";
    import achivement_innovation_fair_barisal_2023 from "@/assets/images/awards/achivement_innovation_fair_barisal_2023.jpg";

    export default {
        name: "TopSlider",
        components: {

        },
        mounted: function() {
            this.activeItem = this.items[0];
        },
        computed: {},
        props: {},
        data() {
            return {
                items: [{
                        title: "smart_app_dev_training_2014_title",
                        caption: "smart_app_dev_training_2014_caption",
                        image_name: bm_with_palak
                    },
                    {
                        title: "district_champion_title",
                        caption: "district_champion_caption",
                        image_name: award_patuakkhali
                    },
                    {
                        title: "prothom_alo_honor_title",
                        caption: "prothom_alo_honor_caption",
                        image_name: award_prothom_alo
                    },
                    {
                        title: "barishal_innovation_fair_2023_title",
                        caption: "barishal_innovation_fair_2023_caption",
                        image_name: achivement_innovation_fair_barisal_2023
                    },

                ],
                activeItem: null
            };
        },
        methods: {
            showItem(item) {
                this.activeItem = item;
            }
        }
    };
</script>
