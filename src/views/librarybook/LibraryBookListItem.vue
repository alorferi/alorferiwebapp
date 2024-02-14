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
                    <p>
                        {{ item.book_code }}<span v-if="item.shelf_number != null">
                            /{{ item.shelf_number }}
                        </span>

                        <span v-if="item.box_number != null">
                            .{{ item.box_number }}
                        </span>
                    </p>

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
