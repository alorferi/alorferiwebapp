<template>
    <div>
        <Loading v-if="is_loading"></Loading>



        <div class="row mb-4" >
            <div v-for="course in courses" v-bind:key="course.id" class="col-sm-4" >
                <CourseCardItem :item="course" />
            </div>
        </div>



        <p v-if="!is_loading && courses.length < 1" class="text-center">
            No Courses found.
        </p>

        <Loading v-if="scrolledToBottom" class="border mt-3"></Loading>
    </div>
</template>

<script>
    // import PostListItem from "@/views/post/PostListItem";
    import CourseCardItem from "@/views/courses/CourseCardItem";
    import Loading from "@/components/Loading";

    export default {
        name: "ShowCourses",
        computed: {
            courses() {
                return this.$store.getters.coursesResponse == null ? [] : this.$store.getters.coursesResponse.data;
            }
        },
        components: {
            Loading,
            CourseCardItem
        },
        data: () => {
            return {
                is_loading: true,
                scrolledToBottom: false,
            };
        },
        async mounted() {
            this.fetchCoursesAction();
            this.scroll();
        },

        methods: {
            fetchCoursesAction() {
                this.$store
                    .dispatch("fetchCourses")
                    .then((
                        respose
                    ) => {
                        console.log(respose)
                    })
                    .catch(() => {})
                    .finally(() => {
                        this.is_loading = false;
                        this.scrolledToBottom = false;
                    });
            },

            scroll() {
                window.onscroll = () => {
                    let bottomOfWindow =
                        Math.max(
                            window.pageYOffset,
                            document.documentElement.scrollTop,
                            document.body.scrollTop
                        ) +
                        window.innerHeight ===
                        document.documentElement.offsetHeight;

                    if (bottomOfWindow) {
                        this.scrolledToBottom = true; // replace it with your code
                        this.fetchCoursesAction();
                    }
                };
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
