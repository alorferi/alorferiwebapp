import { defineStore } from "pinia";
import { useStores } from "./registry";
import axios from "@/api";
import mixin from "@/mixin";
export const useUserPostStore = defineStore("userPost", {
  state: () => ({}),
  getters: {},
  actions: {
    fetchUserPosts(payload) {
      const appStores = useStores();
      return appStores.post.fetchPostsPage({
        ...payload,
        source: "/api/users/" + payload.user_id + "/posts"
      });
    },
    storeUserPost(packet) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/users/" + appStores.user.activeUser.id + "/posts");
        const headers = mixin.methods.getAuthorizationBearerToken();
        headers["Content-Type"] = "multipart/form-data";
        let formData = packet.formData;
        axios({
          url: url,
          headers: headers,
          method: "POST",
          data: formData
        }).then(response => {
          appStores.post.setPost(response.data.data.attributes);
          appStores.post.insertPostToFeed(response.data.data);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    },
    updateUserPost(packet) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/users/" + appStores.user.activeUser.id + "/posts/" + packet.overhead.post.id + "?_method=PUT");
        const headers = mixin.methods.getAuthorizationBearerToken();
        headers["Content-Type"] = "multipart/form-data";
        const formData = packet.formData;
        axios({
          url: url,
          headers: headers,
          method: "POST",
          data: formData
        }).then(response => {
          appStores.post.updatePostToFeed(response.data.data);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    },
    removeUserPost(post) {
      const appStores = useStores();
      appStores.post.removePost(post);
    },
    deleteUserPost(post) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/users/" + appStores.user.activeUser.id + "/posts/" + post.id);
        const headers = mixin.methods.getAuthorizationBearerToken();
        axios({
          url: url,
          headers: headers,
          method: "DELETE"
        }).then(response => {
          appStores.post.removePost(post);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    }
  }
});
export default useUserPostStore;
