import Vue from "vue";
import Vuex from "vuex";
import User from "@/store/user"
import PageTitle from "@/store/page-title"
import Auth from "@/store/auth"
import Library from "@/store/library"
import LibraryBook from "@/store/library-book"
import LibraryMember from "@/store/library-member"
import LibraryMemberIssue from "@/store/library-book-issue"
import Post from "@/store/post"
import Language from "@/store/language"
import Comment from "@/store/comment";
import Like from "@/store/like";
import UserPost from "@/store/user-post";
import LibraryPost from "@/store/library-post";

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        User, PageTitle, Auth,Library,
        LibraryBook,LibraryMember,
        LibraryMemberIssue,Post,
        Language,Comment,Like,
        UserPost,
        LibraryPost,
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
