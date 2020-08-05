<template>
    <div class="card card-default">
        <div class="card-header">Welcome to Alor Feri</div>
        <div class="card-body">
            <form class="login form-horizontal" @submit.prevent="login">
                <div class="input-group mb-3">
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
                        size="11"
                        minlength="10"
                        maxlength="11"
                        pattern="([0-9]{10})|([0-9]{11})"
                        required
                        autofocus
                    />
                </div>

                <div class="input-group">
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
                </div>

                <div
                    class="form-group d-flex justify-content-between align-items-center w-100"
                >
                    <div>
                        <input type="checkbox" name="remember" />
                        Remember Me
                    </div>

                    <router-link
                        :to="{ name: 'forgot-password' }"
                        class="btn btn-link"
                    >
                        Forgot password?
                    </router-link>
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-primary w-100">
                        Login
                    </button>
                </div>
                <div class="form-group">
                    <router-link
                        :to="{ name: 'register' }"
                        class="btn btn-success w-100"
                    >
                        Join Now
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    props: {
        msg: String
    },
    mounted: function() {
        if (this.$store.getters.isLoggedIn) {
            this.$router.push({ name: "home" });
        }
    },
    data() {
        return {
            username: "",
            password: "",
            country_code: "+880"
        };
    },
    methods: {
        login: function() {
            let username = this.country_code + this.username.replace(/^0+/, "");
            let password = this.password;
            this.$store
                .dispatch("login", { username, password })
                .then(() => {
                    this.$router.push({ name: "home" });
                })
                .catch(err => console.log(err));
        },
        onBlurMobileNumber(e) {
            console.log("blur", e.target.value);
            var value = parseInt(e.target.value, 10);
            if (isNaN(value) == false) {
                e.target.value = value;
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
