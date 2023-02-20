<template>
    <div>
        <div
            class="d-flex pt-2 pl-2 pr-2 pb-2 rounded bg-secondary border-top border-right border-left border-bottom"
            style="height: 312px;"
            :style="{
                'background-image': 'url(' + this.coverUrl + ')',
                'background-size': 'cover'
            }"
        >
            <a
                class="text-danger bg-white pl-1 pr-1 rounded ml-auto mt-auto"
                v-if="this.hasMemberPermissioin('library_edit')"
                @click="showUploadLibraryCoverModal = !showUploadLibraryCoverModal"

            >
                <i class="fa fa-camera"></i>
            </a>

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
    props: ["user", 'library'],
    components: { UploadLibraryCoverModal },
    async mounted() {},

    computed: {
        coverUrl() {
            var coverUrl =""
            if (this.$store.getters.libraryCoverUrl == null) {
                coverUrl = "/libraries/" + this.library.id + "/cover-photo";
                } else {
                    coverUrl = this.$store.getters.libraryCoverUrl
                }

            return this.getApiUrl(coverUrl);
        }
    },
    methods: {


        didFinishedUploadCoverPhoto(){

        }
    },
    data: function() {
        return {
            showUploadLibraryCoverModal: false,
        };
    }
};
</script>

<style scoped></style>
