<template>
    <div class="relative inline-flex max-w-full" @keydown="keydown" @focusout="leave">
        <button
            ref="trigger"
            :id="triggerId || menuId + '-trigger'"
            type="button"
            :class="triggerClass"
            :aria-label="label"
            :aria-expanded="open ? 'true' : 'false'"
            :aria-controls="menuId"
            @click="open = !open"
        >
            <slot name="trigger" /><span
                aria-hidden="true"
                class="ml-1 inline-block border-x-4 border-t-4 border-x-transparent border-t-current align-middle"
            ></span>
        </button>
        <div
            v-if="open"
            ref="menu"
            :id="menuId"
            class="absolute top-full z-40 mt-1 min-w-[10rem] max-w-[calc(100vw-2rem)] rounded border bg-white py-2 text-dark shadow-lg"
            :class="align === 'left' ? 'left-0' : 'right-0'"
            @click="select"
        >
            <slot />
        </div>
    </div>
</template>
<script>
export default {
    name: "UiDropdown",
    props: {
        triggerId: String,
        triggerClass: { type: String, default: "ui-button ui-button-link" },
        label: { type: String, default: "Actions" },
        align: { type: String, default: "right" },
    },
    data() {
        return { open: false, menuId: "ui-menu-" + this._uid };
    },
    mounted() {
        document.addEventListener("click", this.outside);
    },
    beforeDestroy() {
        document.removeEventListener("click", this.outside);
    },
    watch: {
        $route() {
            this.open = false;
        },
    },
    methods: {
        outside(event) {
            if (!this.$el.contains(event.target)) this.open = false;
        },
        leave() {
            this.$nextTick(() => {
                if (!this.$el.contains(document.activeElement)) this.open = false;
            });
        },
        select(event) {
            if (event.target.closest("a,button")) this.open = false;
        },
        keydown(event) {
            if (event.key === "Escape" && this.open) {
                event.preventDefault();
                event.stopPropagation();
                this.open = false;
                this.$refs.trigger.focus();
            }
            if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
            event.preventDefault();
            this.open = true;
            this.$nextTick(() => {
                const items = [...this.$refs.menu.querySelectorAll("a[href],button:not([disabled])")].filter(
                    (e) => e.getClientRects().length
                );
                if (!items.length) return;
                const current = items.indexOf(document.activeElement);
                const index =
                    event.key === "Home"
                        ? 0
                        : event.key === "End"
                        ? items.length - 1
                        : event.key === "ArrowUp"
                        ? current <= 0
                            ? items.length - 1
                            : current - 1
                        : (current + 1) % items.length;
                items[index].focus();
            });
        },
    },
};
</script>
