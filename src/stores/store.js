import Vue from "vue";
import Vuex from "vuex";
import Users from "./users"
import PageTitle from "./page-title"
import Token from "./token"
import Libraries from "./libraries"
import LibraryBooks from "./library-books"
import LibraryMembers from "./library-members"
import LibraryMemberIssues from "./library-book-issues"

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
