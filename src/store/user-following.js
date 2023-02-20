import axios from "axios";
import mixin from "@/mixin";

const state = {
    userFollowingsResponse: { data: [], links: null, meta: null },

};

const getters = {
    userFollowingsResponse: state => state.userFollowingsResponse,
};

const mutations = {

    setUserFollowingsResponse(state, newUserFollowingsResponse) {
        if (state.userFollowingsResponse.data.length == 0) {
            state.userFollowingsResponse.data = newUserFollowingsResponse.data;
        } else {
            newUserFollowingsResponse.data.forEach(function(item) {
                state.userFollowingsResponse.data.push(item);
            });
        }

        state.userFollowingsResponse.links = newUserFollowingsResponse.links;
        state.userFollowingsResponse.meta = newUserFollowingsResponse.meta;
    },
    clearFollowingResponse(state) {
        state.userFollowingsResponse = { data: [], links: null, meta: null };
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

                    context.commit("setUserFollowingsResponse", response.data);
                    resolve(response);
                })
                .catch(err => {
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
