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
                                        {{ course . starts_at }} </h5>
                                    <div :style="{ color: course.color_subtitle }">
                                        diff {{ course . starts_at }}
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

                <div class="card-footer">

                    <form @submit.prevent="applyNow">


                        <!-- <input type="hidden" name="course_id" value="{{ $course->id }}"/> -->

                            <button type="submit" class="btn btn-small btn-success">
                                {{ $t('apply_now') }}
                            </button>


                    </form>

                </div>
            </div>

        </div>



    </div>

</template>



<script>
    import Loading from "../../components/Loading";


    export default {
        name: "ApplyCourse",

        components: {
            Loading,

        },
        async mounted() {
            this.fetchCourse(this.$route.params.id);
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
                username: "",
            password: "",
            is_error: false,
            error_message: "",

            };
        },
        methods: {
            imageUrl() {
                return this.getApiUrl(this.course.image_url)
            },
            applyNow: function () {
            const self = this;
            this.is_error = false;
            let username = this.username.replace(/^0+/, "");
            let password = this.password;
            self.$store
                .dispatch("applyCourse", {
                    username,
                    password
                })
                .then(() => {

                })
                .catch();
        },

            fetchCourse(course_id) {
                let self = this;

                self.$store
                    .dispatch("fetchCourse", course_id)
                    .then(() => {

                        self.loading = false;

                    })
                    .catch(() => {
                        self.loading = false;
                    });
            },

        }


    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
