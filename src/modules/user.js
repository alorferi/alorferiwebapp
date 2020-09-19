import Vue from "vue";
import axios from "axios";

const state = {
    user: JSON.parse(localStorage.getItem("user") || null) ,
    userStatus:null
};

const getters = {
    user: state => state.user,
};

const actions = {
    fetchMe({ commit }) {
        return new Promise((resolve, reject) => {
            // commit("get_me_request");
            axios({
                url: Vue.prototype.$apiServerBaseUrl + "/api/auth/me",
                headers:{
                    Authorization: 'Bearer ' + localStorage.getItem("access_token")
                },
                method: "GET"
            })
                .then(response => {
                    const user = response.data.data;
                    localStorage.setItem("user", JSON.stringify(user));
                    commit("setAuthUser", user);
                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err)
                    // commit("get_me_error", err);
                    reject(err);
                });
        });
    },
};

const mutations = {
    setAuthUser(state,user){
        state.user = user
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
