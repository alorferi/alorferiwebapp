<template>
    <div>


        <div class="card">

            <div class=" card-header bg-white">


                <h3 class="text-center "> {{ $t('news_and_media_reports') }}</h3>
            </div>

            <div class="card-body">

                <div class="d-flex d-flex justify-content-around">
                    <div v-for="item in videos" :key="item.vid">
                        <div class="card mb-4">
                            <iframe class="card-img-top" width="240" height="160" :src="getYouTubeEmbedUrl(item.vid)">
                            </iframe>


                            <div class="card-footer">
                                <h6 class="text-center">{{ $t(item . report_src) }}</h6>
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
                videos: [{
                        vid: "O6tpimUtg24",
                        report_src: "somoy_tv_report",
                    },
                    {
                        vid: "6VIGaPAnjz0",
                        report_src: "tbs_report",
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
