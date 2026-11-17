<template>
    <div>
        <div
            class="flex pt-2 pl-2 pr-2 pb-2 rounded-2xl bg-primary-soft border"
            style="height: 312px"
            :style="{
                'background-image': 'url(' + this.userCoverUrl + ')',
                'background-size': 'cover',
            }"
        >
            <button
                type="button"
                aria-label="Change cover photo"
                class="ui-button ui-button-light ml-auto mt-auto"
                v-if="this.isItMe(this.user)"
                @click="showUploadMyCoverModal = !showUploadMyCoverModal"
            >
                <i class="fa fa-camera"></i>
            </button>

            <UploadMyCoverModal :show="showUploadMyCoverModal" @updateVisibleState="showUploadMyCoverModal = $event" />
        </div>
    </div>
</template>

<script>
import UploadMyCoverModal from "@/views/user/UploadMyCoverModal";
export default {
    name: "UserCoverPhotoWithUpload",
    props: ["user"],
    components: { UploadMyCoverModal },
    async mounted() {},

    computed: {
        userCoverUrl() {
            var coverUrl = null;
            if (this.isItMe(this.user)) {
                if (this.$store.getters.activeUserCoverUrl == null) {
                    coverUrl = "/users/" + this.user.id + "/cover-photo";
                } else {
                    coverUrl = this.$store.getters.activeUserCoverUrl;
                }
            } else {
                coverUrl = "/users/" + this.user.id + "/cover-photo";
            }

            return this.getApiUrl(coverUrl);
        }
    },
    methods: {},
    data: function() {
        return {
            showUploadMyCoverModal: false,
        };
    }
};
</script>

<style scoped></style>
