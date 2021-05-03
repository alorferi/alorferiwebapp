<template>
    <div>
        <Loading v-if="loading" />
        <div v-else>
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
                    placeholder="Type Your Library Name Here"
                    :data="form.name"
                    :errors="errors"
                    @update:field="form.name = $event"
                />
                <EditTextField
                    type="text"
                    name="address"
                    label="Library Address"
                    placeholder="Library Address"
                    :data="form.address"
                    :errors="errors"
                    @update:field="form.address = $event"
                />
                <EditTextField
                    type="text"
                    name="mobile"
                    label="Library Mobile"
                    placeholder="Library Mobile"
                    :data="form.mobile"
                    :errors="errors"
                    @update:field="form.mobile = $event"
                />
                <EditTextField
                    type="text"
                    name="email"
                    label="Library Email"
                    placeholder="Library Email"
                    :data="form.email"
                    :errors="errors"
                    @update:field="form.email = $event"
                />

                <EditTextField
                    type="date"
                    name="founded_at"
                    label="Founded At"
                    placeholder="MM/DD/YYYY"
                    :data="form.founded_at"
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
                        class="bg-blue py-2 px-4 text-white rounded hover:bg-blue"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import EditTextField from "../../components/EditTextField";
import Loading from "../../components/Loading";
import axios from "axios";

export default {
    name: "LibraryEdit",
    components: {
        EditTextField,
        Loading
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
            errors: null,
            loading: true
        };
    },
    computed: {},
    mounted() {
        axios
            .get(this.getApiUrl("/api/libraries/" + this.$route.params.id))
            .then(response => {
                this.form = response.data.data;

                // console.info("message", this.form);
                this.loading = false;
            })
            .catch(errors => {
                this.loading = false;
                if (errors.response.status === 404) {
                    this.$router.push("/library/my-libraries");
                }
            });
    },
    methods: {
        submitForm: function() {
            axios
                .put(
                    this.getApiUrl("/api/libraries/" + this.$route.params.id),
                    this.form
                )
                .then(response => {
                    this.$router.push("/library/" + this.$route.params.id);
                    console.log(response.data.data);
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
