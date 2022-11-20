<template>
    <div>
        <div class="card mb-3 p-3">
            <div class="d-flex">

                <LibraryLogo :library ="item" size="72"/>

                <div>
                    <h4>{{ item.name }}</h4>

                    <p>

                        <span v-if="  item.address.house != null ">
                            {{ item.address.house }},
                        </span>

                        <span v-if="  item.address.village != null ">
                            {{ item.address.village }},
                        </span>

                        <span v-if="  item.address.police_station != null ">
                            {{ item.address.police_station.name }},
                        </span>

                        <span v-if="  item.address.district != null ">
                            {{ item.address.district.name }}
                        </span>

                        <span v-if="  item.address.post_code != null ">
                            -  {{ item.address.post_code }}
                        </span>

                    </p>

                    <p v-if=" item.mobile != null ">{{ item.mobile }}</p>

                     <p>Books: {{ item.total_books }}, Members: {{ item.total_members }} </p>

                    <router-link
                        :to="{
                            name: 'library-show',
                            params: { id: item.id }
                        }"
                        class="stretched-link"
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
