<template>
    <div>
        <div class="media border p-3 mt-3">
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
                        {{ post.user.first_name }} {{ post.user.surname }}
                        <small
                            ><i class="text-text-secondary">
                                {{ this.momentFromNow(post.created_at) }}</i
                            ></small
                        >
                    </h6>

                    <div>
                        <div class="dropdown show">
                            <a
                                class="dropdown-toggle"
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
                                     @click="showEditPostModal = !showEditPostModal"
                                    ><i class="far fa-edit"></i> Edit this
                                    post</a
                                >
                                <a
                                    class="dropdown-item text-danger"
                                    v-if="isMyPost"
                                    role="button"
                                    @click="deletePost(post)"
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
                            </div>
                        </div>
                    </div>
                </div>

                <p class="mr-5" style="text-align:justify">
                    {{ post.body }}
                </p>

                <div v-if="post.image" class="mr-5">
                    <img
                        :src="this.getApiUrl(post.image)"
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



            <ShowPostComments :post="post"/>


            <EditPostModal :showEditPostModal="showEditPostModal"
            :post="post"
             @updateVisibleState="showEditPostModal = $event"
             />

            </div>
        </div>
    </div>
</template>

<script>
import UserPhoto from "../user/UserPhoto";
import ShowPostComments from "../postcomment/ShowPostComments";
import EditPostModal from "./EditPostModal.vue"

export default {
    name: "PostListItem",
    props: ["post"],
    components: { UserPhoto,  ShowPostComments,EditPostModal},
    data() {
        return {
            showEditPostModal: false,
        };
    },
    computed: {
        getYouTubeEmbedUrl: function() {
            var url = this.extractUrl(this.post.body);

            if (url) {
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
        deletePost(post) {
            this.$store.dispatch("deletePost", post);
        }
    }
};
</script>
