<template>
    <div>
        <div class="ui-card">
            <div class="p-5 flex items-center">
                <router-link
                    :to="{
                        name: 'users.show',
                        params: { user_id: this.activeUser.id },
                    }"
                >
                    <UserPhoto :user="activeUser" size="32"> </UserPhoto>
                </router-link>

                <button
                    type="button"
                    class="ml-4 w-full min-w-0 ui-button ui-button-outline-primary"
                    @click="showCreateUserPostModel = !showCreateUserPostModel"
                >
                    {{ $t("start_a_discussion") }}
                </button>
            </div>

            <CreateOrEditPostModal
                :show="showCreateUserPostModel"
                @updateVisibleState="showCreateUserPostModel = $event"
                postable_type="library"
                :postable_id="library.id"
            />

            <!-- <EditPostModal :show="showEditPostModal"
        :post="post"
         @updateVisibleState="showEditPostModal = $event"
         /> -->
        </div>
    </div>
</template>

<script>
import UserPhoto from "@/views/user/UserPhoto";
import CreateOrEditPostModal from "@/views/post/CreateOrEditPostModal.vue";
// import ImageUploader from "vue-image-upload-resize";

export default {
    name: "CreateLibraryPost",
    components: {
        UserPhoto,
        // ImageUploader,
        CreateOrEditPostModal
    },
    props: ["library"],
    computed: {
        activeUser() {
            return this.$store.getters.activeUser;
        }
    },
    data() {
        return {
            title: "",
            body: "",
            bodyState: null,
            imgUrl: null,
            imgFile: null,
            hasImage: false,
            showCreateUserPostModel: false
            // image: null
        };
    },
    methods: {}
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
