import Vue from "vue";
import Vuex from "vuex";
import Users from "@/stores/users"
import PageTitle from "@/stores/page-title"
import Auth from "@/stores/auth"
import Libraries from "@/stores/libraries"
import LibraryBooks from "@/stores/library-books"
import LibraryMembers from "@/stores/library-members"
import LibraryMemberIssues from "@/stores/library-book-issues"
import UserPosts from "@/stores/user-posts"
import Posts from "@/stores/posts"
import Language from "@/stores/language"
import Comments from "@/stores/comments";
import Likes from "@/stores/likes";

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        Users, PageTitle, Auth,Libraries, LibraryBooks,LibraryMembers,LibraryMemberIssues,UserPosts,Language,Comments,Likes,
        Posts
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
