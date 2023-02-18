<template>
    <div>
        <div
            class="d-flex pt-2 pl-2 pr-2 pb-2 rounded bg-dark"
            style="height: 312px;"
            :style="{
                'background-image': 'url(' + this.userCoverUrl + ')',
                // 'background-repeat': 'no-repeat',
                // 'background-position': 'center',
                'background-size': 'cover'
            }"
        >
            <a
                class="text-danger bg-white pl-1 pr-1 rounded ml-auto mt-auto"
                v-if="this.isItMe(this.user)"
                @click="showUploadMyCoverModal = !showUploadMyCoverModal"
            >
                <i class="fa fa-camera"></i>
            </a>

            <UploadMyCoverModal
                :show="showUploadMyCoverModal"
                @updateVisibleState="showUploadMyCoverModal = $event"
            />
        </div>
    </div>
</template>

<script>
import UploadMyCoverModal from "@/views/user/UploadMyCoverModal";
export default {
    name: "UserCoverPhotoWithUpload",
    props: ["user"],
    components: {UploadMyCoverModal},
    async mounted() {},

    computed: {
        userCoverUrl() {
            return this.getApiUrl("/users/" + this.user.id + "/cover_photo");
        }
    },
    methods: {},
    data: function() {
        return {
            showUploadMyCoverModal: false
        };
    }
};
</script>

<style scoped></style>
