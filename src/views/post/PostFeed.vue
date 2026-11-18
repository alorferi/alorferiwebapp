<template>
    <div class="post-feed" :data-source="source" :aria-busy="loading ? 'true' : 'false'">
        <PostListItem
            v-for="post in posts"
            :key="post.attributes.id"
            :post="post.attributes"
            :data-post-id="post.attributes.id"
        />

        <Loading v-if="loading" class="mb-4" />
        <p v-if="paging && paging.loaded && !loading && !paging.error && !posts.length" class="ui-empty-state">
            {{ emptyMessage }}
        </p>
        <div
            v-if="paging && paging.error"
            class="post-feed-pagination my-4 rounded-xl border border-danger/30 bg-white p-4 text-center"
        >
            <p role="alert" class="text-danger">{{ errorMessage }}</p>
            <button type="button" class="ui-button ui-button-outline-primary" @click="requestPage(true)">
                {{ bengali ? "আবার চেষ্টা করুন" : "Retry" }}
            </button>
        </div>

        <p v-if="paging && paging.loaded && !paging.next && posts.length && !paging.error" class="social-feed-end">
            {{ $t("social.allCaughtUp") }}
        </p>
        <div ref="sentinel" class="post-feed-sentinel h-px" aria-hidden="true"></div>
        <div
            v-if="paging && paging.loaded && paging.next && !paging.error"
            class="post-feed-pagination my-4 text-center"
        >
            <button
                type="button"
                class="ui-button ui-button-outline-primary"
                :disabled="loading"
                @click="requestPage()"
            >
                {{ bengali ? "আরও পোস্ট দেখুন" : "Load more" }}
            </button>
        </div>
    </div>
</template>

<script>
import Loading from "@/components/Loading";
import PostListItem from "./PostListItem";

export default {
    name: "PostFeed",
    components: { Loading, PostListItem },
    props: {
        source: { type: String, required: true },
        emptyMessage: { type: String, default: "No discussion found." },
    },
    data() {
        return { generation: null };
    },
    computed: {
        paging() {
            const paging = this.$store.getters.postsPaging;
            return paging.source === this.source && paging.generation === this.generation ? paging : null;
        },
        posts() {
            return this.paging ? this.$store.getters.postsResponse.data : [];
        },
        loading() {
            return this.paging ? this.paging.loading : false;
        },
        bengali() {
            return this.$store.getters.activeLanguage === "bn";
        },
        errorMessage() {
            return this.bengali ? "পোস্ট লোড করা যায়নি। আবার চেষ্টা করুন।" : "Unable to load posts. Please try again.";
        },
    },
    watch: {
        source() {
            this.startFeed();
        },
    },
    mounted() {
        this.startFeed();
    },
    beforeDestroy() {
        if (this.observer) this.observer.disconnect();
        this.$store.commit("releasePostsFeed", this.generation);
        this.generation = null;
    },
    methods: {
        startFeed() {
            if (this.observer) this.observer.disconnect();
            this.$store.commit("beginPostsFeed", this.source);
            this.generation = this.$store.getters.postsPaging.generation;
            this.requestPage();
        },
        async requestPage(retry = false) {
            const paging = this.paging;
            if (!paging || paging.loading || (paging.error && !retry) || (paging.loaded && !paging.next)) return;
            const generation = this.generation;
            try {
                await this.$store.dispatch("fetchPostsPage", { source: this.source, generation, retry });
            } catch (error) {
                // The store retains the failed page and exposes the retry state.
            }
            await this.$nextTick();
            if (this.generation !== generation || !this.paging) return;
            this.observeNextPage();
        },
        observeNextPage() {
            if (this.observer) this.observer.disconnect();
            if (!this.paging || !this.paging.next || this.paging.error || !("IntersectionObserver" in window)) return;
            if (!this.observer) {
                this.observer = new IntersectionObserver(
                    (entries) => {
                        if (entries.some((entry) => entry.isIntersecting)) this.requestPage();
                    },
                    { rootMargin: "200px 0px" }
                );
            }
            // Re-observe after rendering so short pages can fill the viewport.
            this.observer.observe(this.$refs.sentinel);
        },
    },
};
</script>
