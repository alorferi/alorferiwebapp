<template>
    <div>


        <div class="card">


            <div class=" card-header bg-white">
                <h3 class="text-center card-title"> {{ $t('users_love_af') }}</h3>
            </div>


            <div class="card-body">

                <div class="d-flex d-flex justify-content-around">
                    <div v-for="item in videos" :key="item.vid">
                        <div class="card mb-4">
                            <iframe class="card-img-top" width="240" height="160" :src="getYouTubeEmbedUrl(item.vid)">
                            </iframe>
                            <div class="card-body">
                                <div class="card-title">
                                    <h4>{{ item . caption }}</h4>
                                </div>

                                <h5 class="text-center">{{ item . title }}</h5>
                                <div class="text-center">
                                    {{ item . subtitle }}
                                </div>
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
        name: "LibraryPatrons",
        components: {},
        mounted: function() {},
        computed: {},
        props: {},
        data() {
            return {
                videos: [{
                        vid: "j1Bq9rASIoU",
                        title: "মোঃ কামরুজ্জামান ",
                        subtitle: "প্রতিষ্ঠাতা, আদর্শ বাতিঘর পাঠাগার"
                    },
                    {
                        vid: "JRJeDLP-7Hs",
                        title: "পলাশ রায়",
                        subtitle: "প্রতিষ্ঠাতা, সচেতন শিক্ষার্থী সংঘ (সশিস) পাঠাগার"
                    },
                    {
                        vid: "T6Nbz6y6obs",
                        title: "জয়নাল আবেদীন",
                        subtitle: "প্রতিষ্ঠাতা, সাতভিটা গ্রন্থনীড়"
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
