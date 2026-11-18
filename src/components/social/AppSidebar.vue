<template>
    <div class="social-navigation-slot">
        <aside class="social-sidebar">
            <AppLinks />
            <p class="social-sidebar-note">{{ $t("social.communityNote") }}</p>
        </aside>
        <UiModal :value="value" @input="$emit('input', $event)" :title="$t('social.navigation')" side-panel hide-footer>
            <AppLinks @navigate="$emit('input', false)" />
        </UiModal>
    </div>
</template>
<script>
import AppLinks from "./AppLinks";
export default { name: "AppSidebar", components: { AppLinks }, props: { value: Boolean } };
</script>
