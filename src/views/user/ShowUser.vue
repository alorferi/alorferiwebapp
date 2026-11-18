<template>
    <section :aria-busy="loading ? 'true' : 'false'">
        <Loading v-if="loading" />
        <div v-else-if="error" class="ui-empty-state ui-card">
            <p role="alert" class="text-danger">{{ $t("social.requestError") }}</p>
            <button type="button" class="ui-button ui-button-outline-primary" @click="load">
                {{ $t("social.retry") }}
            </button>
        </div>
        <UserPager v-else :user="user" />
    </section>
</template>
<script>
import Loading from "@/components/Loading";
import UserPager from "./UserPager";
export default {
    name: "ShowUser",
    components: { Loading, UserPager },
    data() {
        return { loading: true, error: false };
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
    },
    mounted() {
        this.load();
    },
    methods: {
        async load() {
            this.loading = true;
            this.error = false;
            try {
                await this.$store.dispatch("fetchUser", this.$route.params.user_id);
            } catch (error) {
                this.error = true;
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
