import axios from "axios";
import mixin from "../mixin";

const state = {
    complainTypesResponse: { data: [] },
};
const getters = {
    complainTypesResponse: state => state.complainTypesResponse
};

const mutations = {
    setComplainTypesResponse(state, newComplainTypesResponse) {
            state.complainTypesResponse.data = newComplainTypesResponse.data;
    },
};


const actions = {

    fetchComplainTypes(context, complainableType) {
        return new Promise((resolve, reject) => {

            var url = mixin.methods.getApiUrl(
                "/api/complain-types/" + complainableType
            );

            console.log("url",url)

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "GET"
            })
                .then(response => {

                   console.log(response.data)

                     context.commit("setComplainTypesResponse",response.data);
                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },
    createReport(context, dataModel) {
        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl(
                "/api/complains"
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
