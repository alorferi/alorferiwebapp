import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        status: "",
        access_token: localStorage.getItem("access_token") || "",
        user: {},
        my_libraries: []
    },
    getters: {
        isLoggedIn: state => !!state.access_token,
        authStatus: state => state.status
    },
    mutations: {
        auth_request(state, status) {
            state.status = status;
        },
        auth_success(state, access_token, user) {
            state.status = "success";
            state.access_token = access_token;
            state.user = user;
        },
        auth_error(state) {
            state.status = "error";
        },
        logout(state) {
            state.status = "";
            state.access_token = "";
        }
    },
    actions: {
        login({ commit }, loginCredential) {
            return new Promise((resolve, reject) => {
                commit("auth_request", "loading");

                loginCredential.client_id = Vue.prototype.$apiClientId;
                loginCredential.client_secret = Vue.prototype.$apiClientSecret;
                loginCredential.grant_type = "password";

                console.log("paylod", loginCredential);

                let login_url =
                    Vue.prototype.$apiServerBaseUrl + "/oauth/token";
                // alert(login_url);
                console.log("url", login_url);
                axios({
                    url: login_url,
                    data: loginCredential,
                    method: "POST",
                    headers: { "Content-Type": "application/json" }
                })
                    .then(response => {
                        console.log(response.data);

                        const access_token = response.data.access_token;
                        const user = response.data.user;
                        localStorage.setItem("access_token", access_token);
                        // Add the following line:
                        axios.defaults.headers.common[
                            "Authorization"
                        ] = access_token;
                        commit("auth_success", access_token, user);
                        resolve(response);
                    })
                    .catch(error => {
                        console.log(error);
                        commit("auth_error");
                        localStorage.removeItem("access_token");

                        if (error.response.data.error == "invalid_grant") {
                            reject("Mobile Number or Password is Invalid.");
                        } else {
                            reject(error);
                        }
                    });
            });
        },
        register({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit("auth_request");
                axios({
                    url: Vue.prototype.$apiServerBaseUrl + "/register",
                    data: user,
                    method: "POST"
                })
                    .then(response => {
                        const access_token = response.data.access_token;
                        const user = response.data.user;
                        localStorage.setItem("access_token", access_token);
                        // Add the following line:
                        axios.defaults.headers.common[
                            "Authorization"
                        ] = access_token;
                        commit("auth_success", access_token, user);
                        resolve(response);
                    })
                    .catch(err => {
                        commit("auth_error", err);
                        localStorage.removeItem("access_token");
                        reject(err);
                    });
            });
        },
        logout({ commit }) {
            return new Promise(resolve => {
                commit("logout");
                localStorage.removeItem("access_token");
                delete axios.defaults.headers.common["Authorization"];
                resolve();
            });
        }
    }
});
