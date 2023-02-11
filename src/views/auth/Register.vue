<template>
    <div>
        <div class="row">
            <div class="col-sm-3"></div>
            <div class="col-sm-6 card">
                <h4 class="text-center mt-2">Create New Account</h4>
                <form class="card-body" @submit.prevent="submitForm">
                    <div class="col-md-12">
                        <div class="d-flex">
                            <div class="form-group flex-fill pr-2">
                                <EditTextField
                                    type="text"
                                    name="first_name"
                                    label="First Name"
                                    placeholder="First Name"
                                    icon=" "
                                    :errors="errors"
                                    @update:field="userData.first_name = $event"
                                />
                            </div>

                            <div class="form-group  flex-fill pl-2">
                                <EditTextField
                                    type="text"
                                    name="surname"
                                    label="Last Name"
                                    placeholder="Last Name"
                                    icon=" "
                                    :errors="errors"
                                    @update:field="userData.surname = $event"
                                />
                            </div>
                        </div>

                        <div class="form-group">
                            <UserNameField
                                name="username"
                                label="E-mail or Mobile"
                                placeholder="E-mail or Mobile"
                                icon="fas fa-at"
                                :errors="errors"
                                @update:field="userData.username = $event"
                            />
                        </div>

                        <div class="form-group">
                            <EditTextField
                                type="password"
                                name="password"
                                label="Password"
                                placeholder="Password"
                                icon="fas fa-key"
                                :errors="errors"
                                @update:field="userData.password = $event"
                            />
                        </div>

                        <div class="form-group">
                            <EditTextField
                                type="date"
                                name="dob"
                                :initval="this.userData.dob"
                                label="Date of birth"
                                placeholder="DD/MM/YYYY"
                                icon="fas fa-birthday-cake"
                                :errors="errors"
                                @update:field="userData.dob = $event"
                            />
                        </div>

                        <div>
                            <GenderInputField
                                name="gender"
                                label="Gender"
                                :errors="errors"
                                @update:field="userData.gender = $event"
                            />
                        </div>

                        <div class="form-group">
                            <AskForOtcModal
                                :showOtcModal="showOtcModal"
                                :durationInSeconds="durationInSeconds"
                                @updateOtc="updateOtc"
                                @onUpdateVisibleState="showOtcModal = $event"
                            ></AskForOtcModal>
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
        <br>
        <br>
        <BottomBar />
    </div>
</template>

<script>
import EditTextField from "../../components/EditTextField";
// import MobileNumberField from "../../components/MobileNumberField";
import UserNameField from "../../components/UserNameField";
import GenderInputField from "../../components/GenderInputField";
import AskForOtcModal from "../../components/AskForOtcModal";
// import $ from 'jquery'

// import jQuery from 'jquery'

export default {
    name: "Register",
    props: {
        msg: String
    },
    components: {
        EditTextField,
        // MobileNumberField,
        GenderInputField,
        UserNameField,
        AskForOtcModal,
    },
    mounted: function() {
        if (this.$store.getters.isLoggedIn) {
             this.$router.push({ name: "home" });
        }
    },
    computed: {},
    data() {
        return {
            userData: {
                first_name: "",
                surname: "",
                // mobile: "",
                // email: "",
                username: "",
                password: "",
                dob: this.formatDate(new Date(), "YYYY-MM-DD", "en"),
                gender: ""
            },
            // username: "",
            ot_code: "",
            errors: null,
            showOtcModal: false,
            durationInSeconds: 30
        };
    },
    methods: {
        updateOtc(value) {
            this.ot_code = value;
            this.submitForm();
        },

        login: function() {
            const self = this;
            let username = this.userData.username;
            let password = this.userData.password;
            this.$store
                .dispatch("loginBasic", { username, password })
                .then(() => {
                    this.$store
                        .dispatch("fetchMe")
                        .then(() => {
                            self.$router.replace({ name: "home" });
                            console.log("success");
                        })
                        .catch(() => {
                            console.log("failed");
                        });
                })
                .catch(err => {
                    this.error_message = err;
                    console.log(err);
                    this.is_error = true;
                });
        },

        submitForm: function() {
            const self = this;
            const url =
                this.$apiServerBaseUrl + "/api/auth/register-with-username";

            const headers = {
                "ot-code": self.ot_code
            };

            // if(this.isMobileNumber(this.username)){
            //     this.userData.mobile = this.username;
            //     this.userData.email = ""
            // }else{
            //     this.userData.email = this.username;
            //     this.userData.mobile = "";
            // }

            this.$axios
                .post(url, this.userData, {
                    headers: headers
                })
                .then(response => {
                    console.log(response.data.data);

                    switch (response.data.status) {
                        case "OK":
                            // self.$router.push({ name: "login" });
                            // this.$route.path = "/auth/login";

                            self.login();

                            break;
                        case "OTC_GENERATED":
                        case "OTC_REJECTED":
                            var otc_expired_after_in_seconds =
                                response.data.data.otc_expired_after_in_seconds;
                            this.durationInSeconds = otc_expired_after_in_seconds;
                            this.showOtcModal = true;

                            break;
                    }

                    // this.$router.push("/auth/login");
                })
                .catch(errors => {
                    console.log(errors);
                    try {
                        if (errors.response.data.errors) {
                            self.errors = errors.response.data.errors;
                        }
                    } catch (err) {
                        self.errors = err;
                    }

                    this.ot_code = "";
                });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
