import axios from "axios";
import mixin from "../mixin";
const state = {
    comment: null
};

const getters = {
    comment: state => state.comment
};

const mutations = {
    setComment(state, newComment) {
        state.comment = newComment;
    },


};

const actions = {


    fetchPostComments(context, post) {
        return new Promise((resolve, reject) => {

            var url = mixin.methods.getApiUrl(
                "/api/posts/" + post.id + "/comments"
            );

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "GET"
            })
                .then(response => {
                     context.commit("pushPostComments",{
                         post: post,
                         data:  response.data
                     });

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


        let post_id =  packet.overhead.post.id;

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

                    context.commit("setComment", response.data.data.attributes);

                    var data = [];

                    data.push(response.data.data)

                    let comments = {
                           data:  data,
                           meta:{
                               total:1
                           }
                    }
                    context.commit("pushPostComments",{
                        post: packet.overhead.post,
                        data:  comments
                    });

                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },


    deletePostComment(context, packet) {
        return new Promise((resolve, reject) => {

            var url = mixin.methods.getApiUrl(
                "/api/posts/" + packet.overhead.post.id  + "/comments/"+ packet.overhead.comment.id
            );


            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "DELETE"
            })
                .then(response => {
                    // context.commit("removePostComment", post);
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
