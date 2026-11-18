import { defineStore } from "pinia";
import { useStores } from "./registry";
import axios from "@/api";
import mixin from "../mixin";
export const useCourseOrderStore = defineStore("courseOrder", {
  state: () => ({
    myCourseOrder: JSON.parse(localStorage.getItem("myCourseOrder") || null),
    myCourseOrdersResponse: null
  }),
  getters: {},
  actions: {
    setMyCourseOrder(myCourseOrder) {
      const state = this;
      state.myCourseOrder = myCourseOrder;
    },
    setMyCourseOrdersResponse(myCourseOrdersResponse) {
      const state = this;
      state.myCourseOrdersResponse = myCourseOrdersResponse;
    },
    fetchMyCourseOrders(payload = {}) {
      const appStores = useStores();
      var url = mixin.methods.getApiUrl("/api/my-course-orders", payload.term, payload.page);
      var headers = mixin.methods.getHeaderWithAuthorizationBearerToken();
      return new Promise((resolve, reject) => {
        axios.get(url, headers).then(response => {
          const myCourseOrdersResponse = response.data;
          console.log(myCourseOrdersResponse);
          appStores.courseOrder.setMyCourseOrdersResponse(myCourseOrdersResponse);
          resolve(response);
        }).catch(err => {
          reject(err);
        });
      });
    },
    fetchMyCourseOrder(courseId) {
      var url = mixin.methods.getApiUrl("/api/my-course-orders/" + courseId);
      var headers = mixin.methods.getHeaderWithAuthorizationBearerToken();
      return new Promise((resolve, reject) => {
        axios.get(url, headers).then(response => {
          resolve(response);
        }).catch(err => {
          reject(err);
        });
      });
    },
    applyCourse(payload) {
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/my-course-orders");
        const headers = mixin.methods.getAuthorizationBearerToken();
        axios({
          url: url,
          headers: headers,
          data: payload,
          method: "POST"
        }).then(response => {
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    }
  }
});
export default useCourseOrderStore;
