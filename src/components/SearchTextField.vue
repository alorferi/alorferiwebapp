<template>
    <div>
        <form v-on:submit.prevent="updateTerm">
            <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-light text-secondary border-right-0">
                         <i class="fas fa-search"></i
                        >
                    </span>
                </div>
                <input
                    type="text"
                    v-model="term"
                    v-on:change="textChange"
                    class="form-control border-left-0"
                    placeholder="Search"
                />


            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "SearchTextField",
    props: ["route"],
  async mounted(){},
    computed: {},
    data() {
        return {
            term: null
        };
    },

    methods: {
        updateTerm: function() {
            this.$emit("update:term", this.term);
        },
        textChange: function() {
            console.log(this.term);
        }
    },
    watch: {
        term: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal != oldVal && newVal == "") {
                    this.$emit("update:term", this.term);
                }
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
