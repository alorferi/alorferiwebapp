<template>
    <div>
        <div class="card mb-3 p-2">
            <div class="d-flex">

                <div class="p-2" v-if=" isCollected ">{{this.dateshow(item.collected_at)}} </div>

                <div class="p-2" v-else>{{this.dateshow(item.issued_at)}} </div>

                <b-img-lazy
                    :src="this.getApiUrl(item.library_member.user.photo_url)"
                    class="p-2"
                   style=" max-width:50px;max-height:50px;"
                />

               <div class="p-2">
                    {{ item.library_member.user.first_name }}
                </div>


                <b-img-lazy
                    :src="this.getApiUrl(item.library_book.book.cover_url)"
                    class="p-2"
                     style=" max-width:50px;max-height:50px;"
                />

               <div class="p-2">
                 {{ item.library_book.book.title }}  (B{{ item.library_book.book_code }})

                </div>

                <div class="p-2"  v-if=" isCollected ">
                    বইটি ফেরত দিয়েছেন।
                </div>
                <div class="p-2"  v-else>
                    বইটি পড়তে নিয়েছেন।
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import LibraryLogo from "./LibraryLogo";
import moment from "moment";

export default {
    name: "LibraryBookListItem",
    props: ["item"],
    components: {
        // LibraryLogo
    },
    computed:{
        isCollected(){
            var date = moment(this.item.collected_at);
          return  date.isValid()
        }
    },
    methods: {
           dateshow: function(value) {
            var date = moment(value).fromNow(); // here u modify data


           return date;
        }
    },
    directives: {

    }
};
</script>
