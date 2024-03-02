<template>
    <div>
        <Loading v-if="is_loading"></Loading>


        <Paginator
                :meta="meta"
                @update:page="page = $event"
            />


        <div class="row mb-4" >
            <div v-for="course in courses" v-bind:key="course.id" class="col-sm-4" >
                <CourseCardItem :item="course" />
            </div>
        </div>

        <Paginator
                :meta="meta"
                @update:page="page = $event"
            />


        <p v-if="!is_loading && courses.length < 1" class="text-center">
            No Courses found.
        </p>



    </div>
</template>

<script>
    // import PostListItem from "@/views/post/PostListItem";
    import CourseCardItem from "@/views/courses/CourseCardItem";
    import Loading from "@/components/Loading";
    import Paginator from "../../components/Paginator";

    export default {
        name: "MyCourses",
        computed: {
            courses() {
                return this.$store.getters.coursesResponse == null ? [] : this.$store.getters.coursesResponse.data;
            },

            meta() {
            return this.$store.getters.coursesResponse == null
                ? null
                : this.$store.getters.coursesResponse.meta;
        }
        },
        components: {
            Loading,
            CourseCardItem,
            Paginator
        },
        data: () => {
            return {
                is_loading: true,

                term: null,
            page: null,
            };
        },
        async mounted() {
            this.fetchCoursesAction();

        },

        methods: {
            fetchCoursesAction(pTerm = null, pPage = null) {
                var payload = {
                term: pTerm,
                page: pPage,
            };

                this.$store
                    .dispatch("fetchMyCourseOrders",payload)
                    .then((

                    ) => {
                        // console.log(respose)
                    })
                    .catch(() => {})
                    .finally(() => {
                        this.is_loading = false;

                    });
            },


        },
        watch: {
        page: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal != oldVal) {
                    this.fetchCoursesAction(this.term, this.page);
                }
            }
        },

        term: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal != oldVal) {
                    this.fetchCoursesAction(this.term, this.page);
                }
            }
        }
    }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
