<template>
    <div class="">


        <div class="card mb-4" data-container="body">


            <img class="rounded img-fluid" :src="imageUrl()" alt="Course Thumb">

            <div class="card-body" :style="{ background: item.color_background }">


                <h4 :style="{ color: item.color_title }">
                    {{ item . title }}
                </h4>


                <div class="d-flex justify-content-between mt-3">

                    <div>
                        <h6> Starts at: {{ this . formatDate(item . starts_at) }}</h6>
                    </div>

                    <div>


                        {{ this . momentFromNow(item . starts_at) }}



                    </div>

                </div>



                <div class="d-flex justify-content-between mt-3">

                    <div>

                        <div class="d-flex">
                            <h5 :style="{ color: item.color_title }">
                                ৳{{ item . actual_fee }}.0
                            </h5>
                            &nbsp;
                            <del :style="{ color: item.color_subtitle }"> <strong>৳{{ item . list_fee }}</strong> </del>
                        </div>

                    </div>


                    <div>



                        <h6 :style="{ color: item.color_title }"> {{ item . duration }}
                            Hours
                        </h6>

                    </div>

                </div>



            </div>


            <!-- <router-link class="stretched-link"
                :to="{

                    name: 'courses.show',
                    params: { slug: item.slug }

                }"></router-link> -->

            <div class="card-body d-flex justify-content-between">

                <!-- <a class="btn btn-small btn-danger">
                            Wishlist
                    </a> -->

                <router-link class="btn btn-small btn-info"
                    :to="{

                        name: 'courses.show',
                        params: { slug: item.slug }

                    }">Show</router-link>


                <router-link class="btn btn-small btn-success"
                    v-if="showApplyButton"
                    :to="{

                        name: 'courses.apply',
                        params: { id: item.id }

                    }">Apply
                    now</router-link>

            </div>



        </div>
    </div>
</template>

<script>
    export default {
        name: "CourseCardItem",
        props: ["item"],
        components: {



        },
        mounted: function() {
            this.fetchMyOrder();
        },
        computed: {

        },

        data: function(){
            return {
                showApplyButton: false
            }
        },

        methods: {

            imageUrl() {
                return this.getApiUrl(this.item.image_url)
            },

            fetchMyOrder() {

                let self = this;

                self.$store
                    .dispatch("fetchMyCourseApplication", self.item.id)
                    .then(() => {
                        self.showApplyButton = false;
                    })
                    .catch(() => {
                        self.showApplyButton = true;
                    });

            }

        }

    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
