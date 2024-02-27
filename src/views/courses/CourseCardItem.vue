<template>
    <div class="">



        <div class="d-flex justify-content-between">
            <span>
                &nbsp;
            </span>


            <span class="circle-sm m-2" v-if="item.discount > 0">
                -{{ item . discount }}%
            </span>


            <span class="circle m-2 bg-success text-success" v-else>
                -{{ item . discount }}%
            </span>


        </div>


        <img class="rounded img-fluid ml-2 mr-2" :src="imageUrl()" alt="Course Thumb">

        <div class="card-body">

            <div :style="{ color: item.color_title }"> {{ item . starts_at }}
            </div>

            <div :style="{ color: item.color_subtitle }">
                diff: {{ item . starts_at }}
            </div>

            <div class="d-flex justify-content-between mt-3">

                <div>
                    <h5 :style="{ color: item.color_title }">
                        ৳{{ item . actual_fee }}.0
                    </h5>
                    <h6>
                        <span :style="{ color: item.color_subtitle }"> ৳{{ item . list_fee }}</span>
                    </h6>

                </div>


                <div>
                    <h5> <span :style="{ color: item.color_title }"> {{ item . duration }}
                            Hours
                        </span> </h5>

                </div>

            </div>



        </div>









    </div>
</template>

<script>
    export default {
        name: "CourseCardItem",
        props: ["item"],
        components: {},
        mounted: function() {
            console.log(this.item.color_title)
        },
        computed: {},
        methods: {

            imageUrl() {
                return this.getApiUrl(this.item.image_url)
            },


        }

    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
