<template>
    <div>
        <div class="flex justify-between">
            <div class="text-blue-400">
                <a href="#" @click="$router.back()">&lt; Back</a>
            </div>
        </div>
        <form @submit.prevent="submitForm()">
            <EditTextField
                type="text"
                name="name"
                label="Library Name"
                placeholder="Library Name"
                :errors="errors"
                @update:field="form.name = $event"
            />
            <EditTextField
                type="text"
                name="address"
                label="Library Address"
                placeholder="Library Address"
                :errors="errors"
                @update:field="form.address = $event"
            />
            <EditTextField
                type="text"
                name="mobile"
                label="Library Mobile"
                placeholder="Library Mobile"
                :errors="errors"
                @update:field="form.mobile = $event"
            />
            <EditTextField
                type="email"
                name="email"
                label="Library Email"
                placeholder="Library Email"
                :errors="errors"
                @update:field="form.email = $event"
            />

            <EditTextField
                type="date"
                name="founded_at"
                label="Founded At"
                placeholder="MM/DD/YYYY"
                :errors="errors"
                @update:field="form.founded_at = $event"
            />

            <EditTextField
                type="number"
                name="post_code"
                label="Post Code"
                placeholder="Type post code here"
                :errors="errors"
                @update:field="form.founded_at = $event"
            />

            <div class="flex justify-start">
                <button
                    class="py-2 px-4 text-white rounded text-red-700 border mr-5 hover:border-red-700"
                >
                    Canel
                </button>
                <button
                    class="bg-blue-500 py-2 px-4 text-white rounded hover:bg-blue-400"
                >
                    Save
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import EditTextField from "../../components/EditTextField";
import axios from "axios";
export default {
    name: "LibraryCreate",
    components: {
        EditTextField
    },
    data() {
        return {
            form: {
                name: "",
                address: "",
                email: "",
                mobile: "",
                founded_at: ""
            },
            errors: null
        };
    },
    computed: {},
    mounted() {},
    methods: {
        submitForm: function() {
            axios
                .post(this.getApiUrl("/api/v0/library"), this.form)
                .then(response => {
                    console.log(response.data.data);
                    this.$router.push("/library/" + response.data.data);
                })
                .catch(errors => {
                    console.log(errors);
                    this.errors = errors.response.data.errors;
                });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
