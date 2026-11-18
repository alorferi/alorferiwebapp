import { defineStore } from "pinia";
import { useStores } from "./registry";
import axios from "@/api";
import mixin from "../mixin";
export const useCommentStore = defineStore("comment", {
  state: () => ({
    comment: null
  }),
  getters: {},
  actions: {
    setComment(newComment) {
      const state = this;
      state.comment = newComment;
    },
    fetchPostComments(post) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/posts/" + post.id + "/comments");
        const headers = mixin.methods.getAuthorizationBearerToken();
        axios({
          url: url,
          headers: headers,
          method: "GET"
        }).then(response => {
          appStores.post.pushPostComments({
            post: post,
            data: response.data
          });
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    },
    storePostComment(packet) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        let post_id = packet.overhead.post.id;
        var url = mixin.methods.getApiUrl("/api/posts/" + post_id + "/comments");
        const headers = mixin.methods.getAuthorizationBearerToken();
        headers["Content-Type"] = "application/json";
        axios({
          url: url,
          headers: headers,
          method: "POST",
          data: packet.payload
        }).then(response => {
          appStores.comment.setComment(response.data.data.attributes);
          var data = [];
          data.push(response.data.data);
          let comments = {
            data: data,
            meta: {
              total: 1
            }
          };
          appStores.post.pushPostComments({
            post: packet.overhead.post,
            data: comments
          });
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    },
    deletePostComment(packet) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/posts/" + packet.overhead.post.id + "/comments/" + packet.overhead.comment.id);
        const headers = mixin.methods.getAuthorizationBearerToken();
        axios({
          url: url,
          headers: headers,
          method: "DELETE"
        }).then(response => {
          appStores.post.removePostComment(packet);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    }
  }
});
export default useCommentStore;
