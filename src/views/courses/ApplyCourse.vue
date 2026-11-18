<template>
    <section>
        <router-link class="ui-button ui-button-link mb-4" :to="{ name: 'courses.index' }"
            >← {{ $t("social.courses") }}</router-link
        >
        <Loading v-if="loading" />
        <div v-else-if="error" class="ui-empty-state">
            <p role="alert">{{ $t("social.requestError") }}</p>
            <button class="ui-button ui-button-outline-primary" type="button" @click="load">
                {{ $t("social.retry") }}
            </button>
        </div>
        <div v-else-if="course" class="social-apply-grid">
            <article class="ui-card overflow-hidden">
                <CourseImage :src="course.image_url" :title="course.title" />
                <div class="p-5">
                    <h2 class="text-2xl font-semibold">{{ course.title }}</h2>
                    <p class="text-secondary">{{ course.post_title }}</p>
                    <div class="social-course-meta">
                        <span v-if="course.starts_at">{{ formatDate(course.starts_at) }}</span
                        ><span>{{ course.days_and_time }}</span>
                    </div>
                    <div v-if="course.actual_fee != null" class="social-course-fee mt-4">৳{{ course.actual_fee }}</div>
                </div>
            </article>
            <section class="ui-card social-detail-card">
                <h2 class="text-2xl font-semibold">{{ $t("social.applyTitle") }}</h2>
                <p class="text-sm text-secondary">{{ $t("social.applyDescription") }}</p>
                <dl class="social-application-person">
                    <dt>{{ $t("social.name") }}</dt>
                    <dd>{{ activeUser.first_name }} {{ activeUser.surname }}</dd>
                    <template v-if="activeUser.mobile"
                        ><dt>{{ $t("social.mobile") }}</dt>
                        <dd>{{ activeUser.mobile }}</dd></template
                    ><template v-if="activeUser.email"
                        ><dt>{{ $t("social.email") }}</dt>
                        <dd>{{ activeUser.email }}</dd></template
                    >
                </dl>
                <form v-if="!applied" @submit.prevent="applyNow">
                    <button type="submit" class="ui-button ui-button-primary w-full" :disabled="submitting">
                        {{ submitting ? $t("social.sending") : $t("apply") }}
                    </button>
                </form>
                <p
                    v-if="message"
                    class="mt-4 mb-0"
                    :class="failed ? 'text-danger' : 'text-primary'"
                    :role="failed ? 'alert' : 'status'"
                >
                    {{ message }}
                </p>
            </section>
        </div>
    </section>
</template>
<script>
import CourseImage from "./CourseImage";
import Loading from "@/components/Loading";
import { requestErrorMessage } from "@/components/ui/requestError";
export default {
    name: "ApplyCourse",
    components: { CourseImage, Loading },
    data() {
        return { loading: true, error: false, submitting: false, applied: false, message: "", failed: false };
    },
    computed: {
        course() {
            return this.$store.getters.course;
        },
        activeUser() {
            return this.$store.getters.activeUser;
        },
    },
    mounted() {
        this.load();
    },
    methods: {
        async load() {
            this.loading = true;
            this.error = false;
            try {
                await this.$store.dispatch("fetchCourse", this.$route.params.id);
            } catch (error) {
                this.error = true;
            } finally {
                this.loading = false;
            }
        },
        async applyNow() {
            if (this.submitting || this.applied) return;
            this.submitting = true;
            this.failed = false;
            this.message = "";
            try {
                const r = await this.$store.dispatch("applyCourse", { course_id: this.$route.params.id });
                this.message = r.data.message;
                this.applied = true;
            } catch (error) {
                this.failed = true;
                this.message = requestErrorMessage(error, this.$store.getters.activeLanguage);
            } finally {
                this.submitting = false;
            }
        },
    },
};
</script>
