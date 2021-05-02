<template>
    <div>
      <div v-if="dataWrapperList.length === 0">
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
                v-for="wrapper in dataWrapperList"
                v-bind:key="wrapper.attributes.id"
            >
                 <component :is="listItemComponent" :item="wrapper.attributes"></component>

            </div>


        </div>
    </div>
</template>


<script>


export default {
    name: "WrapperListView",
    props:["dataWrapperList","listItemComponent"],
    components: {
    }


};
</script>

