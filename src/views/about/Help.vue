<template>
    <div class="">


        <h1> {{ $t('tutorial') }} </h1>

            <div v-for="item in videos" :key="item.vid">

                <div class="card mb-4">
                    <div class="card-body">
                        <div class="card-title">

                            <h4>   {{  $t(item .caption) }}</h4>

                        </div>
                        <iframe width="480" height="320" :src="getYouTubeEmbedUrl(item.vid)"> </iframe>


                    </div>

                </div>

        </div>

    </div>
</template>

<script>
export default {
    name: "Help",
    components: {},
    mounted: function() {},
    computed: {

    },
    props: {},
    data() {
        return {
            videos: [
                {
                    vid:
                        "sbLFUISqMOk?list=PLzsrT--VduaZif4IN0vbTXnjBJG_4Qc8C",
                    caption:
                        "tutorial_01"
                },
                {
                    vid:
                        "NtI0i-3gA70",
                    caption:
                    "tutorial_02"
                }, {
                    caption:
                        "tutorial_03",
                    url:
                        "kXW38I0wa88",

                }, {  caption:
                        "tutorial_04",
                        vid:
                        "PnUrXnrxrn0",

                }
            ]
        };
    },
    methods:{
        getYouTubeEmbedUrl: function(vid) {
            return   "https://www.youtube.com/embed/" + vid;
        },
        getYouTubeThumbUrl: function(vid) {
            return   "https://img.youtube.com/vi/"+vid+"/default.jpg";
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
