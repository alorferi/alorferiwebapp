import Vue from "vue";
import Vuex from "vuex";
import Users from "@/store/users"
import PageTitle from "@/store/page-title"
import Auth from "@/store/auth"
import Libraries from "@/store/libraries"
import LibraryBooks from "@/store/library-books"
import LibraryMembers from "@/store/library-members"
import LibraryMemberIssues from "@/store/library-book-issues"
import Posts from "@/store/posts"
import Language from "@/store/language"
import Comments from "@/store/comments";
import Likes from "@/store/likes";

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
