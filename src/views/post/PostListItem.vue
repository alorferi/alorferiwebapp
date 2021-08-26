<template>
    <div>
        <div class="media border p-3 mt-3">
            <router-link
                :to="{
                    name: 'users.show',
                    params: { user_id: this.item.user.id }
                }"
            >
                <UserPhoto :user="item.user" size="24"></UserPhoto>
            </router-link>
            <div class="media-body pl-3">
                <div class="d-flex justify-content-between">
                    <h6>
                        {{ item.user.first_name }} {{ item.user.surname }}
                        <small
                            ><i class="text-text-secondary">
                                {{ this.momentFromNow(item.created_at) }}</i
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
                                    ><i class="far fa-edit"></i> Edit this
                                    post</a
                                >
                                <a
                                    class="dropdown-item text-danger"
                                    v-if="isMyPost"
                                    role="button"
                                    @click="deletePost(item)"
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
                    {{ item.body }}
                </p>

                <div v-if="item.image" class="mr-5">
                    <img
                        :src="this.getApiUrl(item.image)"
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



            <ShowPostComments :post="item"/>

            </div>
        </div>
    </div>
</template>

<script>
import UserPhoto from "../user/UserPhoto";
import ShowPostComments from "../postcomment/ShowPostComments";
export default {
    name: "PostListItem",
    props: ["item"],
    components: { UserPhoto,  ShowPostComments},
    data() {
        return {};
    },
    computed: {
        getYouTubeEmbedUrl: function() {
            var url = this.extractUrl(this.item.body);

            if (url) {
                url =
                    "https://www.youtube.com/embed/" +
                    this.extractYouTubeVideoId(url);
            }

            return url;
        },

        isMyPost() {
            return this.item.user.id == this.$store.getters.activeUser.id;
        }
    },

    methods: {
        deletePost(post) {
            this.$store.dispatch("deletePost", post);
        }
    }
};
</script>
