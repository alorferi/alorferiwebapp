import axios from "axios";
import mixin from "../mixin";

const state = {
    blockTypesResponse: { data: [] },
};
const getters = {
    blockTypesResponse: state => state.blockTypesResponse
};

const mutations = {
    setBlockTypesResponse(state, newBlockTypesResponse) {
            state.blockTypesResponse.data = newBlockTypesResponse.data;
    },
};


const actions = {

    createBlock(context, dataModel) {
        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl(
                "/api/blocks"
            );

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "POST",
                data: dataModel
            })
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    console.log("error",err.message);
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
