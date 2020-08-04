<template>
    <div>
        <Loading v-if="show_loading"></Loading>
        <div v-else>
            <div v-if="libraries.length === 0">
                <p>
                    No libraries yet
                    <!-- <a href="/library/create" class="text-blue-500">Create one</a> -->
                    <router-link
                        class="text-blue"
                        to="{ name: 'library-create' }"
                        >Create one</router-link
                    >
                </p>
            </div>
            <div v-else class="h-100">
                <div v-for="library in libraries" v-bind:key="library" class="">
                    <div class="card mb-3 p-3">
                        <div>
                            <NameCircle :name="library.name"></NameCircle>
                            <h4>{{ library.name }}</h4>
                        </div>
                        <p>{{ library.address }}</p>
                        <p>{{ library.mobile }}</p>

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
    </div>
</template>

<script>
import NameCircle from "../../components/NameCircle";
import Loading from "../../components/Loading";
import axios from "axios";

export default {
    name: "MyLibraryList",
    components: {
        NameCircle,
        Loading
    },
    methods: {
        editUrl: function(library) {
            return this.getApiUrl("/api/v0/library/" + library.id + "/edit");
        }
    },

    mounted() {
        axios
            .get(this.getApiUrl("/api/v0/library/my-libraries"))
            .then(response => {
                this.show_loading = false;
                this.libraries = response.data.data;
                console.warn(response.data);
            })
            .catch(errors => {
                this.show_loading = false;
                console.error(errors);
            });
    },
    data: function() {
        return {
            libraries: null,
            show_loading: true
        };
    }
};
</script>
