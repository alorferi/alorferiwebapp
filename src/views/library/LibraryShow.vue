<template>
    <div class="">
        <Loading v-if="loading" />
        <div v-else>
            <LibraryPager />
        </div>
    </div>
</template>

<script>
import Loading from "../../components/Loading";
import axios from "axios";
import LibraryPager from "./LibraryPager";

export default {
    name: "LibraryShow",
    components: {
        Loading,
        LibraryPager
    },
    async mounted() {
        this.fetchLibrary(this.$route.params.id);
    },

    computed: {
        library() {
            return this.$store.getters.library;
        }
    },
    data: function() {
        return {
            loading: true,
            delete_modal: false
        };
    },
    methods: {
        fetchLibrary(libraryId) {
            let self = this;

            self.$store
                .dispatch("fetchLibrary", libraryId)
                .then(() => {
                    let myLibraryMembership =
                        self.$store.getters.myLibraryMembership;

                    if (
                        myLibraryMembership != null &&
                        myLibraryMembership.library_id == libraryId &&
                        myLibraryMembership.user_id == self.$store.getters.activeUser.id
                    ) {
                        self.loading = false;
                    } else {
                        self.$store
                            .dispatch("fetchMyLibraryMembership", libraryId)
                            .then(() => {
                                self.loading = false;
                            })
                            .catch(() => {
                                self.loading = false;
                            });
                    }
                })
                .catch(() => {
                    self.loading = false;
                });
        },
        destroy: function() {
            axios
                .delete(
                    this.getApiUrl("/api/libraries/" + this.$route.params.id)
                )
                .then(response => {
                    this.$router.push("/library/my-libraries");
                    console.info(response);
                })
                .catch(error => {
                    alert("Internal error, unable to delete contact.");

                    if (error.response.status === 404) {
                        this.$router.push("/library/my-libraries");
                    }
                });
        }
    }
};
</script>
