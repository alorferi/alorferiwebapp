import { defineStore } from "pinia";
import { useStores } from "./registry";
export const useFollowerStore = defineStore("follower", {
  state: () => ({
    followersResponse: {
      data: [],
      links: null,
      meta: null
    },
    follower: null,
    followingByMe: null,
    followingSource: null
  }),
  getters: {},
  actions: {
    setFollowersResponse(newFollowersResponse) {
      const state = this;
      if (state.followersResponse.data.length == 0) {
        state.followersResponse.data = newFollowersResponse.data;
      } else {
        newFollowersResponse.data.forEach(function (item) {
          state.followersResponse.data.push(item);
        });
      }
      state.followersResponse.links = newFollowersResponse.links;
      state.followersResponse.meta = newFollowersResponse.meta;
    },
    clearFollowersResponse() {
      const state = this;
      state.followersResponse = {
        data: [],
        links: null,
        meta: null
      };
    },
    insertFollower(followerData) {
      const state = this;
      state.followersResponse.data.splice(0, 0, followerData);
      if (!state.followersResponse.meta) state.followersResponse.meta = {
        total: 0
      };
      state.followersResponse.meta.total++;
    },
    removeMeFromFollowers() {
      const appStores = useStores();
      const state = this;
      var activeUserId = appStores.user.activeUser.id;
      state.followersResponse.data.forEach(function (followerItem, index, arr) {
        if (followerItem.attributes.user.id == activeUserId) {
          arr.splice(index, 1);
        }
      });
      if (state.followersResponse.meta) state.followersResponse.meta.total = Math.max(0, state.followersResponse.meta.total - 1);
    },
    setFollowingSource(source) {
      const state = this;
      if (state.followingSource !== source) state.followingByMe = null;
      state.followingSource = source;
    },
    setFollowingByMe(newFollowingByMe) {
      const state = this;
      state.followingByMe = newFollowingByMe;
    },
    clearFollowingByMe() {
      const state = this;
      state.followingByMe = null;
    }
  }
});
export default useFollowerStore;
