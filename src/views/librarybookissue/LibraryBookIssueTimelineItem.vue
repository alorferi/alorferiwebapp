<template>
    <div>
        <div class="card mb-3 p-1 ">
            <div class="d-flex align-items-center">



                <b-img-lazy
                    :src="this.getApiUrl(item.library_member.user.photo_url)"
                    class="p-2 rounded-circle"
                   style=" max-width:48px;max-height:48px;"
                />

               <div class="p-1 ">
                    {{ item.library_member.user.first_name }}
                </div>

  <div class="p-1 " v-if=" isCollected ">{{this.momentFromNow(item.collected_at)}} </div>

                <div class="p-1 " v-else>{{this.momentFromNow(item.issued_at)}} </div>

                <b-img-lazy
                    :src="this.getApiUrl(item.library_book.book.cover_url)"
                    class="p-2"
                     style=" max-width:48px;max-height:48px;"
                />

               <div class="p-1 ">
                 {{ item.library_book.book.title }}  (B{{ item.library_book.book_code }})

                </div>

                <div class="p-1 "  v-if=" isCollected ">
                    বইটি ফেরত দিয়েছেন।
                </div>
                <div class="p-1 "  v-else>
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

    },

    directives: {

    }
};
</script>
