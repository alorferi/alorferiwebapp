import axios from "axios";
import mixin from "@/mixin";

const state = {};

const getters = {};

const mutations = {};

const actions = {
    fetchLibraryFollowers(context, payload) {
        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl(
                "/api/libraries/" + payload.library_id + "/followers"
            );

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "GET"
            })
                .then(response => {
                    context.commit("clearFollowersResponse");

                    context.commit(
                        "setFollowersResponse",
                        response.data
                    );
                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },

    fetchLibraryFollowingByMe(context, payload) {
        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl(
                "/api/libraries/" + payload.library_id + "/following-by-me"
            );

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "GET"
            })
                .then(response => {
                    context.commit("clearFollowingByMe");
                    context.commit(
                        "setFollowingByMe",
                        response.data.data.attributes
                    );
                    resolve(response);
                })
                .catch(err => {
                    context.commit("clearFollowingByMe");
                    reject(err);
                });
        });
    },

    followLibraryByMe(context, payload) {
        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl(
                "/api/libraries/" + payload.library_id + "/follow"
            );

            console.log("url", url);

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "POST"
            })
                .then(response => {
                    context.commit("clearFollowingByMe");
                    context.commit(
                        "setFollowingByMe",
                        response.data.data.attributes
                    );
                    context.commit("insertFollower", response.data.data);

                    resolve(response);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        });
    },

    unFollowLibraryByMe(context, payload) {
        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl(
                "/api/libraries/" + payload.library_id + "/unfollow"
            );

            console.log("url", url);

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "DELETE"
            })
                .then(response => {
                    context.commit("removeMeFromFollowers");
                    context.commit("clearFollowingByMe");
                    resolve(response);
                })
                .catch(err => {
                    console.log(err);
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
