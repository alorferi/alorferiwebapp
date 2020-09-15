import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        status: "",
        access_token: localStorage.getItem("access_token") || "",
        user: JSON.parse(localStorage.getItem("user") || null) ,
        my_libraries: []
    },
    getters: {
        isLoggedIn: state => !!state.access_token,
        authStatus: state => state.status,
        user: state => state.user
    },
    mutations: {
        auth_request(state, status) {
            state.status = status;
        },
        oauth_success(state, access_token) {
            state.status = "success";
            state.access_token = access_token;
        },
        get_me_success(state, user) {
            state.status = "success";
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


                let login_url =
                    Vue.prototype.$apiServerBaseUrl + "/oauth/token";
                // alert(login_url);
                axios({
                    url: login_url,
                    data: loginCredential,
                    method: "POST",
                    headers: { "Content-Type": "application/json" }
                })
                    .then(response => {

                        const access_token = response.data.access_token;
                        localStorage.setItem("access_token", access_token);
                        // Add the following line:
                        axios.defaults.headers.common[
                            "Authorization"
                        ] = access_token;
                        commit("oauth_success", access_token);
                        resolve(response);
                    })
                    .catch(error => {
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
                commit("reg_request");
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
                        commit("reg_success", access_token, user);
                        resolve(response);
                    })
                    .catch(err => {
                        commit("reg_error", err);
                        localStorage.removeItem("access_token");
                        reject(err);
                    });
            });
        },
        getMe({ commit }) {
            return new Promise((resolve, reject) => {
                // commit("get_me_request");
                axios({
                    url: Vue.prototype.$apiServerBaseUrl + "/api/user/me",
                    headers:{
                        Authorization: 'Bearer ' + localStorage.getItem("access_token")
                    },
                    method: "GET"
                })
                    .then(response => {
                        const user = response.data.data;
                        localStorage.setItem("user", JSON.stringify(user));
                        commit("get_me_success", user);
                        resolve(response);
                    })
                    .catch(err => {
                        console.log("err:", err)
                        // commit("get_me_error", err);
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
