import Vue from "vue";
import Vuex from "vuex";
import Users from "./modules/users"
import PageTitle from "./modules/page-title"
import Token from "./modules/token"
import Libraries from "./modules/libraries"
import LibraryBooks from "./modules/library-books"
import LibraryMembers from "./modules/library-members"
import LibraryMemberIssues from "./modules/library-book-issues"

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        Users, PageTitle, Token,Libraries, LibraryBooks,LibraryMembers,LibraryMemberIssues
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
