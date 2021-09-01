<template>
    <div class="pt-2">

    <CreateLibraryPost
    />

        <Loading v-if="show_loading"></Loading>
        <ShowLibraryPosts :library="library" v-else>

        </ShowLibraryPosts>
    </div>
</template>

<script>

import CreateLibraryPost from "@/views/library/CreateLibraryPost";
import ShowLibraryPosts from  "@/views/library/ShowLibraryPosts";
import Loading from "@/components/Loading";

export default {
    name: "LibraryTimeline",
     props:["library"],
    components: {
        Loading,
        ShowLibraryPosts,
        CreateLibraryPost
    },
    mounted() {
        this.fetchLibraryBookIssues();
    },
    data: function() {
        return {
            show_loading: true,
            term: null,
            page: null,
        };
    },
    computed: {
        dataWrappers() {
            return this.$store.getters.libraryBookIssuesResponse == null
                ? []
                : this.$store.getters.libraryBookIssuesResponse.data;
        },

        meta() {
            return this.$store.getters.libraryBookIssuesResponse == null
                ? null
                : this.$store.getters.libraryBookIssuesResponse.meta;
        }
    },
    methods: {
        fetchLibraryBookIssues: function(pTerm = null, pPage = null) {
            var payload = {
                term: pTerm,
                page: pPage,
                libraryId: this.library.id
            };

            this.$store
                .dispatch("fetchLibraryBookIssues", payload)
                .then(() => {
                    this.show_loading = false;
                })
                .catch(() => {
                    this.show_loading = false;
                });
        }
    },

    watch: {
        page: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal != oldVal) {
                    this.fetchLibraryBookIssues(this.term, this.page);
                }
            }
        },

        term: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal != oldVal) {
                    this.fetchLibraryBookIssues(this.term, this.page);
                }
            }
        }
    }
};
</script>
