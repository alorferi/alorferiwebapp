// import Vue from "vue";
import axios from "axios";
import mixin from "../mixin";

const state = {
    library: JSON.parse(localStorage.getItem("library") || null),
    myLibrariesResponse: null,
    libraryCoverUrl: null,
    libraryStatus: null,
};

const getters = {
    library: state => state.library,
    myLibrariesResponse: state => state.myLibrariesResponse,
    libraryCoverUrl: state => state.libraryCoverUrl,
};

const mutations = {
    setLibrary(state, library) {
        state.library = library;
    },
    setLibraryCoverUrl(state, libraryCoverUrl) {
        state.libraryCoverUrl = libraryCoverUrl;
    },
    setMyLibrariesResponse(state, myLibrariesResponse) {
        state.myLibrariesResponse = myLibrariesResponse;
    },
};

const actions = {
    fetchLibrary(context, library_id) {
        var url = mixin.methods.getApiUrl("/api/libraries/" + library_id);
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

    fetchSearchLibrary(context, username) {
        var url = mixin.methods.getApiUrl("/api/searches/" + username);
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
    },
    uploadLibraryCoverPhoto(context, packet) {
        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl(
                "/api/libraries/" + packet.library_id + "/upload-cover-photo"
            );

            const headers = mixin.methods.getAuthorizationBearerToken();
            headers["Content-Type"] = "multipart/form-data";

            const formData = packet.formData;

            axios({
                url: url,
                headers: headers,
                method: "POST",
                data: formData
            })
                .then(response => {
                    const cover_url =
                        response.data.data + "?tick=" + Date.now();
                    context.commit("setLibraryCoverUrl", cover_url);
                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },
    uploadLibraryLogo(context, packet) {
        return new Promise((resolve, reject) => {
            const self = this;

            var url = mixin.methods.getApiUrl("/api/libraries/"+packet.library_id+"/upload-logo");

            const headers = mixin.methods.getAuthorizationBearerToken();
            headers["Content-Type"] = "multipart/form-data";

            const formData = packet.formData;

            axios({
                url: url,
                headers: headers,
                method: "POST",
                data: formData
            })
                .then(response => {

                    const logo_url =
                        response.data.data + "?tick=" + Date.now();

                    const library = self.getters.library;
                    library.logo_url = logo_url;

                    context.commit("setLibrary", library);

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
    actions
};
