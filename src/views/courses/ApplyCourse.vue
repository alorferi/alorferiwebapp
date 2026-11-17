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

            <div class="-mx-[15px] flex flex-wrap">
                <div
                    class="relative w-full px-[15px] sm:w-1/2 flex flex-col justify-between ui-card"
                    :style="{ background: course.color_background }"
                >
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
                </div>

                <div class="relative w-full px-[15px] sm:w-1/2 p-2 ui-card">
                    <div class="ui-card">
                        <div class="ui-card-footer text-center">
                            <h4>Apply for this course</h4>
                        </div>

                        <div class="p-5">
                            <div>
                                <div>Name</div>
                                <div>{{ activeUser.first_name }} {{ activeUser.surname }}</div>
                            </div>

                            <div>
                                <div>Mobile</div>
                                <div>{{ activeUser.mobile }}</div>
                            </div>

                            <div>
                                <div>E-mail</div>
                                <div>{{ activeUser.email }}</div>
                            </div>
                        </div>

                        <div class="ui-card-footer">
                            <form @submit.prevent="applyNow">
                                <button
                                    type="submit"
                                    class="ui-button ui-button-small ui-button-success"
                                    v-if="showApplyButton"
                                >
                                    {{ $t("apply") }}
                                </button>
                            </form>

                            {{ msg_text }}
                        </div>
                    </div>
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
            this.course_id = this.$route.params.id;
            this.fetchCourse();
        },


        computed: {
            course() {
                return this.$store.getters.course;
            },
            activeUser() {
                return this.$store.getters.activeUser;
            }
        },
        data: function() {
            return {
                loading: true,
                msg_text: "",
                course_id: "",
                showApplyButton: true,

            };
        },
        methods: {
            imageUrl() {
                return this.getApiUrl(this.course.image_url)
            },
            applyNow: function() {
                const self = this;

                var payload = {
                    "course_id": self.course_id
                }

                self.$store
                    .dispatch("applyCourse", payload)
                    .then((response) => {
                        self.msg_text = response.data.message;
                        self.showApplyButton = false

                    })
                    .catch();
            },

            fetchCourse() {
                let self = this;

                self.$store
                    .dispatch("fetchCourse", this.course_id)
                    .then(() => {

                        self.loading = false;

                        self.fetchMyOrder()

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

                        self.msg_text = response.data.message;

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
<style scoped>
</style>
