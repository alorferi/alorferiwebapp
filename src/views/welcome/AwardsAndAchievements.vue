<template>
    <div>
        <div v-if="activeItem" class="ui-card mb-4">
            <div class="p-5">
                <h2 class="text-center">
                    {{ $t(activeItem.title) }}
                </h2>
                <img
                    class="rounded mx-auto my-auto block h-auto max-w-full m-6"
                    :src="activeItem.image_name"
                    :alt="activeItem.title"
                />
                <div class="mt-2">
                    {{ $t(activeItem.caption) }}
                </div>
            </div>
        </div>
        <!-- </div> -->

        <div class="flex content-around">
            <div
                class="equal-width-img ml-2 mr-2 flex-1 ui-card"
                v-for="item in items"
                v-bind:key="item.title"
                @click="showItem(item)"
            >
                <div class="p-5">
                    <img class="rounded mx-auto my-auto h-auto max-w-full" :src="item.image_name" :alt="item.title" />
                </div>
                <div class="ui-card-footer text-center" @click="showItem(item)">
                    <h5>{{ $t(item.title) }}</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import award_patuakkhali from "@/assets/images/awards/award_patuakkhali_16x9.png";
import award_prothom_alo from "@/assets/images/awards/award_prothom_alo_16x9.png";
import achivement_innovation_fair_barisal_2023 from "@/assets/images/awards/achivement_innovation_fair_barisal_2023.jpg";
export default {
  name: "Awards",
  components: {},
  mounted: function () {
    this.activeItem = this.items[0];
  },
  computed: {},
  props: {},
  data() {
    return {
      items: [{
        title: "district_champion_title",
        caption: "district_champion_caption",
        image_name: award_patuakkhali
      }, {
        title: "prothom_alo_honor_title",
        caption: "prothom_alo_honor_caption",
        image_name: award_prothom_alo
      }, {
        title: "barishal_innovation_fair_2023_title",
        caption: "barishal_innovation_fair_2023_caption",
        image_name: achivement_innovation_fair_barisal_2023
      }],
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
