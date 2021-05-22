<template>
    <div class="mt-2">

        <SearchTextField @update:term="term = $event" />

        <Loading v-if="libraryBookWrappers.length == 0"></Loading>
        <div v-else>
            <Paginator
                :meta="meta"
                @update:page="page = $event"
            />

            <WrapperListView :dataWrapperList="libraryBookWrappers" :listItemComponent="listItemComponent" />

             <Paginator
                :meta="meta"
                @update:page="page = $event"
            />

        </div>
    </div>
</template>


<script>

import WrapperListView from "../../components/WrapperListView";
import Loading from "../../components/Loading";
import SearchTextField from "../../components/SearchTextField";
import Paginator from "../../components/Paginator";
import LibraryBookListItem from "./LibraryBookListItem"

export default {
    name: "ShowLibraryBooks",
     props:["library"],
    components: {
        Loading,
        WrapperListView,
        SearchTextField,
        Paginator
    },
    mounted() {
        this.fetchLibraryBooks();
    },
    data: function() {
        return {
            show_loading: true,
            term: null,
            page: null,
            listItemComponent: LibraryBookListItem
        };
    },
    computed: {
        libraryBookWrappers() {
            return this.$store.getters.libraryBooksResponse == null
                ? []
                : this.$store.getters.libraryBooksResponse.data;
        },

        meta() {
            return this.$store.getters.libraryBooksResponse == null
                ? null
                : this.$store.getters.libraryBooksResponse.meta;
        }
    },
    methods: {
        fetchLibraryBooks: function(pTerm = null, pPage = null) {

            var payload = {
                term: pTerm,
                page: pPage,
                libraryId:this.library.id,
            };

            this.$store
                .dispatch("fetchLibraryBooks", payload)
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
                    this.fetchLibraryBooks(this.term, this.page);
                }
            }
        },

        term: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal != oldVal) {
                    this.fetchLibraryBooks(this.term, this.page);
                }
            }
        }
    }
};
</script>
