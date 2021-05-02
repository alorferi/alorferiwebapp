<template>
    <div class="mt-2">

        <SearchTextField @update:term="term = $event" />

        <Loading v-if="libraryBookWrappers.length == 0"></Loading>
        <div v-else>
            <Paginator
                :meta="meta"
                @update:page="page = $event"
            />

            <WrapperListView :wrapperList="libraryBookWrappers" :itemComponent="libraryBookListItem" />

        </div>
    </div>
</template>


<script>

import WrapperListView from "../../components/WrapperListView";
import LibraryBookListItem from "./LibraryBookListItem"
import Loading from "../../components/Loading";
import SearchTextField from "../../components/SearchTextField";
import Paginator from "../../components/Paginator";

export default {
    name: "ShowLibraryBooks",
    components: {
        Loading,
        WrapperListView,
        SearchTextField,
        Paginator,
        LibraryBookListItem
    },
    mounted() {
        this.fetchLibraryBooks();
    },
    data: function() {
        return {
            show_loading: true,
            term: null,
            page: null,
            libraryBookListItem: LibraryBookListItem
        };
    },
    computed: {
           library() {
            return this.$store.getters.library;
        },
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
