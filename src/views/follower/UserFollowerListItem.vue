<template>
    <div class="media  p-2">
        <div
            class="media-body  border border-left-0 border-right-0 border-top-0"
        >
            <div class="d-flex d-flex justify-content-between">
                <h6>
                    <UserPhoto
                        :user="user"
                        size="24"
                        class="mr-3 mt-3"
                    ></UserPhoto>
                    {{ user.first_name }} {{ user.surname }}
                </h6>
            </div>
        </div>
    </div>
</template>

<script>
import UserPhoto from "@/views/user/UserPhoto";

export default {
    name: "UserFollowerListItem",
    props: ["user"],
    components: { UserPhoto },
    data() {
        return {
            body: "",
            bodyState: null
        };
    },
    methods: {},
    computed: {
    }
};
</script>
