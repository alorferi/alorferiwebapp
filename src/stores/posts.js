import axios from "axios";
import mixin from '../mixin'

const state = {
    postsResponse: []
};


const getters = {
    postsResponse: state => state.postsResponse
};

const mutations = {

    setPostsResponse(state, newPostsResponse) {
        state.postsResponse = newPostsResponse;
    }
};

const actions = {

    fetchPosts(context) {

        return new Promise((resolve, reject) => {

        var url = mixin.methods.getApiUrl("/api/posts")

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
    }

};

export default {
    state,
    getters,
    mutations,
    actions
};
