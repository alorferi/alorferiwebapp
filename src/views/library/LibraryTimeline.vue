<template>
    <div class="pt-2">

    <CreateLibraryPost :library="library"
    v-if="this.hasMemberPermission('library_edit')"
    />

        <Loading v-if="show_loading"></Loading>
        <ShowLibraryPosts :library="library" v-else>

        </ShowLibraryPosts>
    </div>
</template>

<script>

import CreateLibraryPost from "@/views/library/CreateLibraryPost";
import ShowLibraryPosts from  "@/views/library/ShowLibraryPosts";
import Loading from "@/components/Loading";

export default {
    name: "LibraryTimeline",
     props:["library"],
    components: {
        Loading,
        ShowLibraryPosts,
        CreateLibraryPost
    },
  async mounted(){
    },
    data: function() {
        return {
            show_loading: false,
            term: null,
            page: null,
        };
    },
    computed: {



    },
    methods: {

    },

    watch: {


    }
};
</script>
