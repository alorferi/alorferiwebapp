import { defineStore } from "pinia";
import { useStores } from "./registry";
import axios from "@/api";
import mixin from "../mixin";
export const useCourseStore = defineStore("course", {
  state: () => ({
    detailRequest: 0,
    course: JSON.parse(localStorage.getItem("course") || null),
    coursesResponse: null
  }),
  getters: {},
  actions: {
    setCourse(course) {
      const state = this;
      state.course = course;
    },
    setCoursesResponse(coursesResponse) {
      const state = this;
      state.coursesResponse = coursesResponse;
    },
    fetchCourse(courseId) {
      const appStores = useStores();
      const request = ++this.detailRequest;
      const token = appStores.auth.access_token;
      var url = mixin.methods.getApiUrl("/api/courses/" + courseId);
      return new Promise((resolve, reject) => {
        axios.get(url).then(response => {
          const course = response.data.data;
          if (request === this.detailRequest && appStores.auth.access_token === token) appStores.course.setCourse(course);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    },
    fetchCourseBySlug(slug) {
      const appStores = useStores();
      const request = ++this.detailRequest;
      const token = appStores.auth.access_token;
      var url = mixin.methods.getApiUrl("/api/courses/" + slug + "/slug");
      return new Promise((resolve, reject) => {
        axios.get(url).then(response => {
          const course = response.data.data;
          if (request === this.detailRequest && appStores.auth.access_token === token) appStores.course.setCourse(course);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    },
    fetchCourses(payload) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        const endPoint = "/api/courses";
        var url = mixin.methods.getApiUrl(endPoint, payload.term, payload.page);
        axios({
          url: url,
          method: "GET"
        }).then(response => {
          const coursesResponse = response.data;
          appStores.course.setCoursesResponse(coursesResponse);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    }
  }
});
export default useCourseStore;
