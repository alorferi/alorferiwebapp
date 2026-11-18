import { defineStore } from "pinia";
import { useStores } from "./registry";
import axios from "@/api";
import mixin from "../mixin";
export const useLikeStore = defineStore("like", {
  state: () => ({
    like: null
  }),
  getters: {},
  actions: {
    setLike(newLike) {
      const state = this;
      state.like = newLike;
    },
    fetchPostLikes(post) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/posts/" + post.id + "/likes");
        const headers = mixin.methods.getAuthorizationBearerToken();
        axios({
          url: url,
          headers: headers,
          method: "GET"
        }).then(response => {
          appStores.post.pushPostLikes({
            post: post,
            data: response.data
          });
          resolve(response);
        }).catch(err => {
          reject(err);
        });
      });
    },
    fetchPostMyLike(post) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/posts/" + post.id + "/likes/my-like");
        const headers = mixin.methods.getAuthorizationBearerToken();
        axios({
          url: url,
          headers: headers,
          method: "GET"
        }).then(response => {
          appStores.post.pushMyLikeOnPost({
            post: post,
            my_like: response.data == "" ? null : response.data.data.attributes
          });
          resolve(response);
        }).catch(err => {
          reject(err);
        });
      });
    },
    storePostLike(packet) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        let post_id = packet.overhead.post.id;
        var url = mixin.methods.getApiUrl("/api/posts/" + post_id + "/likes");
        const headers = mixin.methods.getAuthorizationBearerToken();
        headers["Content-Type"] = "application/json";
        axios({
          url: url,
          headers: headers,
          method: "POST",
          data: packet.payload
        }).then(response => {
          appStores.post.pushMyLikeOnPost({
            post: packet.overhead.post,
            my_like: response.data.data.attributes
          });
          var data = [];
          data.push(response.data.data);
          let likes = {
            data: data,
            meta: {
              total: 1
            }
          };
          appStores.post.pushPostLikes({
            post: packet.overhead.post,
            data: likes
          });
          resolve(response);
        }).catch(err => {
          reject(err);
        });
      });
    },
    deletePostLike(packet) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/posts/" + packet.overhead.post.id + "/likes/" + packet.overhead.post.my_like.id);
        const headers = mixin.methods.getAuthorizationBearerToken();
        axios({
          url: url,
          headers: headers,
          data: packet.payload,
          method: "DELETE"
        }).then(response => {
          appStores.post.removeMyLikeFromPost(packet);
          resolve(response);
        }).catch(err => {
          reject(err);
        });
      });
    }
  }
});
export default useLikeStore;
