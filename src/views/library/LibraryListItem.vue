<template>
    <div>
        <div class="ui-card mb-4 p-4">
            <div class="flex">
                <LibraryLogo :library="item" size="72" />

                <div class="pl-2">
                    <h4>{{ item.name }}</h4>

                    <p v-if="item.address != null">
                        <span v-if="item.address.house != null && item.address.house.length != 0">
                            {{ item.address.house }},
                        </span>

                        <span v-if="item.address.village != null && item.address.village.length != 0">
                            {{ item.address.village }},
                        </span>

                        <span v-if="item.address.police_station != null">
                            {{ item.address.police_station.name }},
                        </span>

                        <span v-if="item.address.district != null">
                            {{ item.address.district.name }}
                        </span>

                        <span v-if="item.address.post_code != null"> - {{ item.address.post_code }} </span>
                    </p>

                    <p v-if="item.mobile != null">{{ item.mobile }}</p>

                    <p>Books: {{ item.total_books }}, Members: {{ item.total_members }}</p>

                    <router-link
                        :to="{
                            name: 'library-show',
                            params: { id: item.id },
                        }"
                        class="absolute inset-0"
                    >
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LibraryLogo from "./LibraryLogo";

export default {
    name: "LibraryListItem",
    props: ["item"],
    components: {
        LibraryLogo
    },
    methods: {

        logoUrl(){
                return this.getApiUrl(this.item.logo_url)
        }

    }
};
</script>
