<template>
    <article class="ui-card social-post">
        <header class="social-post-header">
            <router-link :to="{ name: 'users.show', params: { user_id: post.user.id } }"
                ><UserPhoto :user="post.user" size="40"
            /></router-link>
            <div class="social-post-author">
                <router-link :to="{ name: 'users.show', params: { user_id: post.user.id } }"
                    >{{ post.user.first_name }} {{ post.user.surname }}</router-link
                >
                <template v-if="post.postable_type === 'App\\Models\\Library' && post.postable">
                    ·
                    <router-link :to="{ name: 'library-show', params: { id: post.postable.id } }">{{
                        post.postable.name
                    }}</router-link></template
                >
                <time :datetime="post.created_at">{{ momentFromNow(post.created_at) }}</time>
            </div>
            <UiDropdown trigger-class="ui-button ui-button-link" :label="$t('social.postActions')"
                ><template #trigger><i class="fas fa-ellipsis-h" aria-hidden="true"></i></template>
                <button v-if="isMyPost" type="button" class="ui-menu-item" @click="showEditPostModal = true">
                    {{ $t("social.editPost") }}
                </button>
                <button
                    v-if="isMyPost"
                    type="button"
                    class="ui-menu-item text-danger"
                    :disabled="deleting"
                    @click="deleteUserPost"
                >
                    {{ $t("social.deletePost") }}
                </button>
                <button v-if="!isMyPost" type="button" class="ui-menu-item" @click="showCreateReportModel = true">
                    {{ $t("social.reportPost") }}
                </button>
                <button
                    v-if="!isMyPost"
                    type="button"
                    class="ui-menu-item text-danger"
                    @click="showCreateBlockModel = true"
                >
                    {{ $t("social.blockPost") }}
                </button>
            </UiDropdown>
        </header>
        <div class="social-post-content">
            <h2 v-if="post.title" v-html="post.title"></h2>
            <div
                v-if="post.body"
                :id="'post-body-' + _uid"
                ref="body"
                class="social-post-body"
                :class="{ 'is-collapsed': !expanded }"
                v-html="body"
            ></div>
            <button
                v-if="overflowing || expanded"
                type="button"
                class="social-read-more"
                :aria-expanded="expanded ? 'true' : 'false'"
                :aria-controls="'post-body-' + _uid"
                @click="expanded = !expanded"
            >
                {{ $t(expanded ? "social.seeLess" : "social.seeMore") }}
            </button>
        </div>
        <div v-if="post.image_url" class="social-post-media">
            <img :src="getApiUrl(post.image_url)" :alt="$t('social.discussionImage')" decoding="async" />
        </div>
        <div v-if="getYouTubeEmbedUrl" class="ui-video-frame">
            <iframe
                class="absolute inset-0 h-full w-full"
                :title="$t('social.discussionVideo')"
                :src="getYouTubeEmbedUrl"
                allowfullscreen
            ></iframe>
        </div>
        <p v-if="deleteError" class="social-inline-error" role="alert">{{ $t("social.requestError") }}</p>
        <ShowPostComments :post="post" />
        <CreateReportModal
            :show="showCreateReportModel"
            @updateVisibleState="showCreateReportModel = $event"
            :user="post.user"
            complainable_type="Post"
            :complainable_id="post.id"
        />
        <CreateBlockModal
            :show="showCreateBlockModel"
            @updateVisibleState="showCreateBlockModel = $event"
            :user="post.user"
            blockable_type="Post"
            :blockable_id="post.id"
            @didFinish="didFinishBlockingUser"
        />
        <EditPostModal
            :show="showEditPostModal"
            :post="post"
            @updateVisibleState="showEditPostModal = $event"
            :postable_type="post.postable_type"
        />
    </article>
</template>
<script>
import UserPhoto from "../user/UserPhoto";
import ShowPostComments from "../postcomment/ShowPostComments";
import EditPostModal from "./CreateOrEditPostModal.vue";
import CreateReportModal from "@/views/complain/CreateReportModal.vue";
import CreateBlockModal from "@/views/complain/CreateBlockModal.vue";
export default {
    name: "PostListItem",
    props: ["post"],
    components: { UserPhoto, ShowPostComments, EditPostModal, CreateReportModal, CreateBlockModal },
    data() {
        return {
            showEditPostModal: false,
            showCreateReportModel: false,
            showCreateBlockModel: false,
            expanded: false,
            overflowing: false,
            deleting: false,
            deleteError: false,
        };
    },
    computed: {
        body() {
            return (this.post.body || "").replace(/(?:\r\n|\r|\n)/g, "<br>");
        },
        getYouTubeEmbedUrl() {
            const url = this.extractUrl(this.post.body || "");
            const id = this.extractYouTubeVideoId(url);
            return id ? "https://www.youtube.com/embed/" + id : null;
        },
        isMyPost() {
            return this.post.user.id === this.$store.getters.activeUser.id;
        },
    },
    mounted() {
        this.measure();
        if ("ResizeObserver" in window) {
            this.resizeObserver = new ResizeObserver(this.measure);
            if (this.$refs.body) this.resizeObserver.observe(this.$refs.body);
        } else window.addEventListener("resize", this.measure);
    },
    beforeDestroy() {
        if (this.resizeObserver) this.resizeObserver.disconnect();
        window.removeEventListener("resize", this.measure);
    },
    watch: {
        "post.body"() {
            this.$nextTick(this.measure);
        },
    },
    methods: {
        measure() {
            const e = this.$refs.body;
            if (e && !this.expanded) this.overflowing = e.scrollHeight > e.clientHeight + 1;
        },
        async deleteUserPost() {
            if (this.deleting) return;
            this.deleting = true;
            this.deleteError = false;
            try {
                await this.$store.dispatch("deleteUserPost", this.post);
            } catch (error) {
                this.deleteError = true;
            } finally {
                this.deleting = false;
            }
        },
        didFinishBlockingUser() {
            this.$store.dispatch("removeUserPost", this.post);
        },
    },
};
</script>
