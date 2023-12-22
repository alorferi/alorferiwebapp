<template>
    <div>
        <div class="card mb-3">
            <div class="card-body">
                <h2 class=" text-center ">
                    {{ $t(activeItem.title) }}
                </h2>
                <img
                    class="rounded mx-auto my-auto d-block img-fluid m-4"
                    :src="activeItem.image_name"
                    :alt="activeItem.title"
                />
                <div class="mt-2">
                    {{ $t(activeItem.caption) }}
                </div>
            </div>
        </div>
        <!-- </div> -->

        <div class="d-flex align-content-around">
            <div
                class="equal-width-img ml-2 mr-2 flex-fill  card"
                v-for="item in items"
                v-bind:key="item.title"
                @click="showItem(item)"
            >
                <div class="card-body">
                    <img
                        class="rounded mx-auto my-auto img-fluid"
                        :src="item.image_name"
                        :alt="item.title"
                    />
                </div>
                <div class="card-footer text-center" @click="showItem(item)">
                    <h5>{{ $t(item.title) }}</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import award_patuakkhali from "@/assets/images/awards/award_patuakkhali.jpg";
import award_prothom_alo from "@/assets/images/awards/award_prothom_alo.jpg";
import achivement_innovation_fair_barisal_2023 from "@/assets/images/awards/achivement_innovation_fair_barisal_2023.jpg";

export default {
    name: "Awards",
    components: {},
    mounted: function() {
        this.activeItem = this.items[0];
    },
    computed: {},
    props: {},
    data() {
        return {
            items: [
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
                }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.equal-width-img {
    width: 100%;
    max-width: 350px; /* Adjust the max-width as needed */
    height: auto;
}
</style>
