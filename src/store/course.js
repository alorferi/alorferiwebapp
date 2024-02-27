// import Vue from "vue";
import axios from "axios";
import mixin from "../mixin";

const state = {
    course: JSON.parse(localStorage.getItem("course") || null),

    // courses: JSON.parse(
    //     localStorage.getItem("courses") || null
    // ),

    coursesResponse: null,

};

const getters = {
    course: state => state.course,
    // courses: state => state.courses,
    coursesResponse: state => state.coursesResponse,

};

const mutations = {

    setCourse(state, course) {
        state.course = course;
    },

    // setCourses(state, courses) {
    //     state.courses = course;
    // },

    setCoursesResponse(state, coursesResponse) {
        state.coursesResponse = coursesResponse;
    },

};

const actions = {
    fetchCourse(context, courseId) {
        var url = mixin.methods.getApiUrl("/api/courses/" + courseId);
        var headers = mixin.methods.getHeaderWithAuthorizationBearerToken();

        return new Promise((resolve, reject) => {
            axios
                .get(url, headers)
                .then(response => {
                    const course = response.data.data.attributes;
                    context.commit("setCourse", course);
                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },

    fetchCourses(context) {
        return new Promise((resolve, reject) => {
            const endPoint =
                "/api/courses";


            var url = mixin.methods.getApiUrl(
                endPoint
            );

            axios({
                url: url,
                method: "GET"
            })
                .then(response => {
                    const coursesResponse = response.data;

                    console.log(coursesResponse);

                    context.commit(
                        "setCoursesResponse",
                        coursesResponse
                    );
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
