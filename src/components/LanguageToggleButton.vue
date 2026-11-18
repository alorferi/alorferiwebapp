<template>
    <div class="social-language" role="group" :aria-label="$t('social.language')">
        <button
            v-for="lang in ['en', 'bn']"
            :key="lang"
            type="button"
            :lang="lang"
            :aria-pressed="activeLanguage === lang ? 'true' : 'false'"
            @click="setLanguage(lang)"
        >
            {{ lang === "en" ? "EN" : "বাং" }}
        </button>
    </div>
</template>
<script>
export default {
  computed: {
    activeLanguage() {
      return this.$stores.language.activeLanguage;
    }
  },
  methods: {
    setLanguage(lang) {
      this.$i18n.locale = lang;
      this.$stores.language.setActiveLanguage(lang);
    }
  }
};
</script>
