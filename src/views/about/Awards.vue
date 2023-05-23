<template>
    <div class="">
        <h2>{{ $t("district_champion_title") }}</h2>
        <img
            class="rounded mx-auto my-auto d-block img-fluid m-4"
            src="@/assets/images/awards/award_patuakkhali.jpg"
            alt="Alor Feri logo"
        />

        {{ $t("district_champion_caption") }}
        <br />
        <br />
        <br />

        <h2>{{ $t("prothom_alo_honor_title") }}</h2>
        <img
            class="rounded mx-auto my-auto d-block img-fluid m-4"
            src="@/assets/images/awards/award_prothom_alo.jpg"
            alt="Alor Feri logo"
        />
        {{ $t("prothom_alo_honor_caption") }}
    </div>
</template>

<script>
export default {
    name: "Awards",
    components: {},
    mounted: function() {},
    computed: {},
    props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
