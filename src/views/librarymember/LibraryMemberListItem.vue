<template>
    <div>
        <div class="card mb-3 p-2">
            <div class="d-flex align-items-center ">
                <!-- <b-img-lazy
                    :src="this.getApiUrl(item.user.photo_url)"
                    class="p-2  rounded-circle"
                /> -->

            <UserPhoto :user="item.user" size="64" />

                <div class="p-2 ">
                    <h6>{{ item.user.first_name }} {{ item.user.surname }} {{ item.user.nickname }} </h6>

                    <div>M{{ item.member_code }}</div>

                    <div>{{ this.formatDate(item.member_from) }} ~ {{ this.formatDate(item.member_to) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import LibraryLogo from "./LibraryLogo";
import UserPhoto from "../user/UserPhoto"

export default {
    name: "LibraryMemberListItem",
    props: ["item"],
    components: {
         UserPhoto
    },
    methods: {}
};
</script>
