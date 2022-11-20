// import Vue from "vue";
import axios from "axios";
import mixin from "../mixin";

const state = {
    library: JSON.parse(localStorage.getItem("library") || null),
    myLibrariesResponse: null,
    libraryStatus: null
};

const getters = {
    library: state => state.library,
    myLibrariesResponse: state => state.myLibrariesResponse
};

const mutations = {
    setLibrary(state, library) {
        state.library = library;
        // localStorage.setItem("library", JSON.stringify(library));
    },
    setMyLibrariesResponse(state, myLibrariesResponse) {
        state.myLibrariesResponse = myLibrariesResponse;
        // localStorage.setItem("myLibrariesResponse", JSON.stringify(myLibrariesResponse));
    }
};

const actions = {
    fetchLibrary(context, libraryId) {
        var url = mixin.methods.getApiUrl("/api/libraries/" + libraryId);
        var headers = mixin.methods.getHeaderWithAuthorizationBearerToken();

        return new Promise((resolve, reject) => {
            axios
                .get(url, headers)
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

    fetchMyLibraries(context, payload) {
        var endpoint =
            "/api/users/" + this.getters.activeUser.id + "/libraries";
        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl(
                endpoint,
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
                    const myLibrariesResponse = response.data;
                    context.commit(
                        "setMyLibrariesResponse",
                        myLibrariesResponse
                    );
                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },
    fetchAllLibraries(context, payload) {
        var endpoint =
            "/api/libraries";
        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl(
                endpoint,
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
                    const myLibrariesResponse = response.data;
                    context.commit(
                        "setMyLibrariesResponse",
                        myLibrariesResponse
                    );
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
    actions
};
