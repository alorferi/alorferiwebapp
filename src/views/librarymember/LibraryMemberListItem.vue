<template>
    <div>
        <div class="card mb-3 p-2">
            <div class="d-flex">
                <b-img-lazy
                    :src="this.getApiUrl(item.user.photo_url)"
                    class="p-2  rounded-circle"
                />

                <div>
                    <h4>{{ item.user.first_name }}</h4>

                    <p>B{{ item.member_code }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import LibraryLogo from "./LibraryLogo";

export default {
    name: "LibraryMemberListItem",
    props: ["item"],
    components: {
        // LibraryLogo
    },
    methods: {}
};
</script>
