<template>
    <div>
        <div class="card mb-3 p-3">
            <div class="d-flex">

                <!-- <LibraryLogo :libraryBook ="libraryBook" size="72"/> -->

                <div>
                    <h4>{{ libraryBook.book.title }}</h4>

                    <p>{{ libraryBook.book_code }}</p>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import LibraryLogo from "./LibraryLogo";

export default {
    name: "LibraryBookListItem",
    props: ["libraryBook"],
    components: {
        // LibraryLogo
    },
    methods: {

        coverUrl(){
                return this.getApiUrl(this.libraryBook.book.cover_url)
        }

    }
};
</script>
