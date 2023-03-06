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
            const self = this;
            self.$store
                .dispatch("fetchSearchLibrary", username)
                .then(() => {

                    const myLibraryMembership = self.getMyLibraryMembership(
                        self.library.id
                    );

                    if (myLibraryMembership != null) {
                        self.loading = false;
                    } else {
                        self.$store
                            .dispatch("fetchMyLibraryMembership",  self.library.id)
                            .then(() => {
                                self.loading = false;
                            })
                            .catch(() => {
                                self.$store
                                    .dispatch(
                                        "fetchMyLibraryMemberRequest",
                                        self.library.id
                                    )
                                    .then(() => {
                                        self.loading = false;
                                    })
                                    .catch(() => {
                                        self.loading = false;
                                    });
                            });
                    }
                })
                .catch(() => {
                    self.loading = false;
                });

        },
    }
};
</script>
