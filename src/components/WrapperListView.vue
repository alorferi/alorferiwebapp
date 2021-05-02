<template>
    <div>
      <div v-if="libraryBookWrappers.length === 0">
            <p>
                No library Book yet
                <!-- <a href="/library/create" class="text-blue-500">Create one</a> -->
                <router-link class="text-blue" :to="{ name: 'library-create' }"
                    >Create one</router-link
                >
            </p>
        </div>
        <div v-else class="">




            <div
                v-for="libraryBookWrapper in libraryBookWrappers"
                v-bind:key="libraryBookWrapper.attributes.id"
            >
                <LibraryBookListItem :libraryBook="libraryBookWrapper.attributes" />
            </div>


        </div>
    </div>
</template>


<script>
import LibraryBookListItem from "./LibraryBookListItem";


export default {
    name: "LibraryListView",
    props:["libraryBookWrappers"],
    components: {
        LibraryBookListItem,
    }


};
</script>

