<template>
    <div>
      <div v-if="libraryMemberWrappers.length === 0">
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
                v-for="libraryMemberWrapper in libraryMemberWrappers"
                v-bind:key="libraryMemberWrapper.attributes.id"
            >
                <LibraryMemberListItem :libraryMember="libraryMemberWrapper.attributes" />
            </div>


        </div>
    </div>
</template>


<script>
import LibraryMemberListItem from "./LibraryMemberListItem";


export default {
    name: "LibraryMemberListView",
    props:["libraryMemberWrappers"],
    components: {
        LibraryMemberListItem,
    }


};
</script>

