<template>
    <div class="pt-2">
        <Loading v-if="show_loading"></Loading>
        <div v-else>
            <WrapperListView
                :dataWrapperList="dataWrappers"
                :listItemComponent="listItemComponent"
            />
        </div>
    </div>
</template>

<script>
import LibraryBookIssueTimelineItem from "../librarybookissue/LibraryBookIssueTimelineItem";
import WrapperListView from "../../components/WrapperListView";
import Loading from "../../components/Loading";

export default {
    name: "LibraryBookIssuedHistory",
     props:["library"],
    components: {
        Loading,
        WrapperListView
    },
  async mounted(){
        this.fetchLibraryBookIssues();
    },
    data: function() {
        return {
            show_loading: true,
            term: null,
            page: null,
            listItemComponent: LibraryBookIssueTimelineItem
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
