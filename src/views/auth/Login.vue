<template>
    <div class="card card-default">
        <div class="card-header">Login</div>
        <div class="card-body">
            <form class="login form-horizontal" @submit.prevent="login">
                <!-- <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <i class="fas fa-mobile-alt"></i>
                        </span>

                        <select
                            class="form-control"
                            id="country_code"
                            v-model="country_code"
                        >
                            <option value="+880" selected>+880</option>
                            <option value="+91">+91</option>
                            <option value="+1">+1</option>
                        </select>
                    </div>

                    <input
                        id="username"
                        v-model="username"
                        type="tel"
                        class="form-control"
                        name="username"
                        value
                        @blur="onBlurMobileNumber"
                        placeholder="Mobile number"
                        size="13"
                        minlength="12"
                        maxlength="13"
                        pattern="([0-9]{10})|([0-9]{11})"
                        required
                        autofocus
                    />
            </div> -->

                        <div class="form-group">

                             <MobileNumberField
                                name="username"
                                label="Mobile Number"
                                placeholder="Mobile"
                                icon="fas fa-mobile-alt"
                                :errors="errors"
                                @update:field="username = $event"
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
                                @update:field="password = $event"
                            />

                    </div>


                <!-- <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <i class="fas fa-key"></i>
                        </span>
                    </div>

                    <input
                        id="password"
                        v-model="password"
                        type="password"
                        class="form-control"
                        name="password"
                        placeholder="Password"
                        required
                    />
                </div> -->




                <div class="form-group">
                    <input type="checkbox" name="remember" />
                    Remember Me
                </div>

                <div class="form-group">
                    <button
                        type="submit"
                        class="btn btn-primary"
                        style="width:100%"
                    >
                        Login
                    </button>
                </div>

                <div class="form-group">
                    <router-link
                        class="btn btn-success"
                        :to="{ name: 'register' }"
                        style="width:100%"
                    >
                        Register
                    </router-link>
                </div>
                <div class="text-center text-danger">{{ error_message }}</div>
            </form>
        </div>
    </div>
</template>

<script>
import MobileNumberField from "../../components/MobileNumberField";
import EditTextField from "../../components/EditTextField";

export default {
    name: "Login",
    props: {
        msg: String
    },
       components: {
        MobileNumberField,EditTextField
    },
    mounted: function() {
        if (this.$store.getters.isLoggedIn) {
            //  this.$router.push({ name: "home" });
        }
    },
    data() {
        return {
            username: "",
            password: "",
            is_error: false,
            error_message: "",
            errors: null,
        };
    },
    methods: {
        login: function() {
            this.is_error = false;
            let username = this.username.replace(/^0+/, "");
            let password = this.password;
            this.$store
                .dispatch("login", { username, password })
                .then(() => {
                    this.$store
                        .dispatch("fetchMe")
                        .then(() => {
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
        onBlurMobileNumber(e) {
            console.log("blur", e.target.value);

            if(e.target.value.startsWith("0",0)){
              e.target.value =   e.target.value.substring(1);
            }
            // var value = parseInt(e.target.value, 10);
            // if (isNaN(value) == false) {
            //     e.target.value = value;
            //     this.value = value;
            // }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
