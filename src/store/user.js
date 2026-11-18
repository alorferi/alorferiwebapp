import { defineStore } from "pinia";
import { useStores } from "./registry";
import axios from "@/api";
import mixin from "../mixin";
export const useUserStore = defineStore("user", {
  state: () => ({
    detailRequest: 0,
    user: JSON.parse(localStorage.getItem("user") || null),
    activeUser: JSON.parse(localStorage.getItem("activeUser") || null),
    activeUserCoverUrl: JSON.parse(localStorage.getItem("activeUserCoverUrl") || null),
    usersResponse: null,
    userStatus: null
  }),
  getters: {},
  actions: {
    setUser(user) {
      const state = this;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    setUsersResponse(newResponse) {
      const state = this;
      state.usersResponse = newResponse;
    },
    setActiveUser(newUser) {
      const state = this;
      state.activeUser = newUser;
      localStorage.setItem("activeUser", JSON.stringify(newUser));
    },
    setActiveUserCoverUrl(newCoverUrl) {
      const state = this;
      state.activeUserCoverUrl = newCoverUrl;
      localStorage.setItem("activeUserCoverUrl", JSON.stringify(newCoverUrl));
    },
    searchUsers(payload) {
      const appStores = useStores();
      var endpoint = "/api/users";
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl(endpoint, payload.term, payload.page);
        const headers = mixin.methods.getAuthorizationBearerToken();
        axios({
          url: url,
          headers: headers,
          method: "GET"
        }).then(response => {
          const usersResponse = response.data;
          appStores.user.setUsersResponse(usersResponse);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    },
    fetchMe() {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/auth/me");
        const headers = mixin.methods.getAuthorizationBearerToken();
        axios({
          url: url,
          headers: headers,
          method: "GET"
        }).then(response => {
          const user = response.data.data.attributes;
          appStores.user.setActiveUser(user);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    },
    updateMe(packet) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/users/" + appStores.user.activeUser.id + "?_method=PUT");
        const headers = mixin.methods.getAuthorizationBearerToken();
        const formData = packet.formData;
        axios({
          url: url,
          headers: headers,
          method: "POST",
          data: formData
        }).then(response => {
          const user = response.data.data.attributes;
          appStores.user.setActiveUser(user);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    },
    uploadMyPhoto(packet) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/users/upload-own-photo");
        const headers = mixin.methods.getAuthorizationBearerToken();
        headers["Content-Type"] = "multipart/form-data";
        const formData = packet.formData;
        axios({
          url: url,
          headers: headers,
          method: "POST",
          data: formData
        }).then(response => {
          const photo_url = response.data.data + "?tick=" + Date.now();
          const user = appStores.user.activeUser;
          user.photo_url = photo_url;
          appStores.user.setActiveUser(user);
          appStores.user.setUser(user);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    },
    uploadMyCoverPhoto(packet) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/users/upload-my-cover-photo");
        const headers = mixin.methods.getAuthorizationBearerToken();
        headers["Content-Type"] = "multipart/form-data";
        const formData = packet.formData;
        axios({
          url: url,
          headers: headers,
          method: "POST",
          data: formData
        }).then(response => {
          const cover_url = response.data.data + "?tick=" + Date.now();
          appStores.user.setActiveUserCoverUrl(cover_url);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    },
    fetchUser(userId) {
      const appStores = useStores();
      const request = ++this.detailRequest;
      const token = appStores.auth.access_token;
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/users/" + userId);
        const headers = mixin.methods.getAuthorizationBearerToken();
        axios({
          url: url,
          headers: headers,
          method: "GET"
        }).then(response => {
          const user = response.data.data.attributes;
          if (request === this.detailRequest && appStores.auth.access_token === token) appStores.user.setUser(user);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    }
  }
});
export default useUserStore;
