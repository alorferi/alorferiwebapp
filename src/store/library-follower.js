import { defineStore } from "pinia";
import { useStores } from "./registry";
import axios from "@/api";
import mixin from "@/mixin";
export const useLibraryFollowerStore = defineStore("libraryFollower", {
  state: () => ({}),
  getters: {},
  actions: {
    fetchLibraryFollowers(payload) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/libraries/" + payload.library_id + "/followers");
        const headers = mixin.methods.getAuthorizationBearerToken();
        axios({
          url: url,
          headers: headers,
          method: "GET"
        }).then(response => {
          appStores.follower.clearFollowersResponse();
          appStores.follower.setFollowersResponse(response.data);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    },
    fetchLibraryFollowingByMe(payload) {
      const appStores = useStores();
      const source = "library:" + payload.library_id;
      appStores.follower.setFollowingSource(source);
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/libraries/" + payload.library_id + "/following-by-me");
        const headers = mixin.methods.getAuthorizationBearerToken();
        axios({
          url: url,
          headers: headers,
          method: "GET"
        }).then(response => {
          if (appStores.follower.followingSource !== source) {
            resolve(response);
            return;
          }
          appStores.follower.clearFollowingByMe();
          appStores.follower.setFollowingByMe(response.data.data.attributes);
          resolve(response);
        }).catch(err => {
          if (appStores.follower.followingSource === source) appStores.follower.clearFollowingByMe();
          reject(err);
        });
      });
    },
    followLibraryByMe(payload) {
      const appStores = useStores();
      const source = "library:" + payload.library_id;
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/libraries/" + payload.library_id + "/follow");
        console.log("url", url);
        const headers = mixin.methods.getAuthorizationBearerToken();
        axios({
          url: url,
          headers: headers,
          method: "POST"
        }).then(response => {
          if (appStores.follower.followingSource !== source) {
            resolve(response);
            return;
          }
          appStores.follower.clearFollowingByMe();
          appStores.follower.setFollowingByMe(response.data.data.attributes);
          appStores.follower.insertFollower(response.data.data);
          resolve(response);
        }).catch(err => {
          console.log(err);
          reject(err);
        });
      });
    },
    unFollowLibraryByMe(payload) {
      const appStores = useStores();
      const source = "library:" + payload.library_id;
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/libraries/" + payload.library_id + "/unfollow");
        console.log("url", url);
        const headers = mixin.methods.getAuthorizationBearerToken();
        axios({
          url: url,
          headers: headers,
          method: "DELETE"
        }).then(response => {
          if (appStores.follower.followingSource !== source) {
            resolve(response);
            return;
          }
          appStores.follower.removeMeFromFollowers();
          appStores.follower.clearFollowingByMe();
          resolve(response);
        }).catch(err => {
          console.log(err);
          reject(err);
        });
      });
    }
  }
});
export default useLibraryFollowerStore;
