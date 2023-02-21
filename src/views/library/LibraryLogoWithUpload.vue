<template>
    <div>

        <div
            class="rounded d-flex justify-content-center"
            :style="{
                'background-image': 'url(' + this.logoUrl + ')',
                'background-position': 'center',
                width: width + 'px',
                height: height + 'px'
            }">
            <a
                class="text-danger bg-white pl-1 pr-1 rounded mt-auto"
                @click="showUploadLogoModal = !showUploadLogoModal"

                v-if="this.hasMemberPermission('library_edit')"
            >
                <i class="fa fa-camera"></i>
            </a>

            <UploadLibraryLogoModal
                :show="showUploadLogoModal"
                :library="library"
                @updateVisibleState="showUploadLogoModal = $event"
            />
        </div>

    </div>
</template>
<script>
// import NameCircle from "@/components/NameCircle";
import UploadLibraryLogoModal from "@/views/library/UploadLibraryLogoModal";

export default {
    name: "LibraryLogoWithUpload",
    props: ["library", "size"],
    computed: {
        width() {
            return parseInt(this.size) + 12;
        },

        height() {
            return parseInt(this.size) + 12;
        },

        logoUrl() {
            if (this.library.logo_url == null) {
                return "";
            } else {
                return this.getApiUrl(this.library.logo_url);
            }
        }
    },
    components: {
        // NameCircle
        UploadLibraryLogoModal
    },

    data(){
        return {
            showUploadLogoModal: false
        }
    },
    methods: {
        sizeOfImg() {
            return this.size;
        },

        sizeOfNameCircle() {
            return this.size;
        },


    }
};
</script>
