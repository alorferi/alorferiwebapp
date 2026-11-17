<template>
    <div>
        <div class="ui-card flex-row items-start p-4 mb-4">
            <router-link
                :to="{
                    name: 'users.show',
                    params: { user_id: this.post.user.id },
                }"
            >
                <UserPhoto :user="post.user" size="48"></UserPhoto>
            </router-link>
            <div class="min-w-0 flex-1 pl-4">
                <div class="flex justify-between">
                    <div>
                        <div>
                            <router-link
                                class="text-dark"
                                :to="{
                                    name: 'users.show',
                                    params: { user_id: this.post.user.id },
                                }"
                            >
                                <b>
                                    {{ post.user.first_name }}
                                    {{ post.user.surname }}
                                </b>
                            </router-link>

                            <span v-if="post.postable_type == 'App\\Models\\Library'">
                                &gt;

                                <router-link
                                    class="text-dark"
                                    :to="{
                                        name: 'library-show',
                                        params: { id: post.postable.id },
                                    }"
                                >
                                    <b>
                                        {{ post.postable.name }}
                                    </b>
                                </router-link>
                            </span>
                        </div>

                        <small
                            ><i class="text-secondary"> {{ this.momentFromNow(post.created_at) }}</i></small
                        >
                    </div>

                    <div>
                        <div class="relative">
                            <UiDropdown
                                trigger-id="dropdownMenuLink"
                                trigger-class="ui-button ui-button-link border-t border-l border-r border-b"
                                label="Actions"
                                ><template #trigger> </template>
                                <a
                                    class="ui-menu-item text-primary"
                                    role="button"
                                    v-if="isMyPost"
                                    @click="showEditPostModal = !showEditPostModal"
                                    ><i class="far fa-edit"></i> Edit this post</a
                                >
                                <a
                                    class="ui-menu-item text-danger"
                                    v-if="isMyPost"
                                    role="button"
                                    @click="deleteUserPost(post)"
                                    ><i class="far fa-trash-alt"></i> Delete this post</a
                                >

                                <a
                                    class="ui-menu-item text-danger"
                                    v-if="!isMyPost"
                                    role="button"
                                    @click="showCreateReportModel = !showCreateReportModel"
                                    ><i class="fas fa-exclamation-triangle"></i> Report this post</a
                                >

                                <a
                                    class="ui-menu-item text-danger"
                                    v-if="!isMyPost"
                                    role="button"
                                    @click="showCreateBlockModel = !showCreateBlockModel"
                                    ><i class="fas fa-exclamation-triangle"></i> Block this post</a
                                >
                            </UiDropdown>
                        </div>
                    </div>
                </div>

                <CreateReportModal
                    :show="showCreateReportModel"
                    @updateVisibleState="showCreateReportModel = $event"
                    :user="post.user"
                    complainable_type="Post"
                    :complainable_id="post.id"
                />

                <CreateBlockModal
                    :show="showCreateBlockModel"
                    @updateVisibleState="showCreateBlockModel = $event"
                    :user="post.user"
                    blockable_type="Post"
                    :blockable_id="post.id"
                    @didFinish="didFinishBlockingUser"
                />

                <h5 v-if="post.title" class="mr-12" style="text-align: justify" v-html="post.title"></h5>

                <p v-if="post.body" v-html="body" class="mr-12" style="text-align: justify"></p>

                <div v-if="post.image_url" class="mr-12">
                    <img
                        :src="this.getApiUrl(post.image_url)"
                        style="max-width: 100%; height: auto"
                        alt="Posted image"
                        class="h-auto max-w-full"
                    />
                </div>

                <!-- 4:3 aspect ratio -->
                <div v-if="getYouTubeEmbedUrl" class="ui-video-frame">
                    <iframe class="absolute inset-0 h-full w-full" :src="getYouTubeEmbedUrl"></iframe>
                </div>

                <ShowPostComments :post="post" />

                <EditPostModal
                    :show="showEditPostModal"
                    :post="post"
                    @updateVisibleState="showEditPostModal = $event"
                    :postable_type="post.postable_type"
                />
            </div>
        </div>
    </div>
</template>

<script>
import UserPhoto from "../user/UserPhoto";
import ShowPostComments from "../postcomment/ShowPostComments";
import EditPostModal from "./CreateOrEditPostModal.vue";
import CreateReportModal from "@/views/complain/CreateReportModal.vue";
import CreateBlockModal from "@/views/complain/CreateBlockModal.vue";

export default {
    name: "PostListItem",
    props: ["post"],
    components: {
        UserPhoto,
        ShowPostComments,
        EditPostModal,
        CreateReportModal,
        CreateBlockModal
    },
    data() {
        return {
            showEditPostModal: false,
            showCreateReportModel: false,
            showCreateBlockModel: false
        };
    },
    computed: {
        body() {
            return this.post.body.replace(/(?:\r\n|\r|\n)/g, "<br>");
        },
        getYouTubeEmbedUrl: function() {
            var url = this.extractUrl(this.post.body);

            var vId = this.extractYouTubeVideoId(url);

            if (vId) {
                url =
                    "https://www.youtube.com/embed/" +
                    this.extractYouTubeVideoId(url);
            }

            return url;
        },

        isMyPost() {
            return this.post.user.id == this.$store.getters.activeUser.id;
        }
    },

    methods: {
        deleteUserPost(post) {
            this.$store.dispatch("deleteUserPost", post);
        },
        didFinishBlockingUser() {
            this.$store.dispatch("removeUserPost", this.post);
        }
    }
};
</script>
