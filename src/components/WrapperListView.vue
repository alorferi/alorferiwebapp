<template>
    <div>
      <div v-if="dataWrapperList.length === 0">
            <p>
                {{emptyListMessage}}
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
    props:["dataWrapperList","listItemComponent", "emptyListMessage"],
    components: {
    }


};
</script>

