import { defineStore } from "pinia";
import { useStores } from "./registry";
import axios from "@/api";
import mixin from "@/mixin";
export const useUserFollowerStore = defineStore("userFollower", {
  state: () => ({}),
  getters: {},
  actions: {
    fetchUserFollowers(payload) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/users/" + payload.user_id + "/followers");
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
    fetchUserFollowingByMe(payload) {
      const appStores = useStores();
      const source = "user:" + payload.user_id;
      appStores.follower.setFollowingSource(source);
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/users/" + payload.user_id + "/following-by-me");
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
    followUserByMe(payload) {
      const appStores = useStores();
      const source = "user:" + payload.user_id;
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/users/" + payload.user_id + "/follow");
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
    unFollowUserByMe(payload) {
      const appStores = useStores();
      const source = "user:" + payload.user_id;
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/users/" + payload.user_id + "/unfollow");
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
export default useUserFollowerStore;
