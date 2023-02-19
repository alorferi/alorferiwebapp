import axios from "axios";
import mixin from "@/mixin";

const state = {
    followersResponse: { data: [], links: null, meta: null },
    follower: null,
    followingByMe: null
};

const getters = {
    follower: state => state.follower,
    followersResponse: state => state.followersResponse,
    followingByMe: state => state.followingByMe
};

const mutations = {
    setFollowersResponse(state, newFollowersResponse) {
        if (state.followersResponse.data.length == 0) {
            state.followersResponse.data = newFollowersResponse.data;
        } else {
            newFollowersResponse.data.forEach(function(item) {
                state.followersResponse.data.push(item);
            });
        }
        state.followersResponse.links = newFollowersResponse.links;
        state.followersResponse.meta = newFollowersResponse.meta;
    },
    clearFollowersResponse(state) {
        state.followersResponse = { data: [], links: null, meta: null };
    },

    insertFollower(state, followerData) {
        state.followersResponse.data.splice(0, 0, followerData);
        state.followersResponse.meta.total =
            state.followersResponse.meta.total + 1;
    },

    removeMeFromFollowers(state) {
        var activeUserId = this.getters.activeUser.id;

        state.followersResponse.data.forEach(function(
            followerItem,
            index,
            arr
        ) {
            if (followerItem.attributes.user.id == activeUserId) {
                arr.splice(index, 1);
            }
        });

        state.followersResponse.meta.total =
            state.followersResponse.meta.total - 1;
    },

    setFollowingByMe(state, newFollowingByMe) {
        state.followingByMe = newFollowingByMe;
    },

    clearFollowingByMe(state) {
        state.followingByMe = null;
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
                    context.commit("clearFollowersResponse");

                    context.commit("setFollowersResponse", response.data);
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
