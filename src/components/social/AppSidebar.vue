<template>
    <div class="social-navigation-slot">
        <aside class="social-sidebar">
            <AppLinks />
            <p class="social-sidebar-note">{{ $t("social.communityNote") }}</p>
        </aside>
        <UiModal :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" :title="$t('social.navigation')" side-panel hide-footer>
            <AppLinks @navigate="$emit('update:modelValue', false)" />
        </UiModal>
    </div>
</template>
<script>
import AppLinks from "./AppLinks";
export default {
  emits: ["update:modelValue"],
  name: "AppSidebar",
  components: {
    AppLinks
  },
  props: {
    modelValue: Boolean
  }
};
</script>
