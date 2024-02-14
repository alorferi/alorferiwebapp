import axios from "axios";
import mixin from "../mixin";


const state = {
    like: null
};

const getters = {
    like: state => state.like
};

const mutations = {

    setLike(state, newLike) {
        state.like = newLike;
    },

};

const actions = {


    fetchPostLikes(context, post) {
        return new Promise((resolve, reject) => {

            var url = mixin.methods.getApiUrl(
                "/api/posts/" + post.id + "/likes"
            );

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "GET"
            })
                .then(response => {
                     context.commit("pushPostLikes",{
                         post: post,
                         data:  response.data
                     });

                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },

    fetchPostMyLike(context, post) {
        return new Promise((resolve, reject) => {

            var url = mixin.methods.getApiUrl(
                "/api/posts/" + post.id + "/likes/my-like"
            );

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "GET"
            })
                .then(response => {
                     context.commit("pushMyLikeOnPost",{
                         post: post,
                         my_like:  response.data == "" ? null : response.data.data.attributes
                     });

                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },


    storePostLike(context, packet) {
        return new Promise((resolve, reject) => {
            // var url = mixin.methods.getApiUrl("/api/posts");


        let post_id =  packet.overhead.post.id;

            var url = mixin.methods.getApiUrl(
                "/api/posts/" + post_id + "/likes"
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


                    context.commit("pushMyLikeOnPost",{
                        post: packet.overhead.post,
                        my_like:  response.data.data.attributes
                    });

                    var data = [];

                    data.push(response.data.data)

                    let likes = {
                           data:  data,
                           meta:{
                               total:1
                           }
                    }
                    context.commit("pushPostLikes",{
                        post: packet.overhead.post,
                        data:  likes
                    });

                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },


    deletePostLike(context, packet) {

        return new Promise((resolve, reject) => {

            var url = mixin.methods.getApiUrl(
                "/api/posts/" + packet.overhead.post.id  + "/likes/"+packet.overhead.post.my_like.id
            );

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                data: packet.payload,
                method: "DELETE"
            })
                .then(response => {
                    context.commit("removeMyLikeFromPost", packet);
                    resolve(response);
                })
                .catch(err => {
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
