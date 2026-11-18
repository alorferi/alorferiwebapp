<template>
    <div>
        <div class="ui-card mb-4 p-1">
            <div class="flex items-center">
                <img
                    class="inline-block p-2 rounded-full"
                    loading="lazy"
                    decoding="async"
                    :src="this.getApiUrl(item.library_member.user.photo_url)"
                    style="max-width: 48px; max-height: 48px"
                />

                <div class="p-1">
                    {{ item.library_member.user.first_name }}
                </div>

                <div class="p-1" v-if="isCollected">{{ this.momentFromNow(item.collected_at) }}</div>

                <div class="p-1" v-else>{{ this.momentFromNow(item.issued_at) }}</div>

                <img
                    class="inline-block p-2"
                    loading="lazy"
                    decoding="async"
                    :src="this.getApiUrl(item.library_book.book.cover_url)"
                    style="max-width: 48px; max-height: 48px"
                />

                <div class="p-1">{{ item.library_book.book.title }} (B{{ item.library_book.book_code }})</div>

                <div class="p-1" v-if="isCollected">বইটি ফেরত দিয়েছেন।</div>
                <div class="p-1" v-else>বইটি পড়তে নিয়েছেন।</div>
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
  computed: {
    isCollected() {
      var date = moment(this.item.collected_at);
      return date.isValid();
    }
  },
  methods: {},
  directives: {}
};
</script>
