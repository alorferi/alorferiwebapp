// import Vue from "vue";
import axios from "axios";
import mixin from "../mixin";

const state = {
    course: JSON.parse(localStorage.getItem("course") || null),

    // courses: JSON.parse(
    // localStorage.getItem("courses") || null
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

    setCoursesResponse(state, coursesResponse) {
        state.coursesResponse = coursesResponse;
    },

};

const actions = {
    fetchCourse(context, courseId) {
        var url = mixin.methods.getApiUrl("/api/courses/" + courseId);
        return new Promise((resolve, reject) => {
            axios
                .get(url)
                .then(response => {
                    const course = response.data.data;

                    // console.log(course)

                    context.commit("setCourse", course);
                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },

    fetchCourseBySlug(context, slug) {
        var url = mixin.methods.getApiUrl("/api/courses/" + slug + "/slug");
        return new Promise((resolve, reject) => {
            axios
                .get(url)
                .then(response => {
                    const course = response.data.data;

                    // console.log(course)

                    context.commit("setCourse", course);
                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },

    fetchCourses(context, payload) {
        return new Promise((resolve, reject) => {
            const endPoint =
                "/api/courses";

            var url = mixin.methods.getApiUrl(
                endPoint,
                payload.term,
                payload.page
            );

            axios({
                url: url,
                method: "GET"
            })
                .then(response => {
                    const coursesResponse = response.data;

                    // console.log(coursesResponse);

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
