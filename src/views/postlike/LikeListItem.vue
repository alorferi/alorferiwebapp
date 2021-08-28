<template>
    <div class="media  p-2">


        <div
            class="media-body  border border-left-0 border-right-0 border-top-0"
        >
            <div class="d-flex d-flex justify-content-between">
                <h6>
                    <UserPhoto :user="like.user" size="24" class="mr-3 mt-3"></UserPhoto>  {{ like.user.first_name }} {{ like.user.surname }}
                </h6>

                <div v-html="like.emoji_html_code">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserPhoto from "../user/UserPhoto";

export default {
    name: "likeListItem",
    props: ["like", "post"],
    components: { UserPhoto },
    data() {
        return {
            body: "",
            bodyState: null
        };
    },
    methods: {},
    computed: {
        isMylike() {
            return this.like.user.id == this.$store.getters.activeUser.id;
        }
    }
};
</script>
