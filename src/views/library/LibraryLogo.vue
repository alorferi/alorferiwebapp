<template>
    <span class="social-user-photo" :style="{ width: size + 'px', height: size + 'px' }">
        <img
            v-if="library.logo_url && !failed"
            :src="logoUrl"
            :alt="library.name"
            :width="size"
            :height="size"
            class="rounded-full object-cover"
            loading="lazy"
            decoding="async"
            @error="failed = true"
        />
        <NameCircle v-else :name="library.name" :size="size" />
    </span>
</template>
<script>
import NameCircle from "@/components/NameCircle";
export default {
    name: "LibraryLogo",
    components: { NameCircle },
    props: { library: Object, size: { type: [String, Number], default: 48 } },
    data() {
        return { failed: false };
    },
    computed: {
        logoUrl() {
            return /^https?:\/\//i.test(this.library.logo_url)
                ? this.library.logo_url
                : this.getApiUrl(this.library.logo_url);
        },
    },
    watch: {
        "library.logo_url"() {
            this.failed = false;
        },
    },
};
</script>
