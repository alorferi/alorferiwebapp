<template>
    <div>
        <div class="card mb-3">
            <div class="card-header">Create post</div>
            <div class="card-body">
                <textarea
                    class="form-control"
                    rows="3"
                    id="comment"
                    placeholder="What's on your mind?"
                >
                </textarea>
            </div>
            <div class="card-footer justify-content-end d-flex">
                <button class="btn btn-primary ml-auto">Post</button>
            </div>
        </div>

        <div class="media border p-3">
            <img
                src="img_avatar3.png"
                alt="John Doe"
                class="mr-3 mt-3 rounded-circle"
                style="width:60px;"
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
                <div class="card">
                    <div class="card-body">
                        <div class=" d-flex justify-content-between">
                            <a href="#" class="btn btn-light">Comment</a>
                            <a href="#" class="btn btn-light">Share</a>
                        </div>

                        <div class="d-flex">
                            <input type="text" class="form-group w-100" />
                            <!-- <button class="btn btn-primary ml-auto">
                                Submit
                            </button> -->
                        </div>
                    </div>
                </div>
                <div class="media p-3">
                    <img
                        src="img_avatar2.png"
                        alt="Jane Doe"
                        class="mr-3 mt-3 rounded-circle"
                        style="width:45px;"
                    />
                    <div class="media-body">
                        <h4>
                            Jane Doe
                            <small><i>Posted on February 20 2016</i></small>
                        </h4>
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

        <div class="media border p-3 mt-3">
            <img
                src="img_avatar3.png"
                alt="John Doe"
                class="mr-3 mt-3 rounded-circle"
                style="width:60px;"
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
                <div class="media p-3">
                    <img
                        src="img_avatar2.png"
                        alt="Jane Doe"
                        class="mr-3 mt-3 rounded-circle"
                        style="width:45px;"
                    />
                    <div class="media-body">
                        <h4>
                            Jane Doe
                            <small><i>Posted on February 20 2016</i></small>
                        </h4>
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

        <div class="media border p-3 mt-3">
            <img
                src="img_avatar3.png"
                alt="John Doe"
                class="mr-3 mt-3 rounded-circle"
                style="width:60px;"
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
                <div class="media p-3">
                    <img
                        src="img_avatar2.png"
                        alt="Jane Doe"
                        class="mr-3 mt-3 rounded-circle"
                        style="width:45px;"
                    />
                    <div class="media-body">
                        <h4>
                            Jane Doe
                            <small><i>Posted on February 20 2016</i></small>
                        </h4>
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
export default {
    name: "NewsFeeds",
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
    },
    mounted() {},

    methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
