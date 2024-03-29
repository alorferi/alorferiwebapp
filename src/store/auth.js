import Vue from "vue";
import axios from "axios";

const state = {
    token: JSON.parse(localStorage.getItem("token") || null),
    otc_token: JSON.parse(localStorage.getItem("otc_token") || null)
};
const getters = {
    access_token: state => {
        return state.token;
    },
    otc_token: state => {
        return state.otc_token;
    },
    isLoggedIn: state => state.token != null
};

const mutations = {
    setToken: (state, token) => {
        state.token = token;
    },
    setOtcToken: (state, otc_token) => {
        state.otc_token = otc_token;
    },
    logout(state) {
        state.token = null;
    }
};

const actions = {
    loginOauth({ commit }, loginCredential) {
        return new Promise((resolve, reject) => {
            loginCredential.client_id = Vue.prototype.$apiClientId;
            loginCredential.client_secret = Vue.prototype.$apiClientSecret;
            loginCredential.grant_type = "password";

            let login_url = Vue.prototype.$apiServerBaseUrl + "/oauth/token";
            axios({
                url: login_url,
                data: loginCredential,
                method: "POST",
                headers: { "Content-Type": "application/json" }
            })
                .then(response => {
                    const token = response.data;
                    localStorage.setItem("token", JSON.stringify(token));
                    // Add the following line:
                    axios.defaults.headers.common["Authorization"] = token;
                    commit("setToken", token);
                    resolve(response);
                })
                .catch(error => {
                    localStorage.removeItem("token");

                    switch (error.response.data.error) {
                        case "invalid_grant":
                            reject("Mobile Number or Password does not match.");
                            break;

                        case "invalid_request":
                            reject(error.response.data.hint);
                            break;

                        default:
                            reject(error);
                            break;
                    }
                });
        });
    },
    loginBasic({ commit }, loginCredential) {
        return new Promise((resolve, reject) => {
            let login_url = Vue.prototype.$apiServerBaseUrl + "/api/auth/login";
            axios({
                url: login_url,
                data: loginCredential,
                method: "POST",
                headers: { "Content-Type": "application/json" }
            })
                .then(response => {
                    const token = response.data.data.token;
                    localStorage.setItem("token", JSON.stringify(token));
                    // Add the following line:
                    axios.defaults.headers.common["Authorization"] = token;
                    commit("setToken", token);
                    resolve(response);
                })
                .catch(error => {
                    localStorage.removeItem("token");

                    switch (error.response.data.error) {
                        case "invalid_grant":
                            reject("Mobile Number or Password does not match.");
                            break;

                        case "invalid_request":
                            reject(error.response.data.hint);
                            break;

                        default:
                            reject(error);
                            break;
                    }
                });
        });
    },
    loginWithOtc({ commit }, dataModel) {
        return new Promise((resolve, reject) => {
            let login_url =
                Vue.prototype.$apiServerBaseUrl + "/api/auth/login-with-otc";
            axios({
                url: login_url,
                data: dataModel.data,
                method: "POST",
                headers: dataModel.headers
            })
                .then(response => {
                    switch (response.data.status) {
                        case "OK":
                            var otc_token = response.data.data.token;

                            localStorage.setItem(
                                "otc_token",
                                JSON.stringify(otc_token)
                            );

                            commit("setOtcToken", otc_token);
                            resolve(response);
                            break;
                        case "OTC_GENERATED":
                        case "OTC_REJECTED":
                            resolve(response);
                            break;
                    }
                })
                .catch(error => {
                    localStorage.removeItem("otc_token");

                    switch (error.response.data.error) {
                        case "invalid_grant":
                            reject("Mobile Number or Password does not match.");
                            break;

                        case "invalid_request":
                            reject(error.response.data.hint);
                            break;

                        default:
                            reject(error);
                            break;
                    }
                });
        });
    },
    resetPassword(context, dataModel) {
        return new Promise((resolve, reject) => {
            let login_url =
                Vue.prototype.$apiServerBaseUrl + "/api/auth/reset-password";

            const otc_token = JSON.parse(localStorage.getItem("otc_token") || null)

            let headers = {
                Authorization: "Bearer " + otc_token
            };

            axios({
                url: login_url,
                data: dataModel,
                method: "POST",
                headers: headers
            })
                .then(response => {
                    switch (response.data.status) {
                        case "OK":
                            localStorage.removeItem("otc_token");
                            break;
                    }
                    resolve(response);
                })
                .catch(error => {
                    switch (error.response.data.error) {
                        case "invalid_grant":
                            reject("Mobile Number or Password does not match.");
                            break;

                        case "invalid_request":
                            reject(error.response.data.hint);
                            break;

                        default:
                            reject(error);
                            break;
                    }
                });
        });
    },
    logout({ commit }) {
        return new Promise(resolve => {
            commit("logout");
            localStorage.removeItem("token");
            localStorage.removeItem("otc_token");
            delete axios.defaults.headers.common["Authorization"];
            resolve();
        });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
