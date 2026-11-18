import axios from "axios";
import mixin from "@/mixin";

const state = {};

const getters = {};

const mutations = {};

const actions = {
    fetchUserFollowers(context, payload) {
        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl("/api/users/" + payload.user_id + "/followers");

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "GET",
            })
                .then((response) => {
                    context.commit("clearFollowersResponse");

                    context.commit("setFollowersResponse", response.data);
                    resolve(response);
                })
                .catch((err) => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },

    fetchUserFollowingByMe(context, payload) {
        const source = "user:" + payload.user_id;
        context.commit("setFollowingSource", source);

        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl("/api/users/" + payload.user_id + "/following-by-me");

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "GET",
            })
                .then((response) => {
                    if (context.getters.followingSource !== source) {
                        resolve(response);
                        return;
                    }
                    context.commit("clearFollowingByMe");
                    context.commit("setFollowingByMe", response.data.data.attributes);
                    resolve(response);
                })
                .catch((err) => {
                    if (context.getters.followingSource === source) context.commit("clearFollowingByMe");
                    reject(err);
                });
        });
    },

    followUserByMe(context, payload) {
        const source = "user:" + payload.user_id;

        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl("/api/users/" + payload.user_id + "/follow");

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "POST",
            })
                .then((response) => {
                    if (context.getters.followingSource !== source) {
                        resolve(response);
                        return;
                    }
                    context.commit("clearFollowingByMe");
                    context.commit("setFollowingByMe", response.data.data.attributes);
                    context.commit("insertFollower", response.data.data);

                    resolve(response);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },

    unFollowUserByMe(context, payload) {
        const source = "user:" + payload.user_id;

        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl("/api/users/" + payload.user_id + "/unfollow");

            console.log("url", url);

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "DELETE",
            })
                .then((response) => {
                    if (context.getters.followingSource !== source) {
                        resolve(response);
                        return;
                    }
                    context.commit("removeMeFromFollowers");
                    context.commit("clearFollowingByMe");
                    resolve(response);
                })
                .catch((err) => {
                    console.log(err);
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
