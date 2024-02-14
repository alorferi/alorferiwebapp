<template>
    <div>
        <h4 class="text-secondary">My Libraries</h4>

        <SearchTextField @update:term="term = $event" />

        <Loading v-if="libraries.length == 0"></Loading>
        <div v-else>
            <Paginator
                :meta="meta"
                route="my-libraries"
                @update:page="page = $event"
            />

            <WrapperListView :dataWrapperList="libraries" :listItemComponent="libraryListItem" />

                   <Paginator
                :meta="meta"
                @update:page="page = $event"
            />

        </div>
    </div>
</template>

<script>
import LibraryListItem from "./LibraryListItem";
import WrapperListView from "../../components/WrapperListView";
import Loading from "../../components/Loading";
import SearchTextField from "../../components/SearchTextField";
import Paginator from "../../components/Paginator";

export default {
    name: "MyLibraryListView",
    components: {
        Loading,
        WrapperListView,
        SearchTextField,
        Paginator
    },
  async mounted(){
        this.fetchMyLibraries();
    },
    data: function() {
        return {
            show_loading: true,
            term: null,
            page: null,
            libraryListItem: LibraryListItem,

        };
    },
    computed: {
        libraries() {
            return this.$store.getters.myLibrariesResponse == null
                ? []
                : this.$store.getters.myLibrariesResponse.data;
        },

        meta() {
            return this.$store.getters.myLibrariesResponse == null
                ? null
                : this.$store.getters.myLibrariesResponse.meta;
        }
    },
    methods: {
        editUrl: function(library) {
            return this.getApiUrl("/api/libraries/" + library.id + "/edit");
        },
        //
        fetchMyLibraries: function(pTerm = null, pPage = null) {

            var payload = {
                term: pTerm,
                page: pPage,
            };

            this.$store
                .dispatch("fetchMyLibraries", payload)
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
                    this.fetchMyLibraries(this.term, this.page);
                }
            }
        },

        term: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal != oldVal) {
                    this.fetchMyLibraries(this.term, this.page);
                }
            }
        }
    }
};
</script>
