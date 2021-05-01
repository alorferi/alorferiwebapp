import Vue from "vue";
import Vuex from "vuex";
import User from "./modules/user"
import PageTitle from "./modules/page-title"
import Token from "./modules/token"
import Library from "./modules/library"

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        User, PageTitle, Token,Library
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
