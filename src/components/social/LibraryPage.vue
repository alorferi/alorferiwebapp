<template>
    <section :aria-busy="loading ? 'true' : 'false'">
        <Loading v-if="loading" />
        <div v-else-if="error" class="ui-empty-state ui-card">
            <p role="alert" class="text-danger">{{ $t("social.requestError") }}</p>
            <button type="button" class="ui-button ui-button-outline-primary" @click="load">
                {{ $t("social.retry") }}
            </button>
        </div>
        <LibraryPager v-else />
    </section>
</template>
<script>
import Loading from "@/components/Loading";
import LibraryPager from "@/views/library/LibraryPager";
export default {
    name: "LibraryPage",
    components: { Loading, LibraryPager },
    props: { username: Boolean },
    data() {
        return { loading: true, error: false };
    },
    mounted() {
        this.load();
    },
    methods: {
        async load() {
            this.loading = true;
            this.error = false;
            try {
                await this.$store.dispatch(
                    this.username ? "fetchSearchLibrary" : "fetchLibrary",
                    this.username ? this.$route.params.username : this.$route.params.id
                );
                if (this._isDestroyed) return;
                const id = this.$store.getters.library.id;
                if (!this.getMyLibraryMembership(id)) {
                    try {
                        await this.$store.dispatch("fetchMyLibraryMembership", id);
                    } catch (error) {
                        try {
                            await this.$store.dispatch("fetchMyLibraryMemberRequest", id);
                        } catch (requestError) {
                            /* A missing request is a valid non-member state. */
                        }
                    }
                }
            } catch (error) {
                this.error = true;
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
