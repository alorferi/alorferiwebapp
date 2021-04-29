<template>
    <!-- <div class="row">
        <div class="col-sm-2">
            <HomeLeftMenu></HomeLeftMenu>
        </div>

        <div class="col-sm-8"> -->
    <Loading v-if="show_loading"></Loading>
    <div v-else>
            <LibraryListView :libraries="libraries" :meta="meta"/>
    </div>
    <!-- </div> -->
    <!-- <div class="col-sm-2"></div>
    </div> -->
</template>

<script>
import LibraryListView from "./LibraryListView";
import Loading from "../../components/Loading";
// import HomeLeftMenu from "@/views/menus/HomeLeftMenu";
import axios from "axios";

export default {
    name: "MyLibraries",
    components: {
        Loading,LibraryListView
    },
      mounted() {
        this.fetchMyLibraries()
    },
    methods: {
        editUrl: function(library) {
            return this.getApiUrl("/api/libraries/" + library.id + "/edit");
        },
    fetchMyLibraries: function(){


        var endPoint = "/api/libraries/my-libraries";


    endPoint = this.getEndPointQueryString(endPoint);

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
            term: null
        };
    }
};
</script>
