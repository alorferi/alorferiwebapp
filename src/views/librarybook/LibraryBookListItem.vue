<template>
    <div>
        <div class="card mb-3 p-2">
            <div class="d-flex">
                <!-- <LibraryLogo :item ="item" size="72"/> -->

                <b-img
                    :src="this.getApiUrl(item.book.cover_url)"
                    :style="imgStyle"
                    class="p-2"
                />

                <div>
                    <h4>{{ item.book.title }}</h4>

                    <p>
                        B{{ item.book_code }} - SF{{ item.shelf_number }} - BX{{
                            item.box_number
                        }}
                    </p>

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
    name: "LibraryBookListItem",
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
