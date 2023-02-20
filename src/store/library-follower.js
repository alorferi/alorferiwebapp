import axios from "axios";
import mixin from "@/mixin";

const state = {
    libraryFollowersResponse: { data: [], links: null, meta: null },
    libraryFollower: null,
    libraryFollowingByMe: null
};

const getters = {
    libraryFollower: state => state.libraryFollower,
    libraryFollowersResponse: state => state.libraryFollowersResponse,
    libraryFollowingByMe: state => state.libraryFollowingByMe
};

const mutations = {
    setLibraryFollowersResponse(state, newFollowersResponse) {
        if (state.libraryFollowersResponse.data.length == 0) {
            state.libraryFollowersResponse.data = newFollowersResponse.data;
        } else {
            newFollowersResponse.data.forEach(function(item) {
                state.libraryFollowersResponse.data.push(item);
            });
        }
        state.libraryFollowersResponse.links = newFollowersResponse.links;
        state.libraryFollowersResponse.meta = newFollowersResponse.meta;
    },
    clearLibraryFollowersResponse(state) {
        state.libraryFollowersResponse = { data: [], links: null, meta: null };
    },

    insertLibraryFollower(state, followerData) {
        state.libraryFollowersResponse.data.splice(0, 0, followerData);
        state.libraryFollowersResponse.meta.total =
            state.libraryFollowersResponse.meta.total + 1;
    },

    removeMeLibraryFromFollowers(state) {
        var activeUserId = this.getters.activeUser.id;

        state.libraryFollowersResponse.data.forEach(function(
            followerItem,
            index,
            arr
        ) {
            if (followerItem.attributes.user.id == activeUserId) {
                arr.splice(index, 1);
            }
        });

        state.libraryFollowersResponse.meta.total =
            state.libraryFollowersResponse.meta.total - 1;
    },

    setLibraryFollowingByMe(state, newFollowingByMe) {
        state.libraryFollowingByMe = newFollowingByMe;
    },

    clearLibraryFollowingByMe(state) {
        state.libraryFollowingByMe = null;
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
