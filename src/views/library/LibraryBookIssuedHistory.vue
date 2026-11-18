<template>
    <div class="pt-2">
        <Loading v-if="show_loading"></Loading>
        <div v-else>
            <WrapperListView
                :dataWrapperList="dataWrappers"
                :listItemComponent="listItemComponent"
            />
        </div>
    </div>
</template>

<script>
import { markRaw } from "vue";
import LibraryBookIssueTimelineItem from "../librarybookissue/LibraryBookIssueTimelineItem";
import WrapperListView from "../../components/WrapperListView";
import Loading from "../../components/Loading";
export default {
  name: "LibraryBookIssuedHistory",
  props: ["library"],
  components: {
    Loading,
    WrapperListView
  },
  async mounted() {
    this.fetchLibraryBookIssues();
  },
  data: function () {
    return {
      show_loading: true,
      term: null,
      page: null,
      listItemComponent: markRaw(LibraryBookIssueTimelineItem)
    };
  },
  computed: {
    dataWrappers() {
      return this.$stores.libraryBookIssue.libraryBookIssuesResponse == null ? [] : this.$stores.libraryBookIssue.libraryBookIssuesResponse.data;
    },
    meta() {
      return this.$stores.libraryBookIssue.libraryBookIssuesResponse == null ? null : this.$stores.libraryBookIssue.libraryBookIssuesResponse.meta;
    }
  },
  methods: {
    fetchLibraryBookIssues: function (pTerm = null, pPage = null) {
      var payload = {
        term: pTerm,
        page: pPage,
        library_id: this.library.id
      };
      this.$stores.libraryBookIssue.fetchLibraryBookIssues(payload).then(() => {
        this.show_loading = false;
      }).catch(() => {
        this.show_loading = false;
      });
    }
  },
  watch: {
    page: {
      // the callback will be called immediately after the start of the observation
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal != oldVal) {
          this.fetchLibraryBookIssues(this.term, this.page);
        }
      }
    },
    term: {
      // the callback will be called immediately after the start of the observation
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal != oldVal) {
          this.fetchLibraryBookIssues(this.term, this.page);
        }
      }
    }
  }
};
</script>
