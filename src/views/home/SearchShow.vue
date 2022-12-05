<template>
    <div class="">
        <Loading v-if="loading" />
        <div v-else>

            <LibraryPager/>
        </div>
    </div>
</template>

<script>
import Loading from "../../components/Loading";
import LibraryPager from "../library/LibraryPager"


export default {
    name: "SearchShow",
    components: {
        Loading, LibraryPager
    },
  async mounted(){
        this.fetchSearch(this.$route.params.username)
    },

    computed: {
        library(){
           return this.$store.getters.library;
        },

    },
    data: function() {
        return {
            loading: true,
            delete_modal: false,
        };
    },
    methods: {
        fetchSearch(username){
                this.$store
                .dispatch("fetchSearch", username)
                .then(() => {
                    this.loading = false;
                })
                .catch(() => {
                    this.loading = false;
                });

        },
    }
};
</script>
