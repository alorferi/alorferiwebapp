<template>
    <div>
        <div v-if="dataWrapperList.length === 0">
            <p class="ui-empty-state">
                {{ emptyListMessage }}
            </p>
        </div>
        <div v-else :class="{ 'social-discovery-grid': layout === 'grid' }">
            <div v-for="wrapper in dataWrapperList" v-bind:key="wrapper.attributes.id">
                <component :is="listItemComponent" :item="wrapper.attributes"></component>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "WrapperListView",
    props: ["dataWrapperList", "listItemComponent", "emptyListMessage", "layout"],
    components: {},
};
</script>
