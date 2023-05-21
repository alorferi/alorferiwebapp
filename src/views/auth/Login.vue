<template>
    <div class="card card-default">
        <!-- <div class="card-header">Login</div> -->
        <div class="card-body mt-3">
            <form @submit.prevent="login">
                <div class="form-group">
                    <UserNameField
                        name="username"
                        :placeholder="$t('auth.email_or_mobile')"
                        icon="fas fa-user-alt"
                        :errors="errors"
                        @update:field="username = $event"
                    />
                </div>

                <div class="form-group pt-1">
                     <PasswordField
                        name="password"
                        :placeholder="$t('auth.password')"
                        icon="fas fa-key"
                        :errors="errors"
                        @update:field="password = $event"
                    />
                </div>

                <div class="text-center text-danger mb-2" v-if="error_message">
                    {{ error_message }}
                </div>
                <div class="form-group">
                    <input type="checkbox" name="remember" />
                    {{$t('auth.remember_me')}}
                </div>

                <div class="form-group">
                    <button
                        type="submit"
                        class="btn btn-success"
                        style="width:100%"
                    >
                    {{ $t('auth.login') }}
                    </button>

                    <div class="text-center">
                        <router-link
                            class="btn btn-link"
                            :to="{ name: 'login-with-otc-to-reset-password' }"
                        >

                            {{ $t('auth.forgot_password' )}}
                        </router-link>
                    </div>

                    <hr>


                <router-link
                    class="btn btn-primary"
                    :to="{ name: 'register' }"
                    style="width:100%"
                >

                    {{$t('auth.create_new_account')}}
                </router-link>

                </div>


            </form>
        </div>
    </div>
</template>

<script>
import UserNameField from "@/components/UserNameField";
import PasswordField from "@/components/PasswordField";

export default {
    name: "Login",
    props: {
        msg: String
    },
    components: {
        UserNameField,
        PasswordField
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
            const self = this;
            this.is_error = false;
            let username = this.username.replace(/^0+/, "");
            let password = this.password;
            self.$store
                .dispatch("loginBasic", { username, password })
                .then(() => {
                    self.$store
                        .dispatch("fetchMe")
                        .then(() => {
                            self.$router.replace(self.$route.query.from);
                            // window.location.href = "/";
                            // console.log("success");
                        })
                        .catch(() => {
                            console.log("failed");
                        });
                })
                .catch(errors => {
                    // this.error_message = errors;
                    console.log(errors);

                    try {
                        if (errors.response.data.errors) {
                            self.errors = errors.response.data.errors;
                        }else if(errors.response.data.message){
                            self.error_message = errors.response.data.message;
                        }
                    } catch (err) {
                        self.errors = err;
                    }

                    self.is_error = true;
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
