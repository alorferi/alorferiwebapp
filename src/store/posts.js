import axios from "axios";
import mixin from "../mixin";

const state = {
    feedPostsResponse: {data:[], links:null,meta:null},
    userPostsResponse: [],
    post: null
};

const getters = {
    feedPostsResponse: state => state.feedPostsResponse,
    userPostsResponse: state => state.userPostsResponse,
    post: state => state.post
};

const mutations = {
    setPost(state, newPost) {
        state.post = newPost;
    },

    pushPostToFeed(state, newPost) {
        state.feedPostsResponse.data.splice(0, 0, newPost);
    },

    removePost(state, post) {
        state.feedPostsResponse.data.forEach(function(item, index, arr) {
            if (item.attributes.id == post.id) {
                arr.splice(index, 1);
            }
        });
    },

    setFeedPostsResponse(state, newPostsResponse) {



         if(state.feedPostsResponse.data.length == 0){
             state.feedPostsResponse.data =newPostsResponse.data;
         }else{
          newPostsResponse.data.forEach(function(item){
            state.feedPostsResponse.data.push(item);
          })
         }

        state.feedPostsResponse.links = newPostsResponse.links;
        state.feedPostsResponse.meta = newPostsResponse.meta;
        //  state.feedPostsResponse = newPostsResponse;


    },

    setUserPostsResponse(state, newPostsResponse) {
        state.userPostsResponse = newPostsResponse;
    }
};

const actions = {
    fetchPostFeed(context) {
        return new Promise((resolve, reject) => {
            var url = null;

            try {
                url = context.getters.feedPostsResponse.links.next;
            } catch (err) {
                url = mixin.methods.getApiUrl("/api/posts");
            }

            const headers = mixin.methods.getAuthorizationBearerToken();

            axios({
                url: url,
                headers: headers,
                method: "GET"
            })
                .then(response => {
                    context.commit("setFeedPostsResponse", response.data);
                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },

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
                    context.commit("setUserPostsResponse", response.data);
                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },

    createPost(context, payload) {
        return new Promise((resolve, reject) => {
            // var url = mixin.methods.getApiUrl("/api/posts");

            var url = mixin.methods.getApiUrl(
                "/api/users/" + this.getters.activeUser.id  + "/posts"
            );

            const headers = mixin.methods.getAuthorizationBearerToken();
            headers["Content-Type"] = "multipart/form-data";

            axios({
                url: url,
                headers: headers,
                method: "POST",
                data: payload
            })
                .then(response => {
                    context.commit("setPost", response.data.data.attributes);
                    context.commit("pushPostToFeed", response.data.data);

                    resolve(response);
                })
                .catch(err => {
                    console.log("err:", err);
                    reject(err);
                });
        });
    },

    deletePost(context, post) {
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
