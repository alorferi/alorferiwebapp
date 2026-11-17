<template>
    <div>
        <Loading v-if="loading" />

        <div v-else>
            <router-link
                class="ui-button ui-button-small ui-button-outline-success mb-2"
                :to="{ name: 'courses.index' }"
            >
                &lt; Back
            </router-link>

            <div class="ui-card">
                <div class="ui-card-header" :style="{ background: course.color_background }">
                    <div class="-mx-[15px] flex flex-wrap">
                        <div class="relative w-full px-[15px] sm:w-1/2 p-2">
                            <img class="rounded h-auto max-w-full" :src="imageUrl()" alt="Course Thumb" width="100%" />
                        </div>
                        <div class="relative w-full px-[15px] sm:w-1/2 flex flex-col justify-between">
                            <div>
                                <div class="flex justify-between items-center">
                                    <div>
                                        <span class="bg-danger text-white pt-1 pb-1 pl-4 pr-4"> Live</span>
                                    </div>

                                    &nbsp;
                                    <span class="circle-md" v-if="course.discount > 0"> -{{ course.discount }}% </span>
                                </div>

                                <div :style="{ color: course.color_title }">
                                    <h5>{{ course.pre_title }}</h5>

                                    <h2>{{ course.title }}</h2>
                                    <p :style="{ color: course.color_subtitle }">{{ course.post_title }}</p>
                                </div>
                            </div>

                            <div class="-mx-[15px] flex flex-wrap">
                                <div class="relative w-full px-[15px] sm:w-1/2">
                                    <h5 :style="{ color: course.color_subtitle }">Date</h5>

                                    <h5 :style="{ color: course.color_title }">
                                        {{ this.formatDate(course.starts_at) }}
                                    </h5>
                                    <div :style="{ color: course.color_subtitle }">
                                        {{ this.momentFromNow(course.starts_at) }}
                                    </div>
                                </div>
                                <div class="relative w-full px-[15px] sm:w-1/2">
                                    <h5 :style="{ color: course.color_subtitle }">Time</h5>

                                    <h5 :style="{ color: course.color_title }">{{ course.days_and_time }}</h5>
                                </div>
                            </div>

                            <div>
                                <div class="-mx-[15px] flex flex-wrap">
                                    <div class="relative w-full px-[15px] md:w-1/2">
                                        <h3>
                                            <span :style="{ color: course.color_title }">
                                                ৳{{ course.actual_fee }}.0
                                            </span>
                                        </h3>
                                        <h5 v-if="course.discount > 0">
                                            &nbsp;
                                            <span :style="{ color: course.color_subtitle }">
                                                ৳{{ course.list_fee }}</span
                                            >
                                        </h5>
                                    </div>
                                    <div class="relative w-full px-[15px] md:w-1/2">
                                        <h3>
                                            <span :style="{ color: course.color_title }">
                                                {{ course.duration }}
                                                Hours
                                            </span>
                                        </h3>
                                    </div>
                                </div>

                                <p :style="{ color: course.color_title }">
                                    Link will be sent to your mail before the session.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="p-5">
                    <p>
                        {{ course.intro }}
                    </p>

                    <h4>What you'll learn</h4>
                    <p>
                        {{ course.career_opportunities }}
                    </p>

                    <h5>Course Outline:</h5>
                    <p>
                        <!-- {{ str_replace("\n", '<br/>', course . outline) }} -->
                    </p>

                    <h4>Educators:</h4>

                    <ul></ul>

                    <p class="mb-4">Last date of application: {{}}</p>
                </div>

                <div class="ui-card-footer flex justify-between">
                    <router-link
                        class="ui-button ui-button-small ui-button-success"
                        v-if="showApplyButton"
                        :to="{
                            name: 'courses.apply',
                            params: { id: course.id },
                        }"
                        >Apply now</router-link
                    >

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
