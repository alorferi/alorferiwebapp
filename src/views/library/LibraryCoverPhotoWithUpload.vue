<template>
    <div>
        <div
            class="social-cover flex p-3"
            :style="{
                'background-image': 'url(' + this.coverUrl + ')',
                'background-size': 'cover',
            }"
        >
            <button
                type="button"
                :aria-label="$t('social.changeLibraryCover')"
                class="ui-button ui-button-light ml-auto mt-auto"
                v-if="this.hasMemberPermission('library_edit')"
                @click="showUploadLibraryCoverModal = !showUploadLibraryCoverModal"
            >
                <i class="fa fa-camera"></i>
            </button>

            <UploadLibraryCoverModal
                :show="showUploadLibraryCoverModal"
                @updateVisibleState="showUploadLibraryCoverModal = $event"
                :library="library"
            />
        </div>
    </div>
</template>

<script>
import UploadLibraryCoverModal from "@/views/library/UploadLibraryCoverModal";
export default {
    name: "LibraryCoverPhotoWithUpload",
    props: ["user", "library"],
    components: { UploadLibraryCoverModal },
    async mounted() {},

    computed: {
        coverUrl() {
            var coverUrl = "";
            if (this.$store.getters.libraryCoverUrl == null) {
                coverUrl = "/libraries/" + this.library.id + "/cover-photo";
            } else {
                coverUrl = this.$store.getters.libraryCoverUrl;
            }

            return this.getApiUrl(coverUrl);
        },
    },
    methods: {
        didFinishedUploadCoverPhoto() {},
    },
    data: function () {
        return {
            showUploadLibraryCoverModal: false,
        };
    },
};
</script>

<style scoped></style>
