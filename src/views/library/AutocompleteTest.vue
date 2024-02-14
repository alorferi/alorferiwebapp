<template>
    <div>
        <h4 class="text-secondary">Autocomplete</h4>
        <Autocomplete
            :items="libraries"
            filterby="name"
            @change="onChangeAutocomplete"
            title="Look for a customer"
            @selected="customerSelected"
        />

    </div>
</template>

<script>
import customers from "../../assets/customers";
import Autocomplete from "../../components/Autocomplete";

import axios from "axios";

export default {
    name: "AutocompleteTest",
    components: {
        Autocomplete
    },
  async mounted(){
        this.fetchMyLibraries();
        this.customers = customers;
    },
    methods: {
        editUrl: function(library) {
            return this.getApiUrl("/api/libraries/" + library.id + "/edit");
        },
        fetchMyLibraries: function(term = null, page = null) {
            var endPoint = "/api/libraries/my-libraries";

            endPoint = this.getEndPointQueryString(endPoint, term, page);

            axios
                .get(this.getApiUrl(endPoint), this.getHeaderWithAuthorizationBearerToken())
                .then(response => {
                    this.show_loading = false;
                    this.libraries = response.data.data;
                    this.meta = response.data.meta;

                    console.warn(response.data);
                })
                .catch(errors => {
                    this.show_loading = false;
                    console.error(errors);
                });
        },
        customerSelected(customer) {
            console.log(
                `Customer Selected:\nid: ${customer.id}\nname: ${customer.name}`
            );
        },
        onChangeAutocomplete() {
            // do something with the current value
        }
    },
    computed: {},

    data: function() {
        return {
            libraries: null,
            show_loading: true,
            meta: null,
            term: null,
            page: null,
            customers: []
        };
    },
    watch: {
        page: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal != oldVal) {
                    this.fetchMyLibraries(this.term, this.page);
                }
            }
        },

        term: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal != oldVal) {
                    this.fetchMyLibraries(this.term, this.page);
                }
            }
        }
    }
};
</script>
