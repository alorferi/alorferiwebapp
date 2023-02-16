import axios from "axios";
import mixin from "@/mixin";

const state = {
    followersResponse: { data: [], links: null, meta: null },
    follower: null,

};

const getters = {
    follower: state => state.follower,
    followersResponse: state => state.followersResponse,
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

    storeUserFollower(context, packet) {
        return new Promise((resolve, reject) => {
            // var url = mixin.methods.getApiUrl("/api/followers");

            var url = mixin.methods.getApiUrl(
                "/api/users/" + this.getters.activeUser.id + "/followers"
            );

            const headers = mixin.methods.getAuthorizationBearerToken();
            headers["Content-Type"] = "multipart/form-data";

            let formData = packet.formData;

            axios({
                url: url,
                headers: headers,
                method: "FOLLOWER",
                data: formData
            })
                .then(response => {
                    context.commit(
                        "setFollower",
                        response.data.data.attributes
                    );
                    context.commit("insertFollowerToFeed", response.data.data);

                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },

    deleteUserFollower(context, follower) {
        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl(
                "/api/users/" +
                    this.getters.activeUser.id +
                    "/followers/" +
                    follower.id
            );

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "DELETE"
            })
                .then(response => {
                    context.commit("removeFollower", follower);
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
