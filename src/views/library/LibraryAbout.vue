<template>
    <section class="ui-card social-detail-card">
        <Loading v-if="loading" />
        <div v-else-if="error">
            <p role="alert">{{ $t("social.requestError") }}</p>
            <button type="button" class="ui-button ui-button-light" @click="load">{{ $t("social.retry") }}</button>
        </div>
        <template v-else-if="record">
            <h2 class="text-xl font-semibold">{{ $t("social.about") }}</h2>
            <p v-if="record.about" class="leading-relaxed text-secondary whitespace-pre-line">{{ record.about }}</p>
            <dl class="social-details-grid">
                <template v-for="field in fields"
                    ><div v-if="record[field.key] != null && record[field.key] !== ''" :key="field.key">
                        <dt>{{ $t("social." + field.label) }}</dt>
                        <dd>{{ field.key === "founded_at" ? formatDate(record[field.key]) : record[field.key] }}</dd>
                    </div></template
                >
            </dl>
        </template>
    </section>
</template>
<script>
import Loading from "@/components/Loading";
export default {
  name: "LibraryAbout",
  components: {
    Loading
  },
  props: {
    library: Object
  },
  data() {
    return {
      loading: !this.library,
      error: false
    };
  },
  computed: {
    record() {
      return this.library || this.$stores.library.library;
    },
    fields() {
      return [{
        key: "email",
        label: "email"
      }, {
        key: "mobile",
        label: "mobile"
      }, {
        key: "founded_at",
        label: "foundedAt"
      }, {
        key: "govt_reg_no",
        label: "registrationNumber"
      }, {
        key: "opening_time_at",
        label: "openingTime"
      }, {
        key: "closing_time_at",
        label: "closingTime"
      }];
    }
  },
  mounted() {
    if (!this.library) this.load();
  },
  methods: {
    async load() {
      this.loading = true;
      this.error = false;
      try {
        await this.$stores.library.fetchLibrary(this.$route.params.id);
      } catch (error) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
