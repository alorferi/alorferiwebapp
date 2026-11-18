import { defineStore } from "pinia";
import { useStores } from "./registry";
import axios from "@/api";
import mixin from "@/mixin";
export const useLibraryPostStore = defineStore("libraryPost", {
  state: () => ({}),
  getters: {},
  actions: {
    fetchLibraryPosts(packet) {
      const appStores = useStores();
      return appStores.post.fetchPostsPage({
        ...packet,
        source: "/api/libraries/" + packet.overhead.library.id + "/posts"
      });
    },
    storeLibraryPost(packet) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/libraries/" + packet.overhead.postable_id + "/posts");
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
    updateLibraryPost(packet) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/libraries/" + packet.overhead.postable_id + "/posts/" + packet.overhead.post.id + "?_method=PUT");
        const headers = mixin.methods.getAuthorizationBearerToken();
        headers["Content-Type"] = "multipart/form-data";
        let formData = packet.formData;
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
    deleteLibraryPost(packet) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/libraries/" + packet.overhead.library.id + "/posts/" + packet.overhead.post.id);
        const headers = mixin.methods.getAuthorizationBearerToken();
        axios({
          url: url,
          headers: headers,
          method: "DELETE"
        }).then(response => {
          appStores.post.removePost(packet.overhead.post);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    }
  }
});
export default useLibraryPostStore;
