<template>
    <div>
        <form v-on:submit.prevent="updateTerm">
            <div class="input-group">
                <input
                    type="text"
                    v-model="term"
                    class="form-control"
                    placeholder="Search"
                />

                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <a href="#" @click="updateTerm"> <i class="fas fa-search"></i></a>
                    </span>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "SearchTextField",
    props: ["route"],
    mounted() {},
    computed: {},
    data() {
        return {
            term: null
        };
    },

    methods: {
         updateTerm: function() {
            this.$emit("update:term",  this.term);
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
