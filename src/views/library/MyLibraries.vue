<template>
    <!-- <div class="row">
        <div class="col-sm-2">
            <HomeLeftMenu></HomeLeftMenu>
        </div>

        <div class="col-sm-8"> -->
    <Loading v-if="show_loading"></Loading>
    <div v-else>
        <div v-if="libraries.length === 0">
            <p>
                No libraries yet
                <!-- <a href="/library/create" class="text-blue-500">Create one</a> -->
                <router-link class="text-blue" :to="{ name: 'library-create' }"
                    >Create one</router-link
                >
            </p>
        </div>
        <div v-else class="h-100">


            <Paginator :meta="meta"   route_name="my-libraries"/>

            <div
                v-for="libraryWrapper in libraries"
                v-bind:key="libraryWrapper.attributes.id"
            >
                <LibraryListItem :library="libraryWrapper.attributes" />
            </div>

     <Paginator :meta="meta" route_name="my-libraries" />

        </div>
    </div>
    <!-- </div> -->
    <!-- <div class="col-sm-2"></div>
    </div> -->
</template>

<script>
import LibraryListItem from "./LibraryListItem";
import Loading from "../../components/Loading";
import Paginator from "../../components/Paginator";
// import HomeLeftMenu from "@/views/menus/HomeLeftMenu";
import axios from "axios";

export default {
    name: "MyLibraries",
    components: {
        Loading,
        LibraryListItem, Paginator
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
