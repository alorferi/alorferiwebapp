<template>
    <div>
        <b-modal ref="modal" title="Likes" v-model="showLocal" ok-only centered>
            <Loading v-if="is_loading"></Loading>

            <LikeListItem
                v-else
                v-for="like in likes"
                :like="like.attributes"
                :post="post"
                v-bind:key="like.attributes.id"
            />

            <div class=" text-right">Total: {{ totalLikes }}</div>
        </b-modal>
    </div>
</template>

<script>
import LikeListItem from "@/views/postlike/LikeListItem";
import Loading from "@/components/Loading";

export default {
    name: "PostLikesModal",
    props: ["post", "show"],
    components: { LikeListItem, Loading },
    data() {
        return {
            is_loading: false
        };
    },
    computed: {
        showLocal: {
            get: function() {
                return this.show;
            },
            set: function(value) {
                this.$emit("updateVisibleState", value);
            }
        },

        totalLikes() {
            return this.post.likes_data == null ? 0 : this.post.likes_data.meta.total;
        },

        likes() {
            return this.post.likes_data == null ? [] : this.post.likes_data.data;
        },
        myLike() {
            return this.post.my_like;
        }
    },
    mounted() {},

    methods: {}
};
</script>
