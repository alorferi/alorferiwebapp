import { defineStore } from "pinia";
import { useStores } from "./registry";
import axios from "@/api";
import { apiBaseUrl } from "@/config/runtime";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: JSON.parse(localStorage.getItem("token") || null),
    otc_token: JSON.parse(localStorage.getItem("otc_token") || null)
  }),
  getters: {
    access_token: state => {
      return state.token;
    },
    isLoggedIn: state => state.token != null
  },
  actions: {
    setToken(token) {
      const state = this;
      state.token = token;
    },
    setOtcToken(otc_token) {
      const state = this;
      state.otc_token = otc_token;
    },
    applyLogout() {
      const state = this;
      state.token = null;
    },
    loginBasic(loginCredential) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        let login_url = apiBaseUrl + "/api/auth/login";
        axios({
          url: login_url,
          data: loginCredential,
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }).then(response => {
          const token = response.data.data.token;
          localStorage.setItem("token", JSON.stringify(token));
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          appStores.auth.setToken(token);
          resolve(response);
        }).catch(error => {
          localStorage.removeItem("token");
          switch (error.response?.data?.error) {
            case "invalid_grant":
              reject("Mobile Number or Password does not match.");
              break;
            case "invalid_request":
              reject(error.response.data.hint);
              break;
            default:
              reject(error);
              break;
          }
        });
      });
    },
    loginWithOtc(dataModel) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        let login_url = apiBaseUrl + "/api/auth/login-with-otc";
        axios({
          url: login_url,
          data: dataModel.data,
          method: "POST",
          headers: dataModel.headers
        }).then(response => {
          switch (response.data.status) {
            case "OK":
              var otc_token = response.data.data.token;
              localStorage.setItem("otc_token", JSON.stringify(otc_token));
              appStores.auth.setOtcToken(otc_token);
              resolve(response);
              break;
            case "OTC_GENERATED":
            case "OTC_REJECTED":
              resolve(response);
              break;
          }
        }).catch(error => {
          localStorage.removeItem("otc_token");
          switch (error.response?.data?.error) {
            case "invalid_grant":
              reject("Mobile Number or Password does not match.");
              break;
            case "invalid_request":
              reject(error.response.data.hint);
              break;
            default:
              reject(error);
              break;
          }
        });
      });
    },
    resetPassword(dataModel) {
      return new Promise((resolve, reject) => {
        let login_url = apiBaseUrl + "/api/auth/reset-password";
        const otc_token = JSON.parse(localStorage.getItem("otc_token") || null);
        let headers = {
          Authorization: "Bearer " + otc_token
        };
        axios({
          url: login_url,
          data: dataModel,
          method: "POST",
          headers: headers
        }).then(response => {
          switch (response.data.status) {
            case "OK":
              localStorage.removeItem("otc_token");
              break;
          }
          resolve(response);
        }).catch(error => {
          switch (error.response?.data?.error) {
            case "invalid_grant":
              reject("Mobile Number or Password does not match.");
              break;
            case "invalid_request":
              reject(error.response.data.hint);
              break;
            default:
              reject(error);
              break;
          }
        });
      });
    },
    logout() {
      const appStores = useStores();
      return new Promise(resolve => {
        appStores.post.clearPostsResponse();
        appStores.follower.setFollowingSource(null);
        appStores.auth.applyLogout();
        localStorage.removeItem("token");
        localStorage.removeItem("otc_token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    }
  }
});
export default useAuthStore;
