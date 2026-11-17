<template>
    <portal to="dialogs">
        <div
            v-if="value"
            class="fixed inset-0 flex overflow-y-auto bg-black/50 p-4"
            :class="centered ? 'items-center' : 'items-start pt-8'"
            :style="{ zIndex: 1050 + layer * 10 }"
            :aria-hidden="top ? undefined : 'true'"
            @mousedown.self="dismiss('backdrop')"
        >
            <section
                ref="panel"
                :id="panelId"
                role="dialog"
                :aria-modal="top ? 'true' : undefined"
                :aria-labelledby="titleId"
                :aria-busy="busy ? 'true' : 'false'"
                tabindex="-1"
                class="relative m-auto flex max-h-[calc(100vh-2rem)] w-full max-w-[500px] flex-col rounded border border-black/20 bg-white shadow-lg outline-none"
            >
                <header v-if="!hideHeader" class="flex shrink-0 items-center justify-between border-b p-4">
                    <h2 :id="titleId" class="m-0 text-xl font-medium">{{ title }}</h2>
                    <button
                        type="button"
                        class="ui-close-button"
                        :disabled="busy"
                        :aria-label="closeLabel"
                        @click="dismiss('close')"
                    >
                        ×
                    </button>
                </header>
                <h2 v-else :id="titleId" class="sr-only">{{ title || loadingLabel }}</h2>
                <div class="min-h-0 overflow-y-auto p-4"><slot /></div>
                <footer v-if="!hideFooter" class="flex shrink-0 justify-end gap-2 border-t p-3">
                    <slot name="footer">
                        <button
                            v-if="!okOnly"
                            type="button"
                            class="ui-button ui-button-secondary"
                            :disabled="busy"
                            @click="dismiss('cancel')"
                        >
                            {{ cancelTitle || cancelLabel }}
                        </button>
                        <button type="button" class="ui-button ui-button-primary" :disabled="busy" @click="confirm">
                            {{ busy ? loadingLabel : okTitle }}
                        </button>
                    </slot>
                </footer>
            </section>
        </div>
    </portal>
</template>

<script>
import { modalState, registerModal, unregisterModal } from "./modalState";
const focusable =
    'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export default {
    name: "UiModal",
    props: {
        value: Boolean,
        title: { type: String, default: "" },
        busy: Boolean,
        centered: Boolean,
        hideHeader: Boolean,
        hideFooter: Boolean,
        okOnly: Boolean,
        persistent: Boolean,
        closeOnConfirm: Boolean,
        okTitle: { type: String, default: "OK" },
        cancelTitle: { type: String, default: "" },
    },
    data() {
        return { layers: modalState, panelId: "ui-dialog-" + this._uid };
    },
    computed: {
        titleId() {
            return this.panelId + "-title";
        },
        layer() {
            return Math.max(0, this.layers.layers.indexOf(this.panelId));
        },
        top() {
            return this.layers.layers[this.layers.layers.length - 1] === this.panelId;
        },
        bengali() {
            return this.$store.getters.activeLanguage === "bn";
        },
        cancelLabel() {
            return this.bengali ? "বাতিল" : "Cancel";
        },
        closeLabel() {
            return this.bengali ? "বন্ধ করুন" : "Close";
        },
        loadingLabel() {
            return this.bengali ? "অপেক্ষা করুন…" : "Please wait…";
        },
    },
    watch: {
        value(open) {
            if (open) this.open();
            else this.close();
        },
    },
    mounted() {
        document.addEventListener("keydown", this.keydown, true);
        document.addEventListener("focusin", this.containFocus);
        if (this.value) this.open();
    },
    beforeDestroy() {
        this._leaving = true;
        document.removeEventListener("keydown", this.keydown, true);
        document.removeEventListener("focusin", this.containFocus);
        this.release();
    },
    methods: {
        open() {
            this._previousFocus = document.activeElement;
            registerModal(this.panelId);
            this.$emit("opened");
            this.$nextTick(() =>
                this.$nextTick(() => {
                    if (this.value && !this._leaving) this.focusFirst();
                })
            );
        },
        close() {
            this.release();
            this.$emit("closed");
        },
        release() {
            const wasTop = this.top;
            unregisterModal(this.panelId);
            if (!wasTop) return;
            this.$nextTick(() => {
                const topId = modalState.layers[modalState.layers.length - 1];
                const panel = topId && document.getElementById(topId);
                const previous = this._previousFocus;
                if (previous && previous.isConnected && (!panel || panel.contains(previous))) previous.focus();
                else if (panel) (panel.querySelector(focusable) || panel).focus();
            });
        },
        focusFirst() {
            const panel = this.$refs.panel;
            if (!panel || !this.top) return;
            const targets = [...panel.querySelectorAll(focusable)].filter((e) => e.getClientRects().length);
            (targets.find((e) => e.hasAttribute("autofocus")) || targets[0] || panel).focus();
        },
        containFocus(event) {
            if (this.value && this.top && this.$refs.panel && !this.$refs.panel.contains(event.target))
                this.focusFirst();
        },
        keydown(event) {
            if (!this.value || !this.top) return;
            if (event.key === "Escape") {
                event.preventDefault();
                event.stopImmediatePropagation();
                this.dismiss("escape");
            }
            if (event.key !== "Tab" || !this.$refs.panel) return;
            const targets = [...this.$refs.panel.querySelectorAll(focusable)].filter((e) => e.getClientRects().length);
            const first = targets[0],
                last = targets[targets.length - 1];
            if (!first) {
                event.preventDefault();
                this.$refs.panel.focus();
            } else if (
                event.shiftKey &&
                (document.activeElement === first || document.activeElement === this.$refs.panel)
            ) {
                event.preventDefault();
                last.focus();
            } else if (
                !event.shiftKey &&
                (document.activeElement === last || document.activeElement === this.$refs.panel)
            ) {
                event.preventDefault();
                first.focus();
            }
        },
        dismiss(reason) {
            if (this.busy || (this.persistent && ["escape", "backdrop"].includes(reason))) return;
            this.$emit("cancel");
            this.$emit("input", false);
        },
        confirm() {
            if (this.busy) return;
            const form = this.$refs.panel && this.$refs.panel.querySelector("form");
            if (form && !form.reportValidity()) return;
            this.$emit("confirm");
            if (this.closeOnConfirm) this.$emit("input", false);
        },
    },
};
</script>
