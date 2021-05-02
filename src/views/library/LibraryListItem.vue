<template>
    <div>
        <div class="card mb-3 p-3">
            <div class="d-flex">

                <LibraryLogo :library ="item" size="72"/>

                <div>
                    <h4>{{ item.name }}</h4>

                    <p>{{ item.address }}</p>
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
