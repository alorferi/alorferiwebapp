import Vue from "vue";
import Vuex from "vuex";
import Users from "./users"
import PageTitle from "./page-title"
import Auth from "./auth"
import Libraries from "./libraries"
import LibraryBooks from "./library-books"
import LibraryMembers from "./library-members"
import LibraryMemberIssues from "./library-book-issues"
import Posts from "./posts"
import Language from "./language"
import Comments from "./comments";
import Likes from "./likes";

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        Users, PageTitle, Auth,Libraries, LibraryBooks,LibraryMembers,LibraryMemberIssues,Posts,Language,Comments,Likes
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
