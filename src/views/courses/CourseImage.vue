<template>
    <div class="course-image overflow-hidden rounded-xl bg-primary-soft">
        <img
            v-if="resolvedSrc && !failed"
            :key="resolvedSrc"
            :src="resolvedSrc"
            :alt="title"
            class="block h-auto w-full max-w-full object-contain"
            decoding="async"
            @error="onError"
        />
        <div
            v-else
            class="flex aspect-video flex-col items-center justify-center gap-3 p-5 text-center text-primary"
            role="img"
            :aria-label="title + ' — ' + unavailable"
        >
            <svg
                aria-hidden="true"
                class="h-10 w-10 shrink-0"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
            >
                <path
                    d="M24 12C18 8 10 8 5 10v27c6-2 13-2 19 2 6-4 13-4 19-2V10c-5-2-13-2-19 2Zm0 0v27M11 17c3-1 6 0 8 1m-8 6c3-1 6 0 8 1m10-7c2-1 5-2 8-1m-8 8c2-1 5-2 8-1"
                />
            </svg>
            <span class="max-w-full break-words font-medium">{{ title }}</span>
            <span class="text-sm text-secondary">{{ unavailable }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "CourseImage",
    props: {
        src: { type: String, default: null },
        title: { type: String, default: "" },
    },
    data() {
        return { failed: false };
    },
    computed: {
        resolvedSrc() {
            if (!this.src || !this.src.trim()) return null;
            try {
                const base = this.$apiServerBaseUrl.replace(/\/+$/, "") + "/";
                const url = new URL(this.src.trim(), base);
                return ["http:", "https:"].includes(url.protocol) ? url.href : null;
            } catch (error) {
                return null;
            }
        },
        unavailable() {
            return this.$store.getters.activeLanguage === "bn" ? "ছবি পাওয়া যায়নি" : "Image unavailable";
        },
    },
    watch: {
        resolvedSrc() {
            this.failed = false;
        },
    },
    methods: {
        onError(event) {
            if (event.target.getAttribute("src") === this.resolvedSrc) this.failed = true;
        },
    },
};
</script>
