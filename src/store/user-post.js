import axios from "axios";
import mixin from "@/mixin";

const state = {

};

const getters = {

};

const mutations = {

};

const actions = {


    fetchUserPosts(context, payload) {
        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl(
                "/api/users/" + payload.user_id + "/posts"
            );

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "GET"
            })
                .then(response => {
                    context.commit("clearPostsResponse");
                    context.commit("setPostsResponse", response.data);
                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },


    storeUserPost(context, packet) {
        return new Promise((resolve, reject) => {
            // var url = mixin.methods.getApiUrl("/api/posts");

            var url = mixin.methods.getApiUrl(
                "/api/users/" + this.getters.activeUser.id + "/posts"
            );

            const headers = mixin.methods.getAuthorizationBearerToken();
            headers["Content-Type"] = "multipart/form-data";

          let  formData = packet.formData

            axios({
                url: url,
                headers: headers,
                method: "POST",
                data: formData
            })
                .then(response => {
                    context.commit("setPost", response.data.data.attributes);
                    context.commit("insertPostToFeed", response.data.data);

                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },

    updateUserPost(context, packet) {
        return new Promise((resolve, reject) => {
            // var url = mixin.methods.getApiUrl("/api/posts");

            var url = mixin.methods.getApiUrl(
                "/api/users/" +
                    this.getters.activeUser.id +
                    "/posts/" +
                    packet.overhead.post.id +
                    "?_method=PUT"
            );

            const headers = mixin.methods.getAuthorizationBearerToken();
            headers["Content-Type"] = "multipart/form-data";

            const formData = packet.formData;

            axios({
                url: url,
                headers: headers,
                method: "POST",
                data: formData
            })
                .then(response => {
                    context.commit("updatePostToFeed", response.data.data);

                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },

    removeUserPost(context, post) {
        context.commit("removePost", post);
    },
    deleteUserPost(context, post) {
        return new Promise((resolve, reject) => {
            var url = mixin.methods.getApiUrl(
                "/api/users/" + this.getters.activeUser.id + "/posts/" + post.id
            );

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "DELETE"
            })
                .then(response => {
                    context.commit("removePost", post);
                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    }

}

export default {
    state,
    getters,
    mutations,
    actions
};
