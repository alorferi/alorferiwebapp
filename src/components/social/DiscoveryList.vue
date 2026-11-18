<template>
    <section :aria-busy="loading ? 'true' : 'false'">
        <form class="social-search" role="search" @submit.prevent="searchNow">
            <label :for="'discover-' + kind" class="sr-only">{{ $t("social.search") }}</label>
            <div class="flex gap-2">
                <input
                    :id="'discover-' + kind"
                    type="search"
                    class="ui-field"
                    v-model="term"
                    :placeholder="$t('social.search')"
                /><button class="ui-button ui-button-light" type="submit" :aria-label="$t('social.search')">
                    <i class="fas fa-search" aria-hidden="true"></i>
                </button>
            </div>
        </form>
        <Loading v-if="loading" />
        <div v-if="error" class="ui-empty-state">
            <p role="alert" class="text-danger">{{ $t("social.requestError") }}</p>
            <button type="button" class="ui-button ui-button-outline-primary" @click="load">
                {{ $t("social.retry") }}
            </button>
        </div>
        <template v-else-if="!loading">
            <WrapperListView
                :dataWrapperList="items"
                :listItemComponent="itemComponent"
                :emptyListMessage="$t('social.noResults')"
                layout="grid"
            />
            <Paginator :meta="meta" @update:page="changePage" />
        </template>
    </section>
</template>
<script>
import Loading from "@/components/Loading";
import Paginator from "@/components/Paginator";
import WrapperListView from "@/components/WrapperListView";
import LibraryListItem from "@/views/library/LibraryListItem";
import UserListItem from "@/views/user/UserListItem";
export default {
    name: "DiscoveryList",
    components: { Loading, Paginator, WrapperListView },
    props: { kind: String },
    data() {
        return { term: "", page: 1, response: null, loading: false, error: false, request: 0 };
    },
    computed: {
        items() {
            return (this.response && this.response.data) || [];
        },
        meta() {
            return this.response && this.response.meta;
        },
        itemComponent() {
            return this.kind === "readers" ? UserListItem : LibraryListItem;
        },
    },
    mounted() {
        this.load();
    },
    beforeDestroy() {
        clearTimeout(this.timer);
        this.request++;
    },
    watch: {
        term() {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => this.searchNow(), 300);
        },
    },
    methods: {
        searchNow() {
            clearTimeout(this.timer);
            this.page = 1;
            this.load();
        },
        changePage(page) {
            this.page = page;
            this.load();
        },
        async load() {
            const request = ++this.request;
            this.loading = true;
            this.error = false;
            try {
                const action = {
                    readers: "searchUsers",
                    libraries: "fetchAllLibraries",
                    myLibraries: "fetchMyLibraries",
                }[this.kind];
                const response = await this.$store.dispatch(action, { term: this.term || null, page: this.page });
                if (request === this.request) this.response = response.data;
            } catch (error) {
                if (request === this.request) this.error = true;
            } finally {
                if (request === this.request) this.loading = false;
            }
        },
    },
};
</script>
