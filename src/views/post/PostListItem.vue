<template>
    <div>
        <div class="media border p-3 mb-3">
            <router-link
                :to="{
                    name: 'users.show',
                    params: { user_id: this.post.user.id }
                }"
            >
                <UserPhoto :user="post.user" size="24"></UserPhoto>
            </router-link>
            <div class="media-body pl-3">
                <div class="d-flex justify-content-between">
                    <h6>
                        <router-link
                        class="text-dark"
                            :to="{
                                name: 'users.show',
                                params: { user_id: this.post.user.id }
                            }"
                        >
                            {{ post.user.first_name }} {{ post.user.surname }}
                        </router-link>
                        <small
                            ><i class="text-text-secondary">
                                {{ this.momentFromNow(post.created_at) }}</i
                            ></small
                        >
                    </h6>

                    <div>
                        <div class="dropdown show">
                            <a
                                class="dropdown-toggle dropdown-toggle-split btn btn-link
                                border-top border-left border-right border-bottom
                                "
                                role="button"
                                id="dropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <!-- <i class="fas fa-ellipsis-v"></i> -->
                            </a>

                            <div
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuLink"
                            >
                                <a
                                    class="dropdown-item  text-primary"
                                    role="button"
                                    v-if="isMyPost"
                                    @click="
                                        showEditPostModal = !showEditPostModal
                                    "
                                    ><i class="far fa-edit"></i> Edit this
                                    post</a
                                >
                                <a
                                    class="dropdown-item text-danger"
                                    v-if="isMyPost"
                                    role="button"
                                    @click="deleteUserPost(post)"
                                    ><i class="far fa-trash-alt"></i> Delete
                                    this post</a
                                >

                                <a
                                    class="dropdown-item text-danger"
                                    v-if="!isMyPost"
                                    role="button"
                                    ><i class="fas fa-exclamation-triangle"></i>
                                    Report this post</a
                                >

                                <a
                                    class="dropdown-item text-danger"
                                    v-if="!isMyPost"
                                    role="button"
                                    ><i class="fas fa-exclamation-triangle"></i>
                                    Block this post</a
                                >
                            </div>
                        </div>
                    </div>
                </div>

                <h5
                    v-if="post.title"
                    class="mr-5"
                    style="text-align:justify"
                    v-html="post.title"
                ></h5>

                <p
                    v-if="post.body"
                    v-html="body"
                    class="mr-5"
                    style="text-align:justify"
                ></p>

                <div v-if="post.image_url" class="mr-5">
                    <img
                        :src="this.getApiUrl(post.image_url)"
                        style="max-width:100%; height: auto;"
                        alt="Posted image"
                        class="img-fluid"
                    />
                </div>

                <!-- 4:3 aspect ratio -->
                <div
                    v-if="getYouTubeEmbedUrl"
                    class="embed-responsive embed-responsive-16by9"
                >
                    <iframe
                        class="embed-responsive-item"
                        :src="getYouTubeEmbedUrl"
                    ></iframe>
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

export default {
    name: "PostListItem",
    props: ["post"],
    components: { UserPhoto, ShowPostComments, EditPostModal },
    data() {
        return {
            showEditPostModal: false
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
        }
    }
};
</script>
