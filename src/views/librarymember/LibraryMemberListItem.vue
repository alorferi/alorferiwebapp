<template>
    <div>
        <div class="ui-card mb-4">
            <div class="p-5 flex items-center">
                <LibraryMemberPhoto :member="item" size="64" />

                <div class="ml-4">
                    <div>{{ item.member_code }}</div>
                    <h6>{{ item.first_name }} {{ item.surname }} {{ item.nickname }}</h6>
                    <div>Reading: {{ item.total_reading_books }}, Has read: {{ item.total_has_read_books }}</div>
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
