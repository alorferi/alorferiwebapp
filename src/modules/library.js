import Vue from "vue";
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
    fetchLibrary({ commit }) {
        return new Promise((resolve, reject) => {
            // commit("get_me_request");
            axios({
                url: Vue.prototype.$apiServerBaseUrl + "/api/auth/me",
                headers: {
                    Authorization:
                        "Bearer " +
                        JSON.parse(localStorage.getItem("token")).access_token
                },
                method: "GET"
            })
                .then(response => {
                    const library = response.data.data.attributes;
                    commit("setLibrary", library);
                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    // commit("get_me_error", err);
                    reject(err);
                });
        });
    },
    fetchMyLibraries(context,payload) {

        console.log(payload.term,payload.page);

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
    actions,
    mutations
};
