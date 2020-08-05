import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

<<<<<<< HEAD
export default new Vuex.Store({
    state: {
        status: "",
        access_token: localStorage.getItem("access_token") || "",
        user: {}
    },
    mutations: {
        auth_request(state) {
            state.status = "loading";
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
                commit("auth_request");

                loginCredential.client_id = Vue.prototype.$apiClientId;
                loginCredential.client_secret = Vue.prototype.$apiClientSecret;
                loginCredential.grant_type = "password";

                console.log(loginCredential);

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
                    .then(resp => {
                        console.log(resp.data);

                        const access_token = resp.data.access_token;
                        const user = resp.data.user;
                        localStorage.setItem("access_token", access_token);
                        // Add the following line:
                        axios.defaults.headers.common[
                            "Authorization"
                        ] = access_token;
                        commit("auth_success", access_token, user);
                        resolve(resp);
                    })
                    .catch(err => {
                        console.log(err);
                        commit("auth_error");
                        localStorage.removeItem("access_token");
                        reject(err);
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
                    .then(resp => {
                        const access_token = resp.data.access_token;
                        const user = resp.data.user;
                        localStorage.setItem("access_token", access_token);
                        // Add the following line:
                        axios.defaults.headers.common[
                            "Authorization"
                        ] = access_token;
                        commit("auth_success", access_token, user);
                        resolve(resp);
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
    },
    getters: {
        isLoggedIn: state => !!state.access_token,
        authStatus: state => state.status
    }
});
=======
// let base_url = "http://localhost:3000"
let base_url = "http://cpanel.alorferi.com/api/v0"
// let base_url = "http://alorfericpanelsrv.test/api/v0"

export default new Vuex.Store({
	state: {
		status: '',
		token: localStorage.getItem('token') || '',
		user: {}
	},
	mutations: {
		auth_request(state) {
			state.status = 'loading'
		},
		auth_success(state, token, user) {
			state.status = 'success'
			state.token = token
			state.user = user
		},
		auth_error(state) {
			state.status = 'error'
		},
		logout(state) {
			state.status = ''
			state.token = ''
		},
	},
	actions: {
		login({ commit }, user) {
			return new Promise((resolve, reject) => {
				commit('auth_request')
				console.log(user)
				let login_url = base_url + "/auth/login";
				console.log(login_url)
				axios({ url: login_url, data: user, method: 'POST', headers: { 'Content-Type': 'application/json' } })
					.then(resp => {
						console.log(resp.data)
						const token = resp.data.token
						const user = resp.data.user
						localStorage.setItem('token', token)
						// Add the following line:
						axios.defaults.headers.common['Authorization'] = token
						commit('auth_success', token, user)
						resolve(resp)
					})
					.catch(err => {
						commit('auth_error')
						localStorage.removeItem('token')
						reject(err)
					})
			})
		},
		register({ commit }, user) {
			return new Promise((resolve, reject) => {
				commit('auth_request')
				axios({ url: base_url + '/register', data: user, method: 'POST' })
					.then(resp => {
						const token = resp.data.token
						const user = resp.data.user
						localStorage.setItem('token', token)
						// Add the following line:
						axios.defaults.headers.common['Authorization'] = token
						commit('auth_success', token, user)
						resolve(resp)
					})
					.catch(err => {
						commit('auth_error', err)
						localStorage.removeItem('token')
						reject(err)
					})
			})
		},
		logout({ commit }) {
			return new Promise((resolve) => {
				commit('logout')
				localStorage.removeItem('token')
				delete axios.defaults.headers.common['Authorization']
				resolve()
			})
		}
	},
	getters: {
		isLoggedIn: state => !!state.token,
		authStatus: state => state.status,
	}
})
>>>>>>> parent of 4463ec0... Merge branch 'development' of https://github.com/alorferi/alorferiwebapp into development
