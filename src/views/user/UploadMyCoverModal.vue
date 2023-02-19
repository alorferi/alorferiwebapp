<template>
    <div>
        <b-modal
        size="xl"
            ref="modal"
            :title="modalTile"
            v-model="showLocal"
            @show="showModal"
            @hidden="hideModal"
            ok-title="Save"
            @ok="handleOk"
            centered
        >
            <form ref="form" @submit.stop.prevent="handleSubmit" class="mb-2">
                <Loading v-if="is_loading"></Loading>

                <div class="d-flex justify-content-center m-2 rounded bg-muted border-top border-right border-left border-bottom"
                style="height: 450px;"
            :style="{
                'background-image': 'url(' + this.coverUrl + ')',
                'background-size': 'cover'
            }"
                >
                </div>
                <b-form-file
                    v-model="coverFile"
                    accept="image/*"
                    placeholder="Choose an image or drop it here..."
                    drop-placeholder="Drop your image here..."
                    @change="onFileChange"
                ></b-form-file>
            </form>
        </b-modal>
        <!-- </div> -->
    </div>
</template>

<script>
import Loading from "@/components/Loading";

export default {
    name: "UploadMyCoverModal",
    components: {
        Loading
    },
    mounted: function() {},
    props: ["show", "cover_url"],
    computed: {
        activeUser() {
            return this.$store.getters.activeUser;
        },
        showLocal: {
            get: function() {
                return this.show;
            },
            set: function(value) {
                this.$emit("updateVisibleState", value);
            }
        }
    },
    data() {
        return {
            coverUrl: null,
            coverFile: null,
            hasImage: false,
            is_loading: false,
            modalTile: "Upload cover photo from computer."
        };
    },
    methods: {
        onFileChange(e) {
            const file = e.target.files[0];
            this.coverUrl = URL.createObjectURL(file);
        },

        updateUserPhoto() {
            const self = this;
            self.is_loading = true;
            let formData = new FormData();

            if (self.coverFile) {
                formData.append("cover", self.coverFile);
            }

            var packet = {
                formData: formData
            };

            self.$store
                .dispatch("uploadMyCoverPhoto", packet)
                .then(() => {
                    self.$emit("onFinishedUploadingCoverPhoto", true);
                    self.hideThisModal();
                })
                .catch(() => {})
                .finally(() => {
                    self.is_loading = false;
                });
        },

        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            return valid;
        },
        showModal() {
            this.showData();
        },
        hideModal() {
            this.clearData();
        },
        clearData() {
            this.coverUrl = null;
            this.coverFile = null;
        },
        showData() {
            this.coverUrl = this.getApiUrl(
                "users/" +
                    this.activeUser.id +
                    "/cover_photo?tick=" +
                    Date.now()
            );
            this.coverFile = null;
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault();
            // Trigger submit handler
            this.handleSubmit();
        },
        handleSubmit() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return;
            }
            // Subit data to backend server
            this.updateUserPhoto();
        },

        hideThisModal() {
            // Hide the modal manually
            this.$nextTick(() => {
                this.showLocal = false;
            });
        }
    }
};
</script>

<style scoped>
#fileInput {
    display: none;
}
h1,
h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
.my-8 {
    margin-top: 4rem;
    margin-bottom: 4rem;
}
</style>
