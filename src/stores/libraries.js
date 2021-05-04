// import Vue from "vue";
import axios from "axios";
import mixin from '../mixin'

const state = {
    library: JSON.parse(localStorage.getItem("library") || null),
    myLibraryResponse:null,
    libraryStatus: null
};

const getters = {
    library: state => state.library,
    myLibraryResponse: state => state.myLibraryResponse
};

const mutations = {
    setLibrary(state, library) {
        state.library = library;
        // localStorage.setItem("library", JSON.stringify(library));
    },
    setMyLibraryResponse(state, myLibraryResponse) {
        state.myLibraryResponse = myLibraryResponse;
        // localStorage.setItem("myLibraryResponse", JSON.stringify(myLibraryResponse));
    }
};

const actions = {

    fetchLibrary(context,libraryId) {

        var url = mixin.methods.getApiUrl("/api/libraries/"+libraryId)
        var headers = mixin.methods.getHeaderWithAuthorizationBearerToken()

        return new Promise((resolve, reject) => {
        axios
        .get(url,headers)
        .then(response => {
            const library = response.data.data.attributes;

            context.commit("setLibrary", library);
            resolve(response);

        })
        .catch(err => {
            console.log("err:", err);
                    reject(err);
        });
    });
    },

    fetchMyLibraries(context,payload) {


        return new Promise((resolve, reject) => {

        var url = mixin.methods.getApiUrl("/api/libraries/my-libraries",payload.term,payload.page)

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
                    const myLibraryResponse = response.data;
 // context.commit("get_me_request");
                    context.commit("setMyLibraryResponse", myLibraryResponse);
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
