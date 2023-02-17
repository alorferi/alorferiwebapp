<template>
    <div>
        <b-modal
            ref="modal"
            :title="titleTotalFollowings"
            v-model="showLocal"
            ok-only
            centered
            @show="showModal"
            @hidden="hideModal"
            ok-title="OK"
            @ok="handleOk"
        >
            <Loading v-if="is_loading"></Loading>
            <UserFollowerListItem
                v-else
                v-for="follower in followings"
                :user="follower.attributes.followable"
                v-bind:key="follower.attributes.id"
            />

        </b-modal>
    </div>
</template>

<script>
import UserFollowerListItem from "@/views/follower/UserFollowerListItem";
import Loading from "@/components/Loading";

export default {
    name: "UserFollowingModal",
    props: ["user", "show"],
    components: {
        UserFollowerListItem,
        Loading
    },
    data() {
        return {
            is_loading: false,
            scrolledToBottom: false
        };
    },
    computed: {
        followings() {
            return this.$store.getters.followingsResponse.data;
        },
        showLocal: {
            get: function() {
                return this.show;
            },
            set: function(value) {
                this.$emit("updateVisibleState", value);
            }
        },

        totalFollowings() {

            if(this.$store.getters.followingsResponse.meta){
                return this.$store.getters.followingsResponse.meta.total;
            }else{
                return 0;
            }

        },

        titleTotalFollowings() {
            return (
                "Following (" +
                this.totalFollowings +
                ")"
            );
        },

        myLike() {
            return this.user.my_like;
        }
    },
    async mounted() {},

    methods: {
        handleOk() {},
        showModal() {
            // this.fetchFollowerFeedAction();
        },
        hideModal() {},
        fetchFollowerFeedAction() {
            const self = this;
            self.is_loading = true;
            this.$store
                .dispatch("fetchUserFollowings", { user_id: this.user.id })
                .then(() => {})
                .catch(() => {})
                .finally(() => {
                    this.is_loading = false;
                    this.scrolledToBottom = false;
                });
        }
    }
};
</script>
