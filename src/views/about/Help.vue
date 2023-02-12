<template>
    <div class="">


        <h1>Help</h1>

            <div v-for="item in videos" :key="item.vid">

                <div class="card mb-4">
                    <div class="card-body">
                        <div class="card-title">

                            <h4>   {{  item .caption }}</h4>

                        </div>
                        <iframe width="480" height="320" :src="getYouTubeEmbedUrl(item.vid)"> </iframe>

                        <!-- <img :src="getYouTubeThumbUrl(item.vid)" alt=""> -->
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
                        "Tutorial-01: How to Install Alor Feri App & Create Your User Account using Mobile Number?"
                },
                {
                    vid:
                        "NtI0i-3gA70",
                    caption:
                        "Tutorial-02: How to Create Your User Account Using Email Address?"
                }, {
                    caption:
                        "Tutorial-03: How to Create Your Library in Alor Feri App?",
                    url:
                        "kXW38I0wa88",

                }, {  caption:
                        "Tutorial-04: How to add book to your library using Alor Feri App?",
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
