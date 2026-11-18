<template>
    <div class="social-avatar-edit">
        <UserPhoto :user="currentUser" :size="size" />
        <button
            v-if="isItMe(currentUser)"
            type="button"
            class="ui-button ui-button-light"
            :aria-label="$t('social.changePhoto')"
            @click="showUploadMyPhotoModal = true"
        >
            <i class="fa fa-camera" aria-hidden="true"></i>
        </button>
        <UploadMyPhotoModal :show="showUploadMyPhotoModal" @updateVisibleState="showUploadMyPhotoModal = $event" />
    </div>
</template>
<script>
import UserPhoto from "./UserPhoto";
import UploadMyPhotoModal from "./UploadMyPhotoModal";
export default {
    name: "UserPhotoWithUpload",
    props: ["user", "size"],
    components: { UserPhoto, UploadMyPhotoModal },
    data() {
        return { showUploadMyPhotoModal: false };
    },
    computed: {
        currentUser() {
            return this.isItMe(this.user) ? this.$store.getters.activeUser : this.user;
        },
    },
};
</script>
