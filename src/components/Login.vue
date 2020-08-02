<template>
    <div class="card card-default">
        <div class="card-header">Login</div>
        <div class="card-body">
            <form class="login form-horizontal" @submit.prevent="login">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <i class="fas fa-mobile-alt"></i>
                        </span>

                        <select class="form-control" id="sel1">
                            <option>+880</option>
                        </select>
                    </div>

                    <input
                        id="username"
                        v-model="username"
                        type="text"
                        class="form-control"
                        name="username"
                        value
                        placeholder="Mobile number"
                        required
                        autofocus
                    />
                </div>

                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text"
                            ><i class="fas fa-key"></i
                        ></span>
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
            this.$router.push("/feeds");
        }
    },
    data() {
        return {
            username: "",
            password: ""
        };
    },
    methods: {
        login: function() {
            let username = this.username;
            let password = this.password;
            this.$store
                .dispatch("login", { username, password })
                .then(() => {
                    this.$router.push("/feeds");
                })
                .catch(err => console.log(err));
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
