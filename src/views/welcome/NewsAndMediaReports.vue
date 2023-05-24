<template>
    <div>


        <div class="card">
            <div class="card-body">
                <h3 class="text-center card-title m-4"> {{$t('news_and_media_reports')}}</h3>

                <div class="d-flex d-flex justify-content-around">
                    <div v-for="item in videos" :key="item.vid">
                        <div class="card mb-4">
                            <iframe
                                class="card-img-top"
                                width="240"
                                height="160"
                                :src="getYouTubeEmbedUrl(item.vid)"
                            >
                            </iframe>
                            <div class="card-body">
                                <div class="card-title">
                                    <h4>{{ item.caption }}</h4>
                                </div>

                                <h5 class="text-center">{{ item.title }}</h5>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "NewsAndMediaReports",
    components: {},
    mounted: function() {},
    computed: {},
    props: {},
    data() {
        return {
            videos: [
                {
                    vid: "O6tpimUtg24",
                    title: "সময় টিভি",
                },
                {
                    vid: "6VIGaPAnjz0",
                    title: "The Business Standard",
                }
            ]
        };
    },
    methods: {
        getYouTubeEmbedUrl: function(vid) {
            return "https://www.youtube.com/embed/" + vid;
        },
        getYouTubeThumbUrl: function(vid) {
            return "https://img.youtube.com/vi/" + vid + "/default.jpg";
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
