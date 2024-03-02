<template>


    <div>

        <Loading v-if="loading" />


        <div v-else>



            <router-link class="btn btn-sm btn-outline-success mb-2" :to="{ name: 'courses.index' }"> &lt; Back
            </router-link>

            <div class="card">


                <div class="card-header" :style="{ background: course.color_background }">

                    <div class="row">

                        <div class="col-sm-6 p-2">

                            <img class="rounded img-fluid" :src="imageUrl()" alt="Course Thumb" width="100%" />
                        </div>
                        <div class="col-sm-6 d-flex flex-column justify-content-between">


                            <div>


                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <span class="bg-danger text-white  pt-1 pb-1  pl-3 pr-3"> Live</span>
                                    </div>



                                    &nbsp;
                                    <span class="circle-md" v-if="course.discount > 0">
                                        -{{ course . discount }}%
                                    </span>


                                </div>


                                <div :style="{ color: course.color_title }">

                                    <h5> {{ course . pre_title }}</h5>

                                    <h2> {{ course . title }}</h2>
                                    <p :style="{ color: course.color_subtitle }"> {{ course . post_title }}</p>

                                </div>



                            </div>


                            <div class="row">

                                <div class="col-sm-6">
                                    <h5 :style="{ color: course.color_subtitle }"> Date </h5>

                                    <h5 :style="{ color: course.color_title }">
                                        {{ this . formatDate(course . starts_at) }} </h5>
                                    <div :style="{ color: course.color_subtitle }">
                                        {{ this . momentFromNow(course . starts_at) }}
                                    </div>
                                </div>
                                <div class="col-sm-6">

                                    <h5 :style="{ color: course.color_subtitle }">Time</h5>

                                    <h5 :style="{ color: course.color_title }"> {{ course . days_and_time }} </h5>

                                </div>

                            </div>



                            <div>






                                <div class="row">


                                    <div class="col-md-6">


                                        <h3>
                                            <span :style="{ color: course.color_title }">
                                                ৳{{ course . actual_fee }}.0

                                            </span>



                                        </h3>
                                        <h5 v-if="course . discount > 0">

                                            &nbsp; <span :style="{ color: course.color_subtitle }">
                                                ৳{{ course . list_fee }}</span>

                                        </h5>
                                    </div>
                                    <div class="col-md-6">
                                        <h3> <span :style="{ color: course.color_title }"> {{ course . duration }}
                                                Hours
                                            </span> </h3>
                                    </div>



                                </div>




                                <p :style="{ color: course.color_title }">
                                    Link will be sent to your mail before the session.

                                </p>



                            </div>






                        </div>

                    </div>

                </div>



                <div class="card-body">


                    <p>
                        {{ course . intro }}
                    </p>

                    <h4>What you'll learn</h4>
                    <p>
                        {{ course . career_opportunities }}
                    </p>

                    <h5> Course Outline: </h5>
                    <p>
                        <!-- {{ str_replace("\n", '<br/>', course . outline) }} -->
                    </p>


                    <h4> Educators: </h4>

                    <ul>

                    </ul>

                    <p class="card-text"> Last date of application: {{ }}
                    </p>



                </div>

                <div class="card-footer d-flex justify-content-between">

                    <router-link class="btn btn-small btn-success" v-if="showApplyButton"
                        :to="{

                            name: 'courses.apply',
                            params: { id: course.id }

                        }">Apply
                        now</router-link>

                        <div>{{ msg_text }}</div>

                </div>
            </div>

        </div>



    </div>

</template>



<script>
    import Loading from "../../components/Loading";


    export default {
        name: "ShowCourse",

        components: {
            Loading,

        },
        async mounted() {
            this.fetchCourse(this.$route.params.slug);
        },


        computed: {
            course() {
                return this.$store.getters.course;
            }
        },
        data: function() {
            return {
                loading: true,
                delete_modal: false,
                showApplyButton: false,
                msg_text: ""
            };
        },
        methods: {
            imageUrl() {
                return this.getApiUrl(this.course.image_url)
            },

            fetchCourse(slug) {
                let self = this;

                self.$store
                    .dispatch("fetchCourseBySlug", slug)
                    .then(() => {

                        self.loading = false;
                        self.fetchMyOrder();

                    })
                    .catch(() => {
                        self.loading = false;
                    });
            },
            fetchMyOrder() {

                let self = this;

                self.$store
                    .dispatch("fetchMyCourseOrder", self.course.id)
                    .then((response) => {

                        self.showApplyButton = false;
                        self.msg_text = response.data.message;
                    })
                    .catch(() => {
                        self.showApplyButton = true;
                    });

            }

        }


    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
