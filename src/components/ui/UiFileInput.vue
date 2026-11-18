<template>
    <label
        class="block cursor-pointer rounded-xl border border-dashed p-4 text-center focus-within:ring-2 focus-within:ring-primary/40"
        :class="dragging ? 'bg-primary-soft' : 'bg-white'"
        @dragover.prevent="dragging = true"
        @dragleave.prevent="dragging = false"
        @drop.prevent="drop"
    >
        <span class="mb-2 block text-sm">{{ modelValue ? modelValue.name : placeholder }}</span>
        <input
            ref="input"
            type="file"
            :accept="accept"
            :disabled="disabled"
            :required="required && !modelValue"
            :aria-required="required ? 'true' : undefined"
            class="block w-full max-w-full text-sm file:mr-3 file:rounded file:border-0 file:bg-light file:px-3 file:py-2"
            :aria-label="placeholder"
            @change="choose($event.target.files[0] || null)"
        />
    </label>
</template>
<script>
export default {
  emits: ["change", "update:modelValue"],
  name: "UiFileInput",
  props: {
    modelValue: {
      default: null
    },
    accept: {
      type: String,
      default: "image/*"
    },
    disabled: Boolean,
    required: Boolean,
    placeholder: {
      type: String,
      default: "Choose an image or drop it here…"
    }
  },
  data() {
    return {
      dragging: false
    };
  },
  watch: {
    modelValue(file) {
      if (!file && this.$refs.input) this.$refs.input.value = "";
    }
  },
  methods: {
    choose(file) {
      if (this.disabled) return;
      this.$emit("update:modelValue", file);
      this.$emit("change", file);
    },
    drop(event) {
      this.dragging = false;
      this.choose(event.dataTransfer.files[0] || null);
    }
  }
};
</script>
