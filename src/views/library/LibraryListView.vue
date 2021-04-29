<template>
    <div>
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
</template>


<script>
import LibraryListItem from "./LibraryListItem";
import Paginator from "../../components/Paginator";

export default {
    name: "LibraryListView",
    props:["libraries","meta"],
    components: {
        LibraryListItem, Paginator
    },
      mounted() {
    },
    methods: {


    },
    computed: {},

    data: function() {
        return {

        };
    }
};
</script>

