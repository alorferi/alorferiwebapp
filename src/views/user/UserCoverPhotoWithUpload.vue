<template>
    <div>
        <div
            class="social-cover flex p-3"
            :style="{
                'background-image': 'url(' + this.userCoverUrl + ')',
                'background-size': 'cover',
            }"
        >
            <button
                type="button"
                :aria-label="$t('social.changeCover')"
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
  components: {
    UploadMyCoverModal
  },
  async mounted() {},
  computed: {
    userCoverUrl() {
      let coverUrl;
      if (this.isItMe(this.user)) {
        if (this.$stores.user.activeUserCoverUrl == null) {
          coverUrl = "/users/" + this.user.id + "/cover-photo";
        } else {
          coverUrl = this.$stores.user.activeUserCoverUrl;
        }
      } else {
        coverUrl = "/users/" + this.user.id + "/cover-photo";
      }
      return this.getApiUrl(coverUrl);
    }
  },
  methods: {},
  data: function () {
    return {
      showUploadMyCoverModal: false
    };
  }
};
</script>

<style scoped></style>
