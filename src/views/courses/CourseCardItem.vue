<template>
    <article class="ui-card social-course-card">
        <CourseImage :src="item.image_url" :title="item.title" class="rounded-t-2xl rounded-b-none" />
        <div class="social-course-body">
            <h2>
                <router-link :to="{ name: 'courses.show', params: { slug: item.slug } }">{{ item.title }}</router-link>
            </h2>
            <div class="social-course-meta">
                <span v-if="item.duration"
                    ><i class="far fa-clock" aria-hidden="true"></i> {{ item.duration }} {{ $t("social.hours") }}</span
                ><span v-if="item.starts_at">{{ formatDate(item.starts_at) }}</span>
            </div>
            <div v-if="item.actual_fee != null" class="social-course-fee">
                ৳{{ item.actual_fee }}
                <del v-if="item.list_fee > item.actual_fee" class="text-sm text-secondary font-normal"
                    >৳{{ item.list_fee }}</del
                >
            </div>
            <p v-if="msg_text" class="social-course-message">{{ msg_text }}</p>
            <div class="social-course-actions">
                <router-link
                    class="ui-button ui-button-light"
                    :to="{ name: 'courses.show', params: { slug: item.slug } }"
                    >{{ $t("social.viewCourse") }}</router-link
                >
                <button
                    type="button"
                    class="ui-button ui-button-primary"
                    :disabled="isProductAdded"
                    @click="addToCart(item)"
                >
                    {{ $t(isProductAdded ? "social.added" : "social.addCart") }}
                </button>
            </div>
        </div>
    </article>
</template>
<script>
import CourseImage from "./CourseImage";
export default {
    name: "CourseCardItem",
    props: ["item"],
    components: { CourseImage },
    data() {
        return { msg_text: "" };
    },
    computed: {
        isProductAdded() {
            return this.$store.getters.myCart.some((c) => c.id === this.item.id);
        },
    },
    mounted() {
        if (this.$store.getters.isLoggedIn) this.fetchMyOrder();
    },
    methods: {
        async fetchMyOrder() {
            try {
                const r = await this.$store.dispatch("fetchMyCourseOrder", this.item.id);
                this.msg_text = r.data.message || "";
            } catch (error) {
                this.msg_text = "";
            }
        },
        addToCart(item) {
            this.$store.dispatch("addProductToCart", item);
        },
    },
};
</script>
