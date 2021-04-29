<template>
    <div>
        <div class="card mb-3 p-3">
            <div class="d-flex">

                <LibraryLogo :library ="library" size="72"/>

                <div>
                    <h4>{{ library.name }}</h4>

                    <p>{{ library.address }}</p>
                    <p v-if=" library.mobile != null ">{{ library.mobile }}</p>

                    <router-link
                        :to="{
                            name: 'library-show',
                            params: { id: library.id }
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
    props: ["library"],
    components: {
        LibraryLogo
    },
    methods: {

        logoUrl(){
                return this.getApiUrl(this.library.logo_url)
        }

    }
};
</script>
