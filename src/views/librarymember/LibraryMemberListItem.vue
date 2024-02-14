<template>
    <div>
        <div class="card mb-3">
            <div class=" card-body d-flex align-items-center ">
                <!-- <b-img-lazy
                    :src="this.getApiUrl(item.user.photo_url)"
                    class="p-2  rounded-circle"
                /> -->

            <LibraryMemberPhoto :member="item" size="64" />

                <div class="ml-3">
                    <div>{{ item.member_code }}</div>
                    <h6>{{ item.first_name }} {{ item.surname }} {{ item.nickname }} </h6>
                    <div> Reading: {{item.total_reading_books}},  Has read: {{item.total_has_read_books}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import LibraryLogo from "./LibraryLogo";
import LibraryMemberPhoto from "../librarymember/LibraryMemberPhoto"

export default {
    name: "LibraryMemberListItem",
    props: ["item"],
    components: {
        LibraryMemberPhoto
    },
    methods: {}
};
</script>
