<template>
    <div>
        <UiModal
            :busy="is_loading"
            size="xl"
            ref="modal"
            :title="modalTile"
            v-model="showLocal"
            @opened="showModal"
            @closed="hideModal"
            ok-title="Save"
            @confirm="handleOk"
            centered
        >
            <form ref="form" @submit.stop.prevent="handleSubmit" class="mb-2">
                <Loading v-if="is_loading"></Loading>

                <div
                    class="flex justify-center m-2 rounded bg-light border-t border-r border-l border-b"
                    style="height: 450px"
                    :style="{
                        'background-image': 'url(' + this.coverUrl + ')',
                        'background-size': 'cover',
                    }"
                ></div>
                <UiFileInput
                    required
                    :disabled="is_loading"
                    v-model="coverFile"
                    accept="image/*"
                    placeholder="Choose an image or drop it here..."
                    @change="onFileChange"
                ></UiFileInput>
            </form>
            <p v-if="requestError" role="alert" class="mt-3 text-danger">{{ requestError }}</p>
        </UiModal>
        <!-- </div> -->
    </div>
</template>

<script>
import { requestErrorMessage } from "@/components/ui/requestError";
import Loading from "@/components/Loading";

export default {
    name: "UploadLibraryCoverModal",
    components: {
        Loading
    },
    beforeDestroy() { if (this.coverUrl && this.coverUrl.startsWith("blob:")) URL.revokeObjectURL(this.coverUrl); },
    mounted: function() {},
    props: ["show", "library"],
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
            requestError: "",
            is_loading: false,
            modalTile: "Upload cover photo from computer."
        };
    },
    methods: {
        onFileChange(file) {
            if (this.coverUrl && this.coverUrl.startsWith("blob:")) URL.revokeObjectURL(this.coverUrl);
            this.coverFile = file;
            this.coverUrl = file ? URL.createObjectURL(file) : null;
        },

        updateLibraryCoverPhoto() {
            const self = this;
            self.requestError = "";
            self.is_loading = true;
            let formData = new FormData();

            if (self.coverFile) {
                formData.append("cover", self.coverFile);
            }

            var packet = {
                library_id: self.library.id,
                formData: formData
            };

            self.$store
                .dispatch("uploadLibraryCoverPhoto", packet)
                .then(() => {
                    self.$emit("didFinishedUpload",true);
                    self.hideThisModal();
                })
                .catch(error => { self.requestError = requestErrorMessage(error, self.$store.getters.activeLanguage); })
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
            this.requestError = "";
            if (this.coverUrl && this.coverUrl.startsWith("blob:")) URL.revokeObjectURL(this.coverUrl);
            this.coverUrl = null;
            this.coverFile = null;
        },
        showData() {
            this.coverUrl = this.getApiUrl(
                "libraries/" +
                    this.library.id +
                    "/cover-photo?tick=" +
                    Date.now()
            );
            this.coverFile = null;
        },
        handleOk() {
            // Prevent modal from closing
            // Trigger submit handler
            this.handleSubmit();
        },
        handleSubmit() {
            if (this.is_loading) return;
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return;
            }
            // Subit data to backend server
            this.updateLibraryCoverPhoto();
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
    color: var(--color-primary);
}
.my-8 {
    margin-top: 4rem;
    margin-bottom: 4rem;
}
</style>
