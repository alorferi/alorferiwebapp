import Vue from "vue";
import Vuex from "vuex";
import Users from "./modules/users"
import PageTitle from "./modules/page-title"
import Token from "./modules/token"
import Libraries from "./modules/libraries"
import LibraryBooks from "./modules/library-books"
import LibraryMembers from "./modules/library-members"

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        Users, PageTitle, Token,Libraries, LibraryBooks,LibraryMembers
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
