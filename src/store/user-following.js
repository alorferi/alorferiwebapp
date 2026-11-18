import { defineStore } from "pinia";
import { useStores } from "./registry";
import axios from "@/api";
import mixin from "@/mixin";
export const useUserFollowingStore = defineStore("userFollowing", {
  state: () => ({
    userFollowingsResponse: {
      data: [],
      links: null,
      meta: null
    }
  }),
  getters: {},
  actions: {
    setUserFollowingsResponse(newUserFollowingsResponse) {
      const state = this;
      if (state.userFollowingsResponse.data.length == 0) {
        state.userFollowingsResponse.data = newUserFollowingsResponse.data;
      } else {
        newUserFollowingsResponse.data.forEach(function (item) {
          state.userFollowingsResponse.data.push(item);
        });
      }
      state.userFollowingsResponse.links = newUserFollowingsResponse.links;
      state.userFollowingsResponse.meta = newUserFollowingsResponse.meta;
    },
    clearFollowingResponse() {
      const state = this;
      state.userFollowingsResponse = {
        data: [],
        links: null,
        meta: null
      };
    },
    fetchUserFollowings(payload) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/users/" + payload.user_id + "/followings");
        const headers = mixin.methods.getAuthorizationBearerToken();
        axios({
          url: url,
          headers: headers,
          method: "GET"
        }).then(response => {
          appStores.userFollowing.clearFollowingResponse();
          appStores.userFollowing.setUserFollowingsResponse(response.data);
          resolve(response);
        }).catch(err => {
          reject(err);
        });
      });
    }
  }
});
export default useUserFollowingStore;
