<template>
    <div class="mt-2">
        <SearchTextField @update:term="term = $event" />

        <Loading v-if="libraryBookWrappers.length == 0"></Loading>
        <div v-else>
            <Paginator :meta="meta" @update:page="page = $event" />

            <div>
                <div v-if="libraryBookWrappers.length === 0">
                    <p>
                        No library Book yet
                        <!-- <a href="/library/create" class="text-blue-500">Create one</a> -->
                        <router-link
                            class="text-blue"
                            :to="{ name: 'library-create' }"
                            >Create one</router-link
                        >
                    </p>
                </div>
                <div v-else class="">
                    <div
                        v-for="libraryBookWrapper in libraryBookWrappers"
                        v-bind:key="libraryBookWrapper.attributes.id"
                    >
                        <LibraryBookListItem
                            :libraryBook="libraryBookWrapper.attributes"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LibraryBookListItem from "../librarybook/LibraryBookListItem";
import Loading from "../../components/Loading";
import SearchTextField from "../../components/SearchTextField";
import Paginator from "../../components/Paginator";

export default {
    name: "ShowLibraryMembers",
    components: {
        Loading,
        LibraryBookListItem,
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
            page: null
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
                libraryId: this.library.id
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
