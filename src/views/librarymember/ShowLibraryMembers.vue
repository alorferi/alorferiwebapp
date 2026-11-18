<template>
    <div class="mt-2">
        <SearchTextField @update:term="term = $event" />

        <Loading v-if="libraryMemberWrappers.length == 0"></Loading>
        <div v-else>
            <Paginator :meta="meta" @update:page="page = $event" />

            <WrapperListView
                :emptyListMessage="$t('social.emptyMembers')"
                :dataWrapperList="libraryMemberWrappers"
                :listItemComponent="itemComponent"
            />

            <Paginator :meta="meta" @update:page="page = $event" />
        </div>
    </div>
</template>

<script>
import { markRaw } from "vue";
// import LibraryMemberListView from "./LibraryMemberListView";
import LibraryMemberListItem from "./LibraryMemberListItem";
import Loading from "../../components/Loading";
import SearchTextField from "../../components/SearchTextField";
import Paginator from "../../components/Paginator";
import WrapperListView from "../../components/WrapperListView";
export default {
  name: "ShowLibraryMembers",
  props: ["library"],
  components: {
    Loading,
    SearchTextField,
    Paginator,
    WrapperListView
  },
  async mounted() {
    this.fetchLibraryMembers();
  },
  data: function () {
    return {
      show_loading: true,
      term: null,
      page: null,
      itemComponent: markRaw(LibraryMemberListItem)
    };
  },
  computed: {
    libraryMemberWrappers() {
      return this.$stores.libraryMember.libraryMembersResponse == null ? [] : this.$stores.libraryMember.libraryMembersResponse.data;
    },
    meta() {
      return this.$stores.libraryMember.libraryMembersResponse == null ? null : this.$stores.libraryMember.libraryMembersResponse.meta;
    }
  },
  methods: {
    fetchLibraryMembers: function (pTerm = null, pPage = null) {
      var payload = {
        term: pTerm,
        page: pPage,
        library_id: this.library.id
      };
      this.$stores.libraryMember.fetchLibraryMembers(payload).then(() => {
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
          this.fetchLibraryMembers(this.term, this.page);
        }
      }
    },
    term: {
      // the callback will be called immediately after the start of the observation
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal != oldVal) {
          this.fetchLibraryMembers(this.term, this.page);
        }
      }
    }
  }
};
</script>
