<template>
    <header class="social-page-heading">
        <div>
            <p class="social-eyebrow">{{ $t("social.community") }}</p>
            <h1>{{ title }}</h1>
            <p v-if="description">{{ description }}</p>
        </div>
        <div v-if="$slots.default" class="social-page-actions"><slot /></div>
    </header>
</template>
<script>
export default {
  name: "PageHeading",
  props: {
    title: String,
    description: String
  }
};
</script>
