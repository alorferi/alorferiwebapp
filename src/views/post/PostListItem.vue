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

                                <a class="dropdown-item" role="button" v-if="isMyPost"
                                    ><i class="far fa-edit"></i> Edit this post</a
                                >
                                <a
                                    class="dropdown-item text-danger" v-if="isMyPost"
                                    role="button"
                                    @click="deletePost(item)"
                                    ><i class="far fa-trash-alt"></i> Delete this post</a
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

                <div class="d-flex justify-content-between">
                    <div class="p-2">
                        <i class="far fa-thumbs-up"></i> Iqbal and 137 others
                    </div>

                    <div class="p-2">
                        123 comments
                    </div>
                </div>

                <div
                    class="d-flex justify-content-between border border-left-0 border-right-0 border-bottom-0"
                >
                    <div>
                        <a href="#" class="btn btn-light">
                            <i class="far fa-thumbs-up"></i> Like</a
                        >
                    </div>

                    <a href="#" class="btn btn-light">
                        <i class="far fa-comment-dots"></i> Comment</a
                    >
                </div>
                <form action="">
                      <div class="form-group d-flex">
                               <UserPhoto :user="item.user" size="24" ></UserPhoto>    <input type="text" class="form-control ml-2" placeholder="Type your comment here"/>
                      </div>
                </form>

                <div class="media p-3">
                    <!-- <img
                        src="img_avatar2.png"
                        alt="Jane Doe"
                        class="mr-3 mt-3 rounded-circle"
                        style="width:45px;"
                    /> -->

                      <UserPhoto :user="item.user" size="24"  class="mr-3 mt-3"></UserPhoto>

                    <div class="media-body">
                        <!-- <h4>
                            Jane Doe
                            <small><i>Posted on February 20 2016</i></small>
                        </h4> -->

                                          <h6>
                        {{ item.user.first_name }} {{ item.user.surname }}
                        <small
                            ><i class="text-text-secondary">
                                {{ this.momentFromNow(item.created_at) }}</i
                            ></small
                        >
                    </h6>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                </div>

                <div class="media p-3">
                      <UserPhoto :user="item.user" size="24"  class="mr-3 mt-3"></UserPhoto>
                    <div class="media-body">
                                        <h6>
                        {{ item.user.first_name }} {{ item.user.surname }}
                        <small
                            ><i class="text-text-secondary">
                                {{ this.momentFromNow(item.created_at) }}</i
                            ></small
                        >
                    </h6>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserPhoto from "../user/UserPhoto";
export default {
    name: "PostListItem",
    props: ["item"],
    components: { UserPhoto },
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

        isMyPost(){
            return this.item.user.id == this.$store.getters.activeUser.id
        },

    },

    methods: {
        deletePost(post) {
            this.$store.dispatch("deletePost", post);
        }
    }
};
</script>
