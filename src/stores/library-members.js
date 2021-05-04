// import Vue from "vue";
import axios from "axios";
import mixin from '../mixin'

const state = {
    libraryMember: JSON.parse(localStorage.getItem("libraryMember") || null),
    libraryMembersResponse:null,
    libraryStatus: null
};

const getters = {
    libraryMember: state => state.libraryMember,
    libraryMembersResponse: state => state.libraryMembersResponse
};

const mutations = {
    setLibraryBook(state, libraryMember) {
        state.libraryMember = libraryMember;
        // localStorage.setItem("libraryMember", JSON.stringify(libraryMember));
    },
    setLibraryBooksResponse(state, libraryMembersResponse) {
        state.libraryMembersResponse = libraryMembersResponse;
        // localStorage.setItem("libraryMembersResponse", JSON.stringify(libraryMembersResponse));
    }
};

const actions = {

    fetchLibraryMember(context,memberId) {

        var url = mixin.methods.getApiUrl("/api/libraries/"+memberId)
        var headers = mixin.methods.getHeaderWithAuthorizationBearerToken()

        return new Promise((resolve, reject) => {
        axios
        .get(url,headers)
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

    fetchLibraryMembers(context,payload) {

        return new Promise((resolve, reject) => {

            const endPoint = "/api/libraries/"+payload.libraryId+"/members"

        var url = mixin.methods.getApiUrl(endPoint,payload.term,payload.page)

                axios({
                    url:url,
                    headers: {
                        Authorization:
                            "Bearer " +
                            JSON.parse(localStorage.getItem("token")).access_token
                    },
                    method: "GET"
                })
                .then(response => {
                    const libraryMembersResponse = response.data;
                    context.commit("setLibraryBooksResponse", libraryMembersResponse);
                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};
