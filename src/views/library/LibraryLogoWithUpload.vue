<template>
    <div class="social-avatar-edit">
        <LibraryLogo :library="library" :size="size" />
        <button
            v-if="hasMemberPermission('library_edit')"
            type="button"
            :aria-label="$t('social.changeLogo')"
            class="ui-button ui-button-light"
            @click="showUploadLogoModal = true"
        >
            <i class="fa fa-camera" aria-hidden="true"></i>
        </button>
        <UploadLibraryLogoModal
            :show="showUploadLogoModal"
            :library="library"
            @updateVisibleState="showUploadLogoModal = $event"
        />
    </div>
</template>
<script>
import LibraryLogo from "./LibraryLogo";
import UploadLibraryLogoModal from "./UploadLibraryLogoModal";
export default {
    name: "LibraryLogoWithUpload",
    components: { LibraryLogo, UploadLibraryLogoModal },
    props: ["library", "size"],
    data() {
        return { showUploadLogoModal: false };
    },
};
</script>
