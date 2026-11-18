<template>
    <div>
        <div class="ui-card mb-4 p-2">
            <div class="flex items-center">
                <!-- <LibraryLogo :item ="item" size="72"/> -->

                <img
                    class="social-book-cover"
                    loading="lazy"
                    decoding="async"
                    :src="this.getApiUrl(item.book.cover_url)"
                    :alt="item.book.title"
                />

                <div>
                    <p>
                        {{ item.book_code }}<span v-if="item.shelf_number != null"> /{{ item.shelf_number }} </span>

                        <span v-if="item.box_number != null"> .{{ item.box_number }} </span>
                    </p>

                    <h5>{{ item.book.title }}</h5>

                    <div class="flex">
                        <div v-for="(author, index) in item.book.authors" v-bind:key="index">
                            {{ author.name }}
                            <span v-if="index < item.book.authors.length - 1">|</span>
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
