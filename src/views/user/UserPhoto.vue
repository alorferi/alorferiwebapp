<template>
    <span class="social-user-photo" :style="dimensions">
        <img
            v-if="source && !failed"
            :key="source"
            :src="source"
            :alt="user.first_name || ''"
            :style="dimensions"
            class="rounded-full object-cover"
            decoding="async"
            @error="failed = true"
        />
        <NameCircle v-else :name="user.first_name || user.name || '?'" :size="size" />
    </span>
</template>
<script>
import NameCircle from "@/components/NameCircle";
export default {
    name: "UserPhoto",
    props: { user: Object, size: { default: 32 } },
    components: { NameCircle },
    data() {
        return { failed: false };
    },
    computed: {
        source() {
            const p = this.user && this.user.photo_url;
            return p && (/^https?:\/\//i.test(p) ? p : this.getApiUrl(p));
        },
        dimensions() {
            return { width: parseInt(this.size) + "px", height: parseInt(this.size) + "px" };
        },
    },
    watch: {
        source() {
            this.failed = false;
        },
    },
};
</script>
