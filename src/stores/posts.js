import axios from "axios";
import mixin from '../mixin'

const state = {
    postsResponse: [],
    post:null
};


const getters = {
    postsResponse: state => state.postsResponse,
    post: state => state.post
};

const mutations = {

    setPost(state, newPost) {
        state.post = newPost;
    },

    pushPost(state, newPost) {
        // state.postsResponse.data.push(newPost);
        state.postsResponse.data.splice(0, 0, newPost);
    },

    setPostsResponse(state, newPostsResponse) {
        state.postsResponse = newPostsResponse;
    }
};

const actions = {

    fetchPostFeed(context) {

        return new Promise((resolve, reject) => {

        var url = mixin.methods.getApiUrl("/api/posts/feed")

       const  headers = mixin.methods.getAuthorizationBearerToken()

        axios({
            url:url,
            headers:headers ,
            method: "GET"
        })
        .then(response => {
            const postsResponse = response.data;
            context.commit("setPostsResponse", postsResponse);
            resolve(response);
        })
        .catch(err => {
            console.log("err:", err);
            reject(err);
        });


        });
    },


    createPost(context,payload){


        return new Promise((resolve, reject) => {

            var url = mixin.methods.getApiUrl("/api/posts")

           const  headers = mixin.methods.getAuthorizationBearerToken()

            axios({
                url:url,
                headers:headers ,
                method: "POST",
                data: payload
            })
            .then(response => {
                context.commit("setPost", response.data.data.attributes);
                context.commit("pushPost", response.data.data);

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
