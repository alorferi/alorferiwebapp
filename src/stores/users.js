import Vue from "vue";
import axios from "axios";

const state = {
    user: JSON.parse(localStorage.getItem("user") || null) ,
    userStatus:null
};

const getters = {
    user: state => state.user,
};


const mutations = {
    setUser(state,user){
        state.user = user
    }
};

const actions = {
    fetchMe({ commit }) {
        return new Promise((resolve, reject) => {
            // commit("get_me_request");
            axios({
                url: Vue.prototype.$apiServerBaseUrl + "/api/auth/me",
                headers:{
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("token")).access_token
                },
                method: "GET"
            })
                .then(response => {
                    const user = response.data.data.attributes;
                    localStorage.setItem("user", JSON.stringify(user));
                    commit("setUser", user);
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


export default {
    state,
    getters,
    mutations,
    actions,

};
