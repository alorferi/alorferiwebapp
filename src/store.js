import Vue from "vue";
import Vuex from "vuex";
import Users from "./modules/users"
import PageTitle from "./modules/page-title"
import Token from "./modules/token"
import Libraries from "./modules/libraries"

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        Users, PageTitle, Token,Libraries
    },
    state: {
    },
    getters: {

    },
    mutations: {
    },
    actions: {

    }
});
