// import Vue from "vue";
import axios from "axios";
import mixin from "../mixin";

const state = {
    myCourseOrder: JSON.parse(localStorage.getItem("myCourseOrder") || null),

    myCourseOrdersResponse: null,
};

const getters = {
    myCourseOrder: state => state.myCourseOrder,
    myCourseOrdersResponse: state => state.myCourseOrdersResponse,

};

const mutations = {

    setMyCourseOrder(state, myCourseOrder) {
        state.myCourseOrder = myCourseOrder;
    },

    setMyCourseOrdersResponse(state, myCourseOrdersResponse) {
        state.myCourseOrdersResponse = myCourseOrdersResponse;
    },


};

const actions = {

    fetchMyCourseOrders(context) {

        var url = mixin.methods.getApiUrl("/api/my-course-orders");

        var headers = mixin.methods.getHeaderWithAuthorizationBearerToken();

        return new Promise((resolve, reject) => {
            axios
                .get(url, headers)
                .then(response => {

                    const myCourseOrdersResponse = response.data;

                    console.log(myCourseOrdersResponse);

                    context.commit(
                        "setMyCourseOrdersResponse",
                        myCourseOrdersResponse
                    );
                    resolve(response);

                })
                .catch(err => {
                    reject(err);
                });
        });
    },


    fetchMyCourseOrder(context, courseId) {
        var url = mixin.methods.getApiUrl("/api/my-course-orders/" + courseId);

        var headers = mixin.methods.getHeaderWithAuthorizationBearerToken();


        return new Promise((resolve, reject) => {
            axios
                .get(url, headers)
                .then(response => {

                    resolve(response);

                })
                .catch(err => {
                    reject(err);
                });
        });
    },

    applyCourse(context, payload) {
        return new Promise((resolve, reject) => {

            var url = mixin.methods.getApiUrl("/api/my-course-orders");

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                data:payload,
                method: "POST"
            })
                .then(response => {
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
