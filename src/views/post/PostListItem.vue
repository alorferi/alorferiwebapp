<template>
    <div>
        <div class="media border p-3 mt-3">
            <router-link :to="{ name: 'users.show', params:{user_id: this.item.user.id }}">
                <UserPhoto :user="item.user" size="24"></UserPhoto>
            </router-link>
            <div class="media-body pl-3">
                <h6>
                    {{ item.user.first_name }} {{ item.user.surname }}
                    <small
                        ><i class="text-text-secondary">
                            {{ this.momentFromNow(item.created_at) }}</i
                        ></small
                    >
                </h6>
                <p>
                    {{ item.body }}
                </p>

                <div v-if="item.image">
                    <img
                        :src="this.getApiUrl(item.image)"
                        style=" max-width:620; max-height:480px"
                        alt="Posted image"
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
        }
    }
};
</script>
