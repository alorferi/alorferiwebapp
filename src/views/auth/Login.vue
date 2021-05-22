<template>
    <div class="card card-default">
        <!-- <div class="card-header">Login</div> -->
        <div class="card-body">
            <form @submit.prevent="login">
                <div class="form-group">
                    <MobileNumberField
                        name="username"
                        placeholder="Mobile Number"
                        icon="fas fa-mobile-alt"
                        :errors="errors"
                        @update:field="username = $event"
                    />
                </div>

                <div class="form-group">
                    <EditTextField
                        type="password"
                        name="password"
                        placeholder="Password"
                        icon="fas fa-key"
                        :errors="errors"
                        @update:field="password = $event"
                    />
                </div>

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

                    <div class="text-center">
                        <router-link
                            class="btn btn-link"
                            :to="{ name: 'reset-password' }"
                        >
                            Forgot Your Password?
                        </router-link>
                    </div>
                </div>

                <!-- <div class="form-group"> -->
                    <router-link
                        class="btn btn-success"
                        :to="{ name: 'register' }"
                        style="width:100%"
                    >
                        Register
                    </router-link>
                <!-- </div> -->
                <div class="text-center text-danger" v-if="error_message">
                    {{ error_message }}
                </div>
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
        MobileNumberField,
        EditTextField
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
            errors: null
        };
    },
    methods: {
        login: function() {
            this.is_error = false;
            let username = this.username.replace(/^0+/, "");
            let password = this.password;
            this.$store
                .dispatch("loginBasic", { username, password })
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

            if (e.target.value.startsWith("0", 0)) {
                e.target.value = e.target.value.substring(1);
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
