<template>
    <div class="ui-card social-library-context" :aria-busy="loading ? 'true' : 'false'">
        <h2>{{ $t("social.yourLibraries") }}</h2>
        <Loading v-if="loading" />
        <div v-else-if="failed">
            <p role="alert" class="text-danger">{{ $t("social.requestError") }}</p>
            <button type="button" class="ui-button ui-button-outline-primary" @click="load">
                {{ $t("social.retry") }}
            </button>
        </div>
        <template v-else
            ><ul v-if="libraries.length">
                <li v-for="library in libraries" :key="library.id">
                    <router-link :to="{ name: 'library-show', params: { id: library.id } }"
                        ><LibraryLogo :library="library" size="28" /><span>{{ library.name }}</span></router-link
                    >
                </li>
            </ul>
            <p v-else>{{ $t("social.libraryInvite") }}</p>
            <router-link v-if="libraries.length" class="ui-button ui-button-link" :to="{ name: 'my-libraries' }">{{
                $t("social.viewAll")
            }}</router-link>
            <router-link class="ui-button ui-button-outline-primary" :to="{ name: 'library-create' }">{{
                $t("social.createLibrary")
            }}</router-link>
        </template>
    </div>
</template>
<script>
import LibraryLogo from "@/views/library/LibraryLogo";
import Loading from "@/components/Loading";
export default {
  name: "FeedLibraries",
  components: {
    LibraryLogo,
    Loading
  },
  data() {
    return {
      loading: false,
      failed: false,
      libraries: []
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      if (this.loading) return;
      this.loading = true;
      this.failed = false;
      try {
        const r = await this.$stores.library.fetchMyLibraries({
          term: null,
          page: 1
        });
        if (!this.componentLeaving) this.libraries = (r.data.data || []).slice(0, 3).map(x => x.attributes || x);
      } catch (error) {
        this.failed = true;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
