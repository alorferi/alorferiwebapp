import axios from "axios";
import mixin from "../mixin";

const state = {
    user: JSON.parse(localStorage.getItem("user") || null),
    activeUser: JSON.parse(localStorage.getItem("activeUser") || null),
    userStatus: null
};

const getters = {
    user: state => state.user,
    activeUser: state => state.activeUser
};

const mutations = {
    setUser(state, user) {
        state.user = user;
        localStorage.setItem("user", JSON.stringify(user));
    },
    setActiveUser(state, newUser) {
        state.activeUser = newUser;
        localStorage.setItem("activeUser", JSON.stringify(newUser));
    }
};

const actions = {
    fetchMe(context) {
        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl("/api/auth/me");
            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "GET"
            })
                .then(response => {
                    const user = response.data.data.attributes;
                    context.commit("setActiveUser", user);
                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },
    fetchUser(context,payload) {
        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl("/api/users/"+payload);
            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "GET"
            })
                .then(response => {
                    const user = response.data.data.attributes;
                    context.commit("setUser", user);
                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
