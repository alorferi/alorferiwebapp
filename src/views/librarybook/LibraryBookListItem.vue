<template>
    <div>
        <div class="card mb-3 p-2">
            <div class="d-flex align-items-center">
                <!-- <LibraryLogo :item ="item" size="72"/> -->

                <b-img-lazy
                    :src="this.getApiUrl(item.book.cover_url)"
                    class="p-2"
                />

                <div>
                    <h5>{{ item.book.title }}</h5>

                    <div class="d-flex">
                        <div
                            v-for="(author, index) in item.book.authors"
                            v-bind:key="index"
                        >
                            {{ author.name }}
                            <span v-if="index < item.book.authors - 1">|</span>
                        </div>
                    </div>

                    <p>
                        B{{ item.book_code }} - SF{{ item.shelf_number }} - BX{{
                            item.box_number
                        }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import LibraryLogo from "./LibraryLogo";

export default {
    name: "LibraryBookIssueTimelineItem",
    props: ["item"],
    components: {
        // LibraryLogo
    },
    methods: {
        coverUrl() {
            return this.getApiUrl(this.item.book.cover_url);
        }
    }
};
</script>
