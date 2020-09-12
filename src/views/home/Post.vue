<template>
    <div>
        <div class="media border p-3 mt-4">
            <img
                src="@/assets/ic_user_male.png"
                alt="John Doe"
                class="mr-3 mt-3 rounded-circle"
                style="width:40px;height:40px"
            />
            <div class="media-body">
                <h4>
                    John Doe <small><i>Posted on February 19, 2016</i></small>
                </h4>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                </p>

                <!-- 4:3 aspect ratio -->
                <div class="embed-responsive embed-responsive-16by9">
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

                    <a href="#" class="btn btn-light">  <i class="far fa-comment-dots"></i> Comment</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Post",
    components: {},
    data() {
        return {
            text:
                "Lorem ipsum dolor sit amet, https://www.youtube.com/watch?v=Z_EsdERRRyg consectetur adipiscing\nelit, sed do eiusmod tempor incididunt ut labore et\ndolore magna aliqua."
        };
    },
    computed: {
        getYouTubeEmbedUrl: function() {
            return (
                "https://www.youtube.com/embed/" +
                this.extractYouTubeVideoId(this.extractUrl(this.text))
            );
        }
    }
};
</script>
