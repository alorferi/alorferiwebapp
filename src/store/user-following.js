import axios from "axios";
import mixin from "@/mixin";

const state = {
    followingsResponse: { data: [], links: null, meta: null }
};

const getters = {
    followingsResponse: state => state.followingsResponse
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

};

const actions = {


    fetchUserFollowings(context, payload) {
        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl(
                "/api/users/" + payload.user_id + "/followings"
            );
            console.log("url", url);
            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "GET"
            })
                .then(response => {
                    context.commit("clearFollowingResponse");

                    console.log("setFollowingsResponse", response.data);

                    context.commit("setFollowingsResponse", response.data);
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
