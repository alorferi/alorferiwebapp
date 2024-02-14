// import Vue from "vue";
import axios from "axios";
import mixin from '../mixin'

const state = {
    libraryBook: JSON.parse(localStorage.getItem("libraryBook") || null),
    libraryBooksResponse:null,
    libraryStatus: null
};

const getters = {
    libraryBook: state => state.libraryBook,
    libraryBooksResponse: state => state.libraryBooksResponse
};

const mutations = {
    setLibraryBook(state, libraryBook) {
        state.libraryBook = libraryBook;
    },
    setLibraryBooksResponse(state, libraryBooksResponse) {
        state.libraryBooksResponse = libraryBooksResponse;
    }
};

const actions = {

    fetchLibraryBook(context,library_id) {

        var url = mixin.methods.getApiUrl("/api/libraries/"+library_id)
        var headers = mixin.methods.getHeaderWithAuthorizationBearerToken()

        return new Promise((resolve, reject) => {
        axios
        .get(url,headers)
        .then(response => {
            const libraryBook = response.data.data.attributes;

            context.commit("setLibraryBook", libraryBook);
            resolve(response);

        })
        .catch(err => {
            console.log("err:", err);
                    reject(err);
        });
    });
    },

    fetchLibraryBooks(context,payload) {

        return new Promise((resolve, reject) => {

            const endPoint = "/api/libraries/"+payload.library_id+"/books"

        var url = mixin.methods.getApiUrl(endPoint,payload.term,payload.page)

        const  headers = mixin.methods.getAuthorizationBearerToken()

                axios({
                    url:url,
                    headers: headers,
                    method: "GET"
                })
                .then(response => {
                    const libraryBooksResponse = response.data;
 // context.commit("get_me_request");
                    context.commit("setLibraryBooksResponse", libraryBooksResponse);
                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    // context.commit("get_me_error", err);
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
