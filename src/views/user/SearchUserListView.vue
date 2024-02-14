<template>
    <div>
        <h4 class="text-secondary">Users</h4>

        <SearchTextField @update:term="term = $event" />

        <Loading v-if="this.$store.getters.usersResponse == null"></Loading>

        <div v-else>
            <Paginator
                :meta="meta"
                route="users"
                @update:page="page = $event"
            />

            <WrapperListView
                :dataWrapperList="users"
                :listItemComponent="userListItem"
            />

            <Paginator :meta="meta" @update:page="page = $event" />
        </div>
    </div>
</template>

<script>
import UserListItem from "@/views/user/UserListItem";
import WrapperListView from "@/components/WrapperListView";
import Loading from "@/components/Loading";
import SearchTextField from "@/components/SearchTextField";
import Paginator from "@/components/Paginator";

export default {
    name: "SearchUserListView",
    components: {
        Loading,
        WrapperListView,
        SearchTextField,
        Paginator
    },
    async mounted() {
        this.searchUsers();
    },
    data: function() {
        return {
            show_loading: true,
            term: null,
            page: null,
            userListItem: UserListItem
        };
    },
    computed: {
        users() {
            return this.$store.getters.usersResponse == null
                    ? []
                    : this.$store.getters.usersResponse.data;
        },

        meta() {
            return this.$store.getters.usersResponse == null
                ? null
                : this.$store.getters.usersResponse.meta;
        }
    },
    methods: {
        searchUsers: function(pTerm = null, pPage = null) {
            var payload = {
                term: pTerm,
                page: pPage
            };

            this.$store
                .dispatch("searchUsers", payload)
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
                    this.searchUsers(this.term, this.page);
                }
            }
        },

        term: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal != oldVal) {
                    this.searchUsers(this.term, this.page);
                }
            }
        }
    }
};
</script>
