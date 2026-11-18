<template>
    <nav v-if="meta && last > 1" class="social-pagination" :aria-label="$t('social.pages')">
        <ul class="flex list-none p-0 m-0 flex-wrap gap-1">
            <li class="ui-page-item" :class="{ 'ui-disabled': current <= 1 }">
                <button
                    type="button"
                    class="ui-page-link"
                    :disabled="current <= 1"
                    :aria-label="$t('social.previous')"
                    @click="updatePage(current - 1)"
                >
                    ‹
                </button>
            </li>
            <li
                v-for="(page, index) in pages"
                :key="index"
                class="ui-page-item"
                :class="{ 'ui-selected': page === current }"
            >
                <button
                    v-if="page"
                    type="button"
                    class="ui-page-link"
                    :aria-current="page === current ? 'page' : undefined"
                    @click="updatePage(page)"
                >
                    {{ page }}</button
                ><span v-else class="inline-flex h-11 items-center px-1" aria-hidden="true">…</span>
            </li>
            <li class="ui-page-item" :class="{ 'ui-disabled': current >= last }">
                <button
                    type="button"
                    class="ui-page-link"
                    :disabled="current >= last"
                    :aria-label="$t('social.next')"
                    @click="updatePage(current + 1)"
                >
                    ›
                </button>
            </li>
        </ul>
        <p class="text-sm text-secondary m-0">{{ current }} / {{ last }}</p>
    </nav>
</template>
<script>
export default {
  emits: ["update:page"],
  name: "Paginator",
  props: ["meta"],
  computed: {
    current() {
      return Number(this.meta.current_page) || 1;
    },
    last() {
      return Number(this.meta.last_page) || 1;
    },
    pages() {
      const numbers = [...new Set([1, this.current - 1, this.current, this.current + 1, this.last].filter(n => n >= 1 && n <= this.last))].sort((a, b) => a - b);
      const pages = [];
      numbers.forEach((n, i) => {
        if (i && n - numbers[i - 1] > 1) pages.push(null);
        pages.push(n);
      });
      return pages;
    }
  },
  methods: {
    updatePage(page) {
      if (page < 1 || page > this.last || page === this.current) return;
      this.$emit("update:page", page);
    }
  }
};
</script>
