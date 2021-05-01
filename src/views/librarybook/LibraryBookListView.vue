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
        <div v-else class="">




            <div
                v-for="libraryWrapper in libraries"
                v-bind:key="libraryWrapper.attributes.id"
            >
                <LibraryBookListItem :library="libraryWrapper.attributes" />
            </div>


        </div>
    </div>
</template>


<script>
import LibraryBookListItem from "./LibraryBookListItem";


export default {
    name: "LibraryListView",
    props:["libraries"],
    components: {
        LibraryBookListItem,
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

