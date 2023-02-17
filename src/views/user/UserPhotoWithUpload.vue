<template>
    <div class="">
        <div
            class="rounded-circle d-flex justify-content-center"
            :style="{
                'background-image': 'url(' + this.photoUrl + ')',
                // 'background-repeat': 'no-repeat',
                'background-position': 'center',
                // 'background-position': '50px 50px 50px 50px',
                'width': width + 'px',
                'height': height + 'px'
            }"
        >
            <a
                class="text-danger bg-white pl-1 pr-1 rounded mt-auto"
                v-if="this.isItMe(this.currentUser)"
                @click="showUploadMyPhotoModal = !showUploadMyPhotoModal"
            >
                <i class="fa fa-camera"></i>
            </a>

            <UploadMyPhotoModal
                :show="showUploadMyPhotoModal"
                @updateVisibleState="showUploadMyPhotoModal = $event"
            />
        </div>

        <!-- <div class="" v-else>
            <NameCircle :name="this.currentUser.first_name" :size="this.size" />
        </div> -->
    </div>
</template>
<script>
// import NameCircle from "../../components/NameCircle";
import UploadMyPhotoModal from "@/views/user/UploadMyPhotoModal.vue";
export default {
    name: "UserPhotoWithUpload",
    props: ["user", "size"],
    computed: {
        currentUser() {
            if (this.isItMe(this.user)) {
                return this.activeUser;
            } else {
                return this.user;
            }
        },

        activeUser() {
            return this.$store.getters.activeUser;
        },
        photoUrl() {
            return this.getApiUrl(this.currentUser.photo_url);
        },
        width() {
            return parseInt(this.size) + 12;
        },

        height() {
            return parseInt(this.size) + 12;
        },
        imgStyle() {
            var width = parseInt(this.size) + 12;
            var height = parseInt(this.size) + 12;
            return "width:" + width + "px; height:" + height + "px;";
        }
    },
    components: {
        // NameCircle,
        UploadMyPhotoModal
    },
    data: function() {
        return {
            showUploadMyPhotoModal: false,
            imgUrl: null
        };
    },
    methods: {
        sizeOfImg() {
            return this.size;
        },

        sizeOfNameCircle() {
            return this.size;
        }
    }
};
</script>
