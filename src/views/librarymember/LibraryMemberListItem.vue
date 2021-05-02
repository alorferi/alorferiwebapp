<template>
    <div>
        <div class="card mb-3 p-2">
            <div class="d-flex">
                <b-img
                    :src="this.getApiUrl(libraryMember.user.photo_url)"
                    class="p-2  rounded-circle"
                />

                <div>
                    <h4>{{ libraryMember.user.first_name }}</h4>

                    <p>B{{ libraryMember.member_code }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import LibraryLogo from "./LibraryLogo";

export default {
    name: "LibraryMemberListItem",
    props: ["libraryMember"],
    components: {
        // LibraryLogo
    },
    methods: {}
};
</script>
