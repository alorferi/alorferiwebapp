import axios from "axios";
import mixin from "@/mixin";

const state = {
    userFollowersResponse: { data: [], links: null, meta: null },
    userFollower: null,
    userFollowingByMe: null
};

const getters = {
    userFollower: state => state.userFollower,
    userFollowersResponse: state => state.userFollowersResponse,
    userFollowingByMe: state => state.userFollowingByMe
};

const mutations = {
    setUserFollowersResponse(state, newUserFollowersResponse) {
        if (state.userFollowersResponse.data.length == 0) {
            state.userFollowersResponse.data = newUserFollowersResponse.data;
        } else {
            newUserFollowersResponse.data.forEach(function(item) {
                state.userFollowersResponse.data.push(item);
            });
        }
        state.userFollowersResponse.links = newUserFollowersResponse.links;
        state.userFollowersResponse.meta = newUserFollowersResponse.meta;
    },
    clearUserFollowersResponse(state) {
        state.userFollowersResponse = { data: [], links: null, meta: null };
    },

    insertUserFollower(state, followerData) {
        state.userFollowersResponse.data.splice(0, 0, followerData);
        state.userFollowersResponse.meta.total =
            state.userFollowersResponse.meta.total + 1;
    },

    removeMeFromUserFollowers(state) {
        var activeUserId = this.getters.activeUser.id;

        state.userFollowersResponse.data.forEach(function(
            followerItem,
            index,
            arr
        ) {
            if (followerItem.attributes.user.id == activeUserId) {
                arr.splice(index, 1);
            }
        });

        state.userFollowersResponse.meta.total =
            state.userFollowersResponse.meta.total - 1;
    },

    setUserFollowingByMe(state, newFollowingByMe) {
        state.userFollowingByMe = newFollowingByMe;
    },

    clearUserFollowingByMe(state) {
        state.userFollowingByMe = null;
    }
};

const actions = {
    fetchUserFollowers(context, payload) {
        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl(
                "/api/users/" + payload.user_id + "/followers"
            );

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "GET"
            })
                .then(response => {
                    context.commit("clearUserFollowersResponse");

                    context.commit("setUserFollowersResponse", response.data);
                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },

    fetchUserFollowingByMe(context, payload) {
        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl(
                "/api/users/" + payload.user_id + "/following-by-me"
            );

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "GET"
            })
                .then(response => {
                    context.commit("clearUserFollowingByMe");
                    context.commit(
                        "setUserFollowingByMe",
                        response.data.data.attributes
                    );
                    resolve(response);
                })
                .catch(err => {
                    context.commit("clearUserFollowingByMe");
                    reject(err);
                });
        });
    },

    followUserByMe(context, payload) {
        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl(
                "/api/users/" + payload.user_id + "/follow"
            );

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "POST"
            })
                .then(response => {
                    context.commit("clearUserFollowingByMe");
                    context.commit(
                        "setUserFollowingByMe",
                        response.data.data.attributes
                    );
                    context.commit("insertUserFollower", response.data.data);

                    resolve(response);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        });
    },

    unFollowUserByMe(context, payload) {
        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl(
                "/api/users/" + payload.user_id + "/unfollow"
            );

            console.log("url", url);

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "DELETE"
            })
                .then(response => {
                    context.commit("removeMeFromUserFollowers");
                    context.commit("clearUserFollowingByMe");
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
