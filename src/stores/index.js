import Vue from "vue";
import Vuex from "vuex";
import UserStore from "@/stores/user-store"
import PageTitleStore from "@/stores/page-title-store"
import AuthStore from "@/stores/auth-store"
import LibraryStore from "@/stores/library-store"
import LibraryBookStore from "@/stores/library-book-store"
import LibraryMemberStore from "@/stores/library-member-store"
import LibraryMemberIssueStore from "@/stores/library-book-issue-store"
import PostStore from "@/stores/post-store"
import LanguageStore from "@/stores/language-store"
import CommentStore from "@/stores/comment-store";
import LikeStore from "@/stores/like-store";

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        UserStore, PageTitleStore, AuthStore,LibraryStore, LibraryBookStore,LibraryMemberStore,LibraryMemberIssueStore,PostStore,LanguageStore,CommentStore,LikeStore,
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
