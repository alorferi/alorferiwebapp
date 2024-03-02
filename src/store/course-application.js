// import Vue from "vue";
import axios from "axios";
import mixin from "../mixin";

const state = {

    myCourseApplication: JSON.parse(localStorage.getItem("myCourseApplication") || null),



};

const getters = {

    myCourseApplication: state => state.myCourseApplication,


};

const mutations = {

    setMyCourseApplication(state, myCourseApplication) {
        state.myCourseApplication = myCourseApplication;
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

                    const coursesResponse = response.data;

                    context.commit(
                        "setCoursesResponse",
                        coursesResponse
                    );
                    resolve(response);

                })
                .catch(err => {
                    reject(err);
                });
        });
    },


    fetchMyCourseApplication(context, courseId) {
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


};

export default {
    state,
    getters,
    mutations,
    actions
};
