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
            <div
                v-for="libraryWrapper in libraries"
                v-bind:key="libraryWrapper.attributes.id"
            >
                <LibraryListItem :library="libraryWrapper.attributes" />
            </div>
        </div>
    </div>
    <!-- </div> -->
    <!-- <div class="col-sm-2"></div>
    </div> -->
</template>

<script>
import LibraryListItem from "./LibraryListItem";
import Loading from "../../components/Loading";
// import HomeLeftMenu from "@/views/menus/HomeLeftMenu";
import axios from "axios";

export default {
    name: "MyLibraries",
    components: {
        Loading,
        LibraryListItem
    },
    methods: {
        editUrl: function(library) {
            return this.getApiUrl("/api/libraries/" + library.id + "/edit");
        }
    },

    mounted() {
        axios
            .get(
                this.getApiUrl("/api/libraries/my-libraries"),
                this.getBearerToken()
            )
            .then(response => {
                this.show_loading = false;
                this.libraries = response.data.data;
                console.warn(response.data);
            })
            .catch(errors => {
                this.show_loading = false;
                console.error(errors);
            });
    },
    data: function() {
        return {
            libraries: null,
            show_loading: true
        };
    }
};
</script>
