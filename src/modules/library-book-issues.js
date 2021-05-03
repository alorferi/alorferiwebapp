// import Vue from "vue";
import axios from "axios";
import mixin from '../mixin'

const state = {
    libraryBookIssue: JSON.parse(localStorage.getItem("libraryBookIssue") || null),
    libraryBookIssuesResponse:null,
    libraryStatus: null
};

const getters = {
    libraryBookIssue: state => state.libraryBookIssue,
    libraryBookIssuesResponse: state => state.libraryBookIssuesResponse
};

const mutations = {
    setLibraryBook(state, libraryBookIssue) {
        state.libraryBookIssue = libraryBookIssue;
        // localStorage.setItem("libraryBookIssue", JSON.stringify(libraryBookIssue));
    },
    setLibraryBookIssuesResponse(state, libraryBookIssuesResponse) {
        state.libraryBookIssuesResponse = libraryBookIssuesResponse;
        // localStorage.setItem("libraryBookIssuesResponse", JSON.stringify(libraryBookIssuesResponse));
    }
};

const actions = {

    fetchLibraryBookIssue(context,libraryId) {

        var url = mixin.methods.getApiUrl("/api/libraries/"+libraryId)
        var headers = mixin.methods.getHeaderWithAuthorizationBearerToken()

        return new Promise((resolve, reject) => {
        axios
        .get(url,headers)
        .then(response => {
            const libraryBookIssue = response.data.data.attributes;

            context.commit("setLibraryBook", libraryBookIssue);
            resolve(response);

        })
        .catch(err => {
            console.log("err:", err);
                    reject(err);
        });
    });
    },

    fetchLibraryBookIssues(context,payload) {

        return new Promise((resolve, reject) => {

            const endPoint = "/api/libraries/"+payload.libraryId+"/book-issues"

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
                    const libraryBookIssuesResponse = response.data;
                    context.commit("setLibraryBookIssuesResponse", libraryBookIssuesResponse);
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
    actions,
    mutations
};
