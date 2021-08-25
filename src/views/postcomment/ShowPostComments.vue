<template>
    <div>
        <div class="media p-3">
            <UserPhoto
                :user="post.user"
                size="24"
                class="mr-3 mt-3"
            ></UserPhoto>
            <div class="media-body">
                <h6>
                    {{ post.user.first_name }} {{ post.user.surname }}
                    <small
                        ><i class="text-text-secondary">
                            {{ this.momentFromNow(post.created_at) }}</i
                        ></small
                    >
                </h6>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                </p>
            </div>
        </div>

        <CreatePostComment :post="post" />
    </div>
</template>

<script>
import UserPhoto from "../user/UserPhoto";
import CreatePostComment from "../postcomment/CreatePostComment";

export default {
    name: "ShowPostComments",
    props: ["post"],
    components: { UserPhoto, CreatePostComment },
    data() {
        return {};
    },
    computed: {},

    methods: {}
};
</script>
