
import Vue from "vue";
import axios from "axios";

const state = {
    token: JSON.parse(localStorage.getItem("token") || null)

};
const getters = {
    access_token: state => {
        return state.token.access_token;
    },
    isLoggedIn: state => state.token != null ,
};
const actions = {
    login({ commit }, loginCredential) {
        return new Promise((resolve, reject) => {

            loginCredential.client_id = Vue.prototype.$apiClientId;
            loginCredential.client_secret = Vue.prototype.$apiClientSecret;
            loginCredential.grant_type = "password";


            let login_url =
                Vue.prototype.$apiServerBaseUrl + "/oauth/token";
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
                    axios.defaults.headers.common[
                        "Authorization"
                    ] = token.access_token;
                    commit("setToken", token);
                    resolve(response);
                })
                .catch(error => {
                    localStorage.removeItem("token");


                    switch(error.response.data.error){
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
            delete axios.defaults.headers.common["Authorization"];
            resolve();
        });
    }
};
const mutations = {
    setToken: (state, token) => {
        state.token = token
    },
    logout(state) {
        state.token = null;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
