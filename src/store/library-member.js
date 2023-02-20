// import Vue from "vue";
import axios from "axios";
import mixin from "../mixin";

const state = {
    libraryMember: JSON.parse(localStorage.getItem("libraryMember") || null),
    activeLibraryMember: JSON.parse(
        localStorage.getItem("activeLibraryMember") || null
    ),
    myLibraryMembership: JSON.parse(
        localStorage.getItem("myLibraryMembership") || null
    ),
    libraryMembersResponse: null,
    libraryStatus: null
};

const getters = {
    libraryMember: state => state.libraryMember,
    activeLibraryMember: state => state.activeLibraryMember,
    libraryMembersResponse: state => state.libraryMembersResponse,
    myLibraryMembership: state => state.myLibraryMembership
};

const mutations = {
    // setLibraryBook(state, libraryMember) {
    //     state.libraryMember = libraryMember;
    // },
    // setActiveLibraryBook(state, newLibraryMember) {
    //     state.setActiveLibraryBook = newLibraryMember;
    // },
    setLibraryMembersResponse(state, libraryMembersResponse) {
        state.libraryMembersResponse = libraryMembersResponse;
    },
    setMyLibraryMembership(state, myLibraryMembership) {
        state.myLibraryMembership = myLibraryMembership;
    }
};

const actions = {
    fetchLibraryMember(context, memberId) {
        var url = mixin.methods.getApiUrl("/api/libraries/" + memberId);
        var headers = mixin.methods.getHeaderWithAuthorizationBearerToken();

        return new Promise((resolve, reject) => {
            axios
                .get(url, headers)
                .then(response => {
                    const libraryMember = response.data.data.attributes;
                    context.commit("setLibraryBook", libraryMember);
                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },

    fetchLibraryMembers(context, payload) {
        return new Promise((resolve, reject) => {
            const endPoint =
                "/api/libraries/" + payload.library_id + "/members";

            var url = mixin.methods.getApiUrl(
                endPoint,
                payload.term,
                payload.page
            );
            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "GET"
            })
                .then(response => {
                    const libraryMembersResponse = response.data;
                    context.commit(
                        "setLibraryMembersResponse",
                        libraryMembersResponse
                    );
                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },
    fetchMyLibraryMembership(context, library_id) {
        const endPoint =
            "/api/libraries/" + library_id + "/members/my-membership";

        var url = mixin.methods.getApiUrl(endPoint);
        var headers = mixin.methods.getHeaderWithAuthorizationBearerToken();

        return new Promise((resolve, reject) => {
            axios
                .get(url, headers)
                .then(response => {
                    const libraryMember = response.data.data.attributes;
                    context.commit("setMyLibraryMembership", libraryMember);
                    resolve(response);
                })
                .catch(err => {
                    context.commit("setMyLibraryMembership", null);
                    console.log("err:", err);
                    reject(err);
                });
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
