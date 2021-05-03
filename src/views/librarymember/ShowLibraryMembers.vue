<template>
    <div class="mt-2">
        <SearchTextField @update:term="term = $event" />

        <Loading v-if="libraryMemberWrappers.length == 0"></Loading>
        <div v-else>
            <Paginator :meta="meta" @update:page="page = $event" />

              <WrapperListView :dataWrapperList="libraryMemberWrappers" :listItemComponent="itemComponent" />

            <Paginator
                :meta="meta"
                @update:page="page = $event"
            />

        </div>
    </div>
</template>

<script>
// import LibraryMemberListView from "./LibraryMemberListView";
import LibraryMemberListItem from "./LibraryMemberListItem";
import Loading from "../../components/Loading";
import SearchTextField from "../../components/SearchTextField";
import Paginator from "../../components/Paginator";
import WrapperListView from "../../components/WrapperListView";

export default {
    name: "ShowLibraryMembers",
    components: {
        Loading,
        SearchTextField,
        Paginator,WrapperListView
    },
    mounted() {
        this.fetchLibraryMembers();
    },
    data: function() {
        return {
            show_loading: true,
            term: null,
            page: null,
            itemComponent: LibraryMemberListItem,
        };
    },
    computed: {
        library() {
            return this.$store.getters.library;
        },
        libraryMemberWrappers() {
            return this.$store.getters.libraryMembersResponse == null
                ? []
                : this.$store.getters.libraryMembersResponse.data;
        },

        meta() {
            return this.$store.getters.libraryMembersResponse == null
                ? null
                : this.$store.getters.libraryMembersResponse.meta;
        }
    },
    methods: {
        fetchLibraryMembers: function(pTerm = null, pPage = null) {
            var payload = {
                term: pTerm,
                page: pPage,
                libraryId: this.library.id
            };

            this.$store
                .dispatch("fetchLibraryMembers", payload)
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
                    this.fetchLibraryMembers(this.term, this.page);
                }
            }
        },

        term: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal != oldVal) {
                    this.fetchLibraryMembers(this.term, this.page);
                }
            }
        }
    }
};
</script>
