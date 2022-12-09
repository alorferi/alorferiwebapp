// import Vue from "vue";
import axios from "axios";
import mixin from '../mixin'

const state = {
    myLibraryMemberRequest: JSON.parse(localStorage.getItem("myLibraryMemberRequest") || null),
};

const getters = {
    myLibraryMemberRequest: state => state.myLibraryMemberRequest,
};

const mutations = {
     setMyLibraryMemberRequest(state, myLibraryMemberRequest) {
        state.myLibraryMemberRequest = myLibraryMemberRequest;
    }
};

const actions = {

    fetchMyLibraryMemberRequest(context,library_id) {

        const endPoint = "/api/libraries/"+library_id+"//member-requests/my-request"

        var url = mixin.methods.getApiUrl(endPoint)
        var headers = mixin.methods.getHeaderWithAuthorizationBearerToken()

        return new Promise((resolve, reject) => {
        axios
        .get(url,headers)
        .then(response => {
            const libraryMember = response.data.data.attributes;
            context.commit("setMyLibraryMemberRequest", libraryMember);
            resolve(response);

        })
        .catch(err => {
            context.commit("setMyLibraryMemberRequest", null);
            console.log("err:", err);
                    reject(err);
        });
    });
    },
    createLibraryMemberRequest(context,payload) {

        var url = mixin.methods.getApiUrl("/api/libraries/"+payload.library_id+"/member-requests")

        var headers = mixin.methods.getHeaderWithAuthorizationBearerToken()

        return new Promise((resolve, reject) => {
        axios
        .post(url,headers,payload)
        .then(response => {
            const myLibraryMemberRequest = response.data.data.attributes;
            context.commit("setMyLibraryMemberRequest", myLibraryMemberRequest);
            resolve(response);

        })
        .catch(err => {
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
    actions,
};
