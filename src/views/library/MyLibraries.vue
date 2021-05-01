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

            <LibraryListView :libraries="libraries" />
        </div>
    </div>
</template>

<script>
import LibraryListView from "./LibraryListView";
import Loading from "../../components/Loading";
import SearchTextField from "../../components/SearchTextField";
// import HomeLeftMenu from "@/views/menus/HomeLeftMenu";
import Paginator from "../../components/Paginator";

export default {
    name: "MyLibraries",
    components: {
        Loading,
        LibraryListView,
        SearchTextField,
        Paginator
    },
    mounted() {
        this.fetchMyLibraries();
    },
    data: function() {
        return {
            show_loading: true,
            term: null,
            page: null
        };
    },
    computed: {
        libraries() {
            return this.$store.getters.myLibraryResponse == null
                ? []
                : this.$store.getters.myLibraryResponse.data;
        },

        meta() {
            return this.$store.getters.myLibraryResponse == null
                ? null
                : this.$store.getters.myLibraryResponse.meta;
        }
    },
    methods: {
        editUrl: function(library) {
            return this.getApiUrl("/api/libraries/" + library.id + "/edit");
        },
        //
        fetchMyLibraries: function(pTerm = null, pPage = null) {

            var url = this.getApiUrl("/api/libraries/my-libraries",pTerm,pPage)

            var payload = {
                term: pTerm,
                page: pPage,
                url:url
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
