import Vue from "vue";
import Vuex from "vuex";
import User from "@/store/user";
import PageTitle from "@/store/page-title";
import Auth from "@/store/auth";
import Library from "@/store/library";
import LibraryBook from "@/store/library-book";
import LibraryMember from "@/store/library-member";
import LibraryMemberRequest from "@/store/library-member-request";
import LibraryMemberIssue from "@/store/library-book-issue";
import Post from "@/store/post";
import Language from "@/store/language";
import Comment from "@/store/comment";
import Like from "@/store/like";
import UserPost from "@/store/user-post";
import UserFollower from "@/store/user-follower";
import Follower from "@/store/follower";
import LibraryFollower from "@/store/library-follower";
import UserFollowing from "@/store/user-following";
import LibraryPost from "@/store/library-post";
import Complain from "@/store/complain.js";
import Block from "@/store/block";
import Course from "@/store/course";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        User,
        PageTitle,
        Auth,
        Library,
        LibraryBook,
        LibraryMember,
        LibraryMemberRequest,
        LibraryMemberIssue,
        Post,
        Language,
        Comment,
        Like,
        UserPost,
        LibraryPost,
        Follower,
        UserFollower,
        UserFollowing,
        Complain,
        Block,
        LibraryFollower,
        Course
    },
    state: {},
    getters: {},
    mutations: {},
    actions: {}
});
