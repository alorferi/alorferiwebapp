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
                    console.log("err:", err);
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

                    // context.commit("setLike", response.data.data.attributes);

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
                    console.log("err:", err);
                    reject(err);
                });
        });
    },


    deletePostLike(context, packet) {

        return new Promise((resolve, reject) => {

            var url = mixin.methods.getApiUrl(
                "/api/posts/" + packet.overhead.post.id  + "/likes/"+ packet.overhead.like.id
            );

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "DELETE"
            })
                .then(response => {
                    context.commit("removePostLike", packet);
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
