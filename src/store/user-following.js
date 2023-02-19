import axios from "axios";
import mixin from "@/mixin";

const state = {
    followingsResponse: { data: [], links: null, meta: null },
    followingByMe:null
};

const getters = {
    followingsResponse: state => state.followingsResponse,
    followingByMe: state => state.followingByMe
};

const mutations = {

    setFollowingsResponse(state, newFollowingsResponse) {
        if (state.followingsResponse.data.length == 0) {
            state.followingsResponse.data = newFollowingsResponse.data;
        } else {
            newFollowingsResponse.data.forEach(function(item) {
                state.followingsResponse.data.push(item);
            });
        }

        state.followingsResponse.links = newFollowingsResponse.links;
        state.followingsResponse.meta = newFollowingsResponse.meta;
    },
    clearFollowingResponse(state) {
        state.followingsResponse = { data: [], links: null, meta: null };
    },

    setFollowingByMe(state, newFollowingByMe) {
        state.followingByMe = newFollowingByMe;
    },

    clearFollowingByMe(state) {
        state.followingByMe = null;
    },

};

const actions = {


    fetchUserFollowings(context, payload) {
        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl(
                "/api/users/" + payload.user_id + "/followings"
            );
            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "GET"
            })
                .then(response => {
                    context.commit("clearFollowingResponse");


                    context.commit("setFollowingsResponse", response.data);
                    resolve(response);
                })
                .catch(err => {
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
                    context.commit("setFollowingByMe", response.data.data.attributes);
                    resolve(response);
                })
                .catch(err => {
                    context.commit("clearFollowingByMe");
                    reject(err);
                });
        });
    },

    unFollowUserByMe(context, payload) {
        return new Promise((resolve, reject) => {

            var url = mixin.methods.getApiUrl(
                "/api/users/" + payload.user_id + "/unfollow"
            );

            console.log("url",url)

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "DELETE"
            })
                .then(response => {
                    console.log("unFollowUserByMe:clearFollowingByMe")
                    context.commit("clearFollowingByMe");
                    resolve(response);
                })
                .catch(err => {
                    console.log(err)
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
