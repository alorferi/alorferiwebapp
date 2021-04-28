<template>
    <div class="row" >

        <div class="col-sm-3">

        </div>
        <div class="col-sm-6" >

            <form class="login form-horizontal" @submit.prevent="submitForm">
                <div class="col-md-12">
                    <div class="d-flex">
                        <div class="form-group flex-fill pr-2">
                            <EditTextField
                                type="text"
                                name="first_name"
                                label="First Name"
                                placeholder="First Name"
                                :errors="errors"
                                @update:field="user.first_name = $event"
                            />
                        </div>

                        <div class="form-group  flex-fill pl-2">
                                <EditTextField
                                type="text"
                                name="surname"
                                label="Last Name"
                                placeholder="Last Name"
                                :errors="errors"
                                @update:field="user.surname = $event"
                            />
                        </div>
                    </div>



                    <div class="form-group">

                             <MobileInputField
                                name="mobile"
                                label="Mobile"
                                placeholder="Mobile"
                                :errors="errors"
                                @update:field="user.mobile = $event"
                            />


                    </div>

                                   <div class="form-group">

                             <EditTextField
                                type="password"
                                name="password"
                                label="Password"
                                placeholder="Password"
                                :errors="errors"
                                @update:field="user.password = $event"
                            />

                    </div>


                    <div class="form-group">

                             <EditTextField
                                type="date"
                                name="dob"
                                label="Date of birth"
                                placeholder="DD/MM/YYYY"
                                :errors="errors"
                                @update:field="user.dob = $event"
                            />

                    </div>

                    <div>

                            <GenderInputField
                                name="gender"
                                label="Gender"
                                :errors="errors"
                                @update:field="user.gender = $event"
                            />

                    </div>

                    <div class="form-group">



                     <AskForOtp/>



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
    <div class="col-sm-3">

    </div>
    </div>
</template>

<script>
import EditTextField from "../../components/EditTextField";
import MobileInputField from "../../components/MobileInputField";
import GenderInputField from "../../components/GenderInputField";
import AskForOtp from "../../components/AskForOtp";
// import $ from 'jquery'

// import jQuery from 'jquery'

export default {
    name: "Register",
    props: {
        msg: String
    },
    components: {
        EditTextField,
        MobileInputField,
        GenderInputField,
        AskForOtp
    },
    data() {
        return {
            user: {
                first_name: "",
                surname: "",
                mobile: "",
                password: "",
                dob: "",
                gender: "",
                otp_code: ""
            },
            errors: null
        };
    },
    methods: {

        submitForm: function() {
             console.log( this.user)
            this.$axios
                .post(this.$apiServerBaseUrl + "/api/auth/register", this.user)
                .then(response => {
                    console.log(response.data.data);


                    switch(response.data.status){
                        case "OK": break;
                        case "OTP_GENERATED":
                        case "OTP_REJECTED":
                            console.log(response.data.data);
                            // jQuery.noConflict();
                            // $("#otpModal").modal('show')

                        break;
                    }

                    // this.$router.push("/auth/login");
                })
                .catch(errors => {
                    console.log(errors);
                    if(errors.response.data.errors){
                        this.errors = errors.response.data.errors;
                    }

                });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
