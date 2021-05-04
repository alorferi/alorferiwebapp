// import Vue from "vue";
import axios from "axios";
import mixin from '../mixin'

const state = {
    libraryMember: JSON.parse(localStorage.getItem("libraryMember") || null),
    activeLibraryMember: JSON.parse(localStorage.getItem("activeLibraryMember") || null),
    libraryMembersResponse:null,
    libraryStatus: null
};

const getters = {
    libraryMember: state => state.libraryMember,
    activeLibraryMember: state => state.activeLibraryMember,
    libraryMembersResponse: state => state.libraryMembersResponse
};

const mutations = {
    setLibraryBook(state, libraryMember) {
        state.libraryMember = libraryMember;
        // localStorage.setItem("libraryMember", JSON.stringify(libraryMember));
    },
    setActiveLibraryBook(state, newLibraryMember) {
        state.setActiveLibraryBook = newLibraryMember;
        // localStorage.setItem("libraryMember", JSON.stringify(libraryMember));
    },
    setLibraryMembersResponse(state, libraryMembersResponse) {
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
        const  headers = mixin.methods.getAuthorizationBearerToken()

                axios({
                    url:url,
                    headers: headers ,
                    method: "GET"
                })
                .then(response => {
                    const libraryMembersResponse = response.data;
                    context.commit("setLibraryMembersResponse", libraryMembersResponse);
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
