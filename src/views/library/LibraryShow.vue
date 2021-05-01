<template>
    <div class="">
        <Loading v-if="loading" />
        <div v-else>
            <div class="d-flex justify-content-between">
                <div>
                    <a href="#" @click="$router.back()">&lt; Back</a>
                </div>
                <div class="relative">
                    <router-link
                        :to="{
                            name: 'library-edit',
                            params: { id: library.id }
                        }"
                        class="px-4 py-2 rounded text-sm font-bold text-green-500 border border-green-500 mr-2"
                        >Edit</router-link
                    >
                    <a
                        href="#"
                        class="px-4 py-2 rounded text-sm font-bold text-red-500 border border-red-500"
                        @click="delete_modal = !delete_modal"
                        >Delete</a
                    >

                    <div
                        v-if="delete_modal"
                        class="absolute bg-blue-900 rounded-lg z-20 p-8 w-64 right-0 mt-2 mr-2"
                    >
                        <p class="text-red-500">
                            Are you sure you want to delete this recored?
                        </p>

                        <div class="flex items-center justify-end mt-6">
                            <button
                                @click="delete_modal = !delete_modal"
                                class="px-4 py-1 bg-white pr-4 mr-2 border border-white-500 rounded text-center"
                            >
                                Cancel
                            </button>
                            <button
                                class="px-4 py-1 bg-red-500 rounded"
                                @click="destroy"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    v-if="delete_modal"
                    @click="delete_modal = !delete_modal"
                    class="bg-black opacity-25 absolute right-0 left-0 top-0 bottom-0 z-10"
                ></div>
            </div>

            <div class="flex items-center pt-6">
                <LibraryLogo :library ="library" size="72" />
                <div class="pl-5 text-xl">{{ library.name }}</div>
            </div>

            <p class="pt-6 text-gray-600 font-bold uppercase text-sm">Mobile</p>
            <p class="pl-2 text-blue-400">{{ library.mobile }}</p>
            <p class="pt-6 text-gray-600 font-bold uppercase text-sm">Email</p>
            <p class="pl-2 text-blue-400">{{ library.email }}</p>
            <p class="pt-6 text-gray-600 font-bold uppercase text-sm">
                Founded at
            </p>
            <p class="pl-2 text-blue-400">{{ library.founded_at }}</p>
        </div>
    </div>
</template>

<script>
import LibraryLogo from "./LibraryLogo";
import Loading from "../../components/Loading";
import axios from "axios";
export default {
    name: "LibraryShow",
    components: {
        LibraryLogo,
        Loading
    },
    mounted() {
        axios
            .get(this.getApiUrl("/api/libraries/" + this.$route.params.id),this.getHeaderWithAuthorizationBearerToken())
            .then(response => {
                this.library = response.data.data.attributes;
                console.info(response);
                this.loading = false;
            })
            .catch(errors => {
                this.loading = false;
                console.log(errors);
                if (errors.response.status === 404) {
                    this.$router.push("/library/my-libraries");
                }
            });
    },
    data: function() {
        return {
            loading: true,
            delete_modal: false,
            library: null
        };
    },
    methods: {
        destroy: function() {
            axios
                .delete(
                    this.getApiUrl("/api/libraries/" + this.$route.params.id)
                )
                .then(response => {
                    this.$router.push("/library/my-libraries");
                    console.info(response);
                })
                .catch(error => {
                    alert("Internal error, unable to delete contact.");

                    if (error.response.status === 404) {
                        this.$router.push("/library/my-libraries");
                    }
                });
        }
    }
};
</script>
