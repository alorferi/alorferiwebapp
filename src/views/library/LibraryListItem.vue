<template>
    <article class="ui-card social-discovery-card">
        <LibraryLogo :library="item" size="56" />
        <h2>
            <router-link :to="{ name: 'library-show', params: { id: item.id } }">{{ item.name }}</router-link>
        </h2>
        <p v-if="item.address">
            {{ [item.address.village, item.address.district && item.address.district.name].filter(Boolean).join(", ") }}
        </p>
        <div class="social-course-meta">
            <span>{{ item.total_books || 0 }} {{ $t("social.books") }}</span
            ><span>{{ item.total_members || 0 }} {{ $t("social.members") }}</span>
        </div>
    </article>
</template>
<script>
import LibraryLogo from "./LibraryLogo";
export default { name: "LibraryListItem", props: ["item"], components: { LibraryLogo } };
</script>
