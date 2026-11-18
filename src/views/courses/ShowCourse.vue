<template>
    <section>
        <router-link class="ui-button ui-button-link mb-4" :to="{ name: 'courses.index' }"
            >← {{ $t("social.courses") }}</router-link
        >
        <Loading v-if="loading" />
        <div v-else-if="error" class="ui-empty-state">
            <p role="alert">{{ $t("social.requestError") }}</p>
            <button type="button" class="ui-button ui-button-outline-primary" @click="load">
                {{ $t("social.retry") }}
            </button>
        </div>
        <article v-else-if="course" class="ui-card social-course-detail">
            <header class="ui-card-header social-course-hero" :style="{ background: course.color_background }">
                <CourseImage :src="course.image_url" :title="course.title" />
                <div>
                    <p v-if="course.pre_title" class="social-eyebrow" :style="{ color: course.color_subtitle }">
                        {{ course.pre_title }}
                    </p>
                    <h1 :style="{ color: course.color_title }">{{ course.title }}</h1>
                    <p v-if="course.post_title" :style="{ color: course.color_subtitle }">{{ course.post_title }}</p>
                    <div class="social-course-meta">
                        <span v-if="course.duration">{{ course.duration }} {{ $t("social.hours") }}</span
                        ><span v-if="course.starts_at">{{ formatDate(course.starts_at) }}</span>
                    </div>
                    <p v-if="course.days_and_time" class="mt-3 mb-0">{{ course.days_and_time }}</p>
                </div>
            </header>
            <div class="social-course-detail-body">
                <div>
                    <section v-for="field in sections" :key="field.key" class="mb-6">
                        <h2 class="text-xl font-semibold">{{ $t("social." + field.label) }}</h2>
                        <div class="social-course-copy text-secondary" v-html="course[field.key]"></div>
                    </section>
                </div>
                <aside class="social-course-application ui-card p-5">
                    <span class="social-eyebrow">{{ $t("social.courses") }}</span>
                    <div v-if="course.actual_fee != null" class="social-course-fee mb-4">৳{{ course.actual_fee }}</div>
                    <router-link
                        v-if="canApply"
                        class="ui-button ui-button-primary"
                        :to="{ name: 'courses.apply', params: { id: course.id } }"
                        >{{ $t("apply") }}</router-link
                    >
                    <p v-if="orderMessage" role="status" class="text-sm text-secondary mb-0 mt-3">{{ orderMessage }}</p>
                    <button v-if="orderError" class="social-read-more" type="button" @click="loadOrder">
                        {{ $t("social.retry") }}
                    </button>
                </aside>
            </div>
        </article>
    </section>
</template>
<script>
import CourseImage from "./CourseImage";
import Loading from "@/components/Loading";
export default {
  name: "ShowCourse",
  components: {
    CourseImage,
    Loading
  },
  data() {
    return {
      loading: true,
      error: false,
      canApply: false,
      orderMessage: "",
      orderError: false
    };
  },
  computed: {
    course() {
      return this.$stores.course.course;
    },
    sections() {
      return [{
        key: "intro",
        label: "aboutCourse"
      }, {
        key: "for_whom",
        label: "forWhom"
      }, {
        key: "prerequisites",
        label: "prerequisites"
      }, {
        key: "outline",
        label: "outline"
      }, {
        key: "career_opportunities",
        label: "learn"
      }].filter(f => this.course && this.course[f.key]);
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      this.loading = true;
      this.error = false;
      try {
        await this.$stores.course.fetchCourseBySlug(this.$route.params.slug);
        await this.loadOrder();
      } catch (error) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
    async loadOrder() {
      this.orderError = false;
      this.canApply = false;
      try {
        const r = await this.$stores.courseOrder.fetchMyCourseOrder(this.course.id);
        this.orderMessage = r.data.message || "";
      } catch (error) {
        if (error.response && error.response.status === 404) this.canApply = true;else {
          this.orderError = true;
          this.orderMessage = this.$t("social.requestError");
        }
      }
    }
  }
};
</script>
