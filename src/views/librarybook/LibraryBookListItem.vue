<template>
    <div>
        <div class="card mb-3 p-2">
            <div class="d-flex">

                <!-- <LibraryLogo :libraryBook ="libraryBook" size="72"/> -->

                   <b-img
            :src="this.getApiUrl(libraryBook.book.cover_url)"
            :style="imgStyle"
            class="p-2"
        />

                <div>
                    <h4>{{ libraryBook.book.title }}</h4>

                    <p>B{{ libraryBook.book_code }} - SF{{ libraryBook.shelf_number }} - BX{{ libraryBook.box_number }}</p>

                                <div class="d-flex">
                                    <div v-for="(author,index) in libraryBook.book.authors" v-bind:key="index">  {{author.name}} <span v-if="inxex < libraryBook.book.authors-1 " >|</span>   </div>
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
