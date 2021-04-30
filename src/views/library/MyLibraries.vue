<template>


<div>
    <h4 class="text-secondary">My Libraries</h4>
    <SearchTextField @update:term="term = $event"/>
        <Loading v-if="show_loading"></Loading>
    <div v-else>

           <Paginator :meta="meta"   route="my-libraries" @update:page="page = $event" />

            <LibraryListView :libraries="libraries"/>


    </div>

</div>

</template>

<script>
import LibraryListView from "./LibraryListView";
import Loading from "../../components/Loading";
import SearchTextField from "../../components/SearchTextField";
// import HomeLeftMenu from "@/views/menus/HomeLeftMenu";
import Paginator from "../../components/Paginator";
// import Autocomplete from 'vuejs-auto-complete';

import axios from "axios";

export default {
    name: "MyLibraries",
    components: {
        Loading,LibraryListView,SearchTextField,Paginator
    },
      mounted() {
        this.fetchMyLibraries()
    },
    methods: {
        editUrl: function(library) {
            return this.getApiUrl("/api/libraries/" + library.id + "/edit");
        },
    fetchMyLibraries: function(term=null,page=null) {

        var endPoint = "/api/libraries/my-libraries";


    endPoint = this.getEndPointQueryString(endPoint,term,page);

        axios
            .get(
                this.getApiUrl(endPoint),
                this.getBearerToken()
            )
            .then(response => {
                this.show_loading = false;
                this.libraries = response.data.data;
                this.meta = response.data.meta;

                console.warn(response.data);
            })
            .catch(errors => {
                this.show_loading = false;
                console.error(errors);
            });

        }
    },
    computed: {},

    data: function() {
        return {
            libraries: null,
            show_loading: true,
            meta: null,
            term: null,
            page:null,
        };
    },
    watch: {
        page: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal != oldVal) {
                    this.fetchMyLibraries(this.term,this.page)
                }
            }
        },

             term: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal != oldVal) {
                    this.fetchMyLibraries(this.term,this.page)
                }
            }
        }
    }
};
</script>
