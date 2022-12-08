<template>
    <div>
        <br />
        <br />
        <div class="row mt-6">
            <div class="col-sm-3"></div>
            <div class="col-sm-6 card mt-6">
                <h4 class="text-center mt-2">Reset password</h4>
                <form class="card-body" @submit.prevent="submitForm">
                    <div class="col-md-12">
                        <div class="form-group">
                            <EditTextField
                                type="password"
                                name="new_password"
                                label="New Password"
                                placeholder="Type new password here"
                                icon="fas fa-key"
                                :errors="errors"
                                @update:field="dataModel.new_password = $event"
                            />
                        </div>

                        <div class="form-group">
                            <EditTextField
                                type="password"
                                name="confirm_new_password"
                                label="Confirm Password"
                                placeholder="Type confirm password here"
                                icon="fas fa-key"
                                :errors="errors"
                                @update:field="
                                    dataModel.confirm_new_password = $event
                                "
                            />
                        </div>

                        <div
                            class="text-center text-danger mb-2"
                            v-if="error_message"
                        >
                            {{ error_message }}
                        </div>

                        <div class="form-group">
                            <button
                                type="submit"
                                class="btn btn-primary"
                                style="width:100%"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-sm-3"></div>
        </div>
    </div>
</template>

<script>
import EditTextField from "../../components/EditTextField";

export default {
    name: "ResetPassword",
    props: {
        msg: String
    },
    mounted() {
        this.redirectIfNoOtcToken();
    },
    components: {
        EditTextField
    },
    computed: {},
    data() {
        return {
            dataModel: {
                new_password: "",
                confirm_new_password: ""
            },
            // username: "",
            errors: null,
        };
    },
    methods: {
        redirectIfNoOtcToken() {
            const self = this;

            const otc_token = localStorage.getItem("otc_token");

            console.log("otc_token", otc_token);

            if (otc_token === null) {
                self.$router.replace({ name: "home" });
            }
        },
        submitForm: function() {
            console.log(this.dataModel);
            const self = this;

            this.$store
                .dispatch("resetPassword", this.dataModel)
                .then(response => {
                    console.log(response.data.data);

                    switch (response.data.status) {
                        case "OK":
                            self.$router.replace({ name: "home" });
                            break;
                    }

                    // this.$router.push("/auth/login");
                })
                .catch(errors => {
                    console.log(errors);

                    try {
                        if (errors.response.data.errors) {
                            self.errors = errors.response.data.errors;
                        }else if(errors.response.data.message){
                            this.error_message = errors.response.data.message;
                        }
                    } catch (err) {
                        self.errors = err;
                    }

                    self.ot_code = null;
                });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
