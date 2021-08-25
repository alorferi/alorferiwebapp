import axios from "axios";
import mixin from "../mixin";
const state = {
    comment: null
};

const getters = {
    post: state => state.post
};

const mutations = {
    setPost(state, newPost) {
        state.post = newPost;
    },


};

const actions = {


    fetchPostComments(context, packet) {
        return new Promise((resolve, reject) => {

            var url = mixin.methods.getApiUrl(
                "/api/posts/" + packet.overhead.post_id + "/comments"
            );

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "GET"
            })
                .then(response => {
                    context.commit("setUserPostsResponse", response.data);
                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },


    createPostComment(context, packet) {
        return new Promise((resolve, reject) => {
            // var url = mixin.methods.getApiUrl("/api/posts");


        let post_id =  packet.overhead.post_id;

            var url = mixin.methods.getApiUrl(
                "/api/posts/" + post_id + "/comments"
            );

            const headers = mixin.methods.getAuthorizationBearerToken();

            headers["Content-Type"] = "application/json";

            axios({
                url: url,
                headers: headers,
                method: "POST",
                data: packet.payload
            })
                .then(response => {
                    context.commit("setPost", response.data.data.attributes);

                    // context.commit("pushPostToFeed", response.data.data);

                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },




    deletePostComment(context, post) {
        return new Promise((resolve, reject) => {

            var url = mixin.methods.getApiUrl(
                "/api/users/" + this.getters.activeUser.id  + "/posts/"+ post.id
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
};

export default {
    state,
    getters,
    mutations,
    actions
};
