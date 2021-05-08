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
                                icon=" "
                                :errors="errors"
                                @update:field="userRegisterModel.first_name = $event"
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
                                @update:field="userRegisterModel.surname = $event"
                            />
                        </div>
                    </div>



                    <div class="form-group">

                             <MobileNumberField
                                name="mobile"
                                label="Mobile"
                                placeholder="Mobile"
                                icon="fas fa-mobile-alt"
                                :errors="errors"
                                @update:field="userRegisterModel.mobile = $event"
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
                                @update:field="userRegisterModel.password = $event"
                            />

                    </div>


                    <div class="form-group">

                             <EditTextField
                                type="date"
                                name="dob"
                                :initval="this.userRegisterModel.dob"
                                label="Date of birth"
                                placeholder="DD/MM/YYYY"
                                icon="fas fa-birthday-cake"
                                :errors="errors"
                                @update:field="userRegisterModel.dob = $event"
                            />

                    </div>

                    <div>

                            <GenderInputField
                                name="gender"
                                label="Gender"
                                :errors="errors"
                                @update:field="userRegisterModel.gender = $event"
                            />

                    </div>

                    <div class="form-group">

                     <AskForOtp :showOtpModal="showOtpModal" :durationInSeconds="durationInSeconds"

                     @updateOtp="updateOtp" />
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
import MobileNumberField from "../../components/MobileNumberField";
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
        MobileNumberField,
        GenderInputField,
        AskForOtp
    },
    computed: {
    },
    data() {
        return {
            userRegisterModel: {
                first_name: "",
                surname: "",
                mobile: "",
                password: "",
                dob:this.formatDate(new Date(),"YYYY-MM-DD","en"),
                gender: "",
                otp_code: ""
            },
            errors: null,
            showOtpModal:false,
            durationInSeconds:30,
        };
    },
    methods: {
        updateOtp(value){
           this.userRegisterModel.otp_code = value
           this.submitForm();
        },

        submitForm: function() {
             console.log( this.userRegisterModel)
            this.$axios
                .post(this.$apiServerBaseUrl + "/api/auth/register", this.userRegisterModel)
                .then(response => {
                    console.log(response.data.data);

                    switch(response.data.status){
                        case "OK":
                             window.location.href = "/auth/login"
                        break;
                        case "OTP_GENERATED":
                        case "OTP_REJECTED":
                            var otp_expired_after_in_seconds = response.data.data.otp_expired_after_in_seconds;
                            this.durationInSeconds = otp_expired_after_in_seconds;
                            this.showOtpModal = true;

                        break;
                    }

                    // this.$router.push("/auth/login");
                })
                .catch(errors => {
                    console.log(errors);
                    if(errors.response.data.errors){
                        this.errors = errors.response.data.errors;
                    }

                    this.userRegisterModel.otp_code = null;

                });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
