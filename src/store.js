import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

// let base_url = "http://localhost:3000"
let base_url = "http://testpanel.alorferi.com/api/v0";
// let base_url = "http://alorfericpanelsrv.test/api/v0";

export default new Vuex.Store({
    state: {
        status: "",
        token: localStorage.getItem("token") || "",
        user: {}
    },
    mutations: {
        auth_request(state) {
            state.status = "loading";
        },
        auth_success(state, token, user) {
            state.status = "success";
            state.token = token;
            state.user = user;
        },
        auth_error(state) {
            state.status = "error";
        },
        logout(state) {
            state.status = "";
            state.token = "";
        }
    },
    actions: {
        login({ commit }, userCredential) {
            return new Promise((resolve, reject) => {
                commit("auth_request");

                userCredential.client_id = 3;
                userCredential.client_secret =
                    "PkkKhDJLjukY15REt16yu35bL34xYov5SiEqJ10Q";

                console.log(userCredential);

                let login_url = base_url + "/oauth/token";
                console.log(login_url);
                axios({
                    url: login_url,
                    data: userCredential,
                    method: "POST",
                    headers: { "Content-Type": "application/json" }
                })
                    .then(resp => {
                        console.log(resp.data);

                        if (resp.data.status == "OK") {
                            alert("login");
                        } else {
                            alert("failed");
                        }

                        const token = resp.data.token;
                        const user = resp.data.user;
                        localStorage.setItem("token", token);
                        // Add the following line:
                        axios.defaults.headers.common["Authorization"] = token;
                        commit("auth_success", token, user);
                        resolve(resp);
                    })
                    .catch(err => {
                        console.log(err);
                        commit("auth_error");
                        localStorage.removeItem("token");
                        reject(err);
                    });
            });
        },
        register({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit("auth_request");
                axios({
                    url: base_url + "/register",
                    data: user,
                    method: "POST"
                })
                    .then(resp => {
                        const token = resp.data.token;
                        const user = resp.data.user;
                        localStorage.setItem("token", token);
                        // Add the following line:
                        axios.defaults.headers.common["Authorization"] = token;
                        commit("auth_success", token, user);
                        resolve(resp);
                    })
                    .catch(err => {
                        commit("auth_error", err);
                        localStorage.removeItem("token");
                        reject(err);
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
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status
    }
});
