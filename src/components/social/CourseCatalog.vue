<template>
    <section :aria-busy="loading ? 'true' : 'false'">
        <PageHeading
            v-if="!$store.getters.isLoggedIn"
            :title="$t('social.courses')"
            :description="$t('social.coursesDescription')"
        />
        <Loading v-if="loading" />
        <div v-else-if="error" class="ui-empty-state">
            <p role="alert" class="text-danger">{{ $t("social.requestError") }}</p>
            <button class="ui-button ui-button-outline-primary" type="button" @click="load">
                {{ $t("social.retry") }}
            </button>
        </div>
        <template v-else
            ><div v-if="courses.length" class="social-course-grid">
                <CourseCardItem v-for="course in courses" :key="course.id" :item="course" />
            </div>
            <p v-else class="ui-empty-state">{{ $t("social.noCourses") }}</p>
            <Paginator :meta="response && response.meta" @update:page="changePage"
        /></template>
    </section>
</template>
<script>
import CourseCardItem from "@/views/courses/CourseCardItem";
import Loading from "@/components/Loading";
import Paginator from "@/components/Paginator";
import PageHeading from "./PageHeading";
export default {
    name: "CourseCatalog",
    components: { CourseCardItem, Loading, Paginator, PageHeading },
    props: { mine: Boolean },
    data() {
        return { loading: true, error: false, response: null, page: 1, request: 0 };
    },
    computed: {
        courses() {
            return (this.response && this.response.data) || [];
        },
    },
    mounted() {
        this.load();
    },
    beforeDestroy() {
        this.request++;
    },
    methods: {
        changePage(page) {
            this.page = page;
            this.load();
        },
        async load() {
            const request = ++this.request;
            this.loading = true;
            this.error = false;
            try {
                const r = await this.$store.dispatch(this.mine ? "fetchMyCourseOrders" : "fetchCourses", {
                    term: null,
                    page: this.page,
                });
                if (request === this.request) this.response = r.data;
            } catch (error) {
                if (request === this.request) this.error = true;
            } finally {
                if (request === this.request) this.loading = false;
            }
        },
    },
};
</script>
