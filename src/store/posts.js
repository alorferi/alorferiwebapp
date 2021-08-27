import axios from "axios";
import mixin from "../mixin";

const state = {
    feedPostsResponse: { data: [], links: null, meta: null },
    userPostsResponse: [],
    post: null
};

const getters = {
    post: state => state.post,

    feedPostsResponse: state => state.feedPostsResponse,
    userPostsResponse: state => state.userPostsResponse
};

const mutations = {
    setPost(state, newPost) {
        state.post = newPost;
    },

    insertPostToFeed(state, newPost) {
        state.feedPostsResponse.data.splice(0, 0, newPost);
    },


    updatePostToFeed(state, updatedPost) {
        state.feedPostsResponse.data.forEach(function(postItem) {
            if (postItem.attributes.id == updatedPost.attributes.id) {
                postItem.attributes.title = updatedPost.attributes.title;
                postItem.attributes.body = updatedPost.attributes.body;
                postItem.attributes.image_url = updatedPost.attributes.image_url ==null ? null : updatedPost.attributes.image_url+ "?rand="+Date.now();
            }
        });
    },


    removePost(state, post) {
        state.feedPostsResponse.data.forEach(function(postItem, index, arr) {
            if (postItem.attributes.id == post.id) {
                arr.splice(index, 1);
            }
        });
    },

    setFeedPostsResponse(state, newPostsResponse) {
        if (state.feedPostsResponse.data.length == 0) {
            state.feedPostsResponse.data = newPostsResponse.data;
        } else {
            newPostsResponse.data.forEach(function(item) {
                state.feedPostsResponse.data.push(item);
            });
        }

        state.feedPostsResponse.links = newPostsResponse.links;
        state.feedPostsResponse.meta = newPostsResponse.meta;
        //  state.feedPostsResponse = newPostsResponse;
    },

    setUserPostsResponse(state, newPostsResponse) {
        state.userPostsResponse = newPostsResponse;
    },
    pushPostComments(state, payload) {
        state.feedPostsResponse.data.forEach(function(post) {
            if (post.attributes.id == payload.post.id) {

                if( post.attributes.comments==null){
                    post.attributes.comments = payload.data
                }else{
                    payload.data.data.forEach(function(comment) {
                        post.attributes.comments.data.push(comment);
                        post.attributes.comments.meta.total ++  ;
                    })
                }

            }

        });
    },


    removePostComment(state, packet) {
        state.feedPostsResponse.data.forEach(function(postItem) {


            if (postItem.attributes.id == packet.overhead.post.id) {

                postItem.attributes.comments.data.forEach(function(commentItem, index, arr) {

                    if(commentItem.attributes.id == packet.overhead.comment.id) {
                        arr.splice(index, 1);
                    }

                })


            }

        });
    },

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

    storePost(context, fromData) {
        return new Promise((resolve, reject) => {
            // var url = mixin.methods.getApiUrl("/api/posts");

            var url = mixin.methods.getApiUrl(
                "/api/users/" + this.getters.activeUser.id + "/posts"
            );

            const headers = mixin.methods.getAuthorizationBearerToken();
            headers["Content-Type"] = "multipart/form-data";

            axios({
                url: url,
                headers: headers,
                method: "POST",
                data: fromData
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


    updatePost(context, packet) {
        return new Promise((resolve, reject) => {
            // var url = mixin.methods.getApiUrl("/api/posts");

            var url = mixin.methods.getApiUrl(
                "/api/users/" + this.getters.activeUser.id + "/posts/"+ packet.overhead.post.id +"?_method=PUT"
            );

            const headers = mixin.methods.getAuthorizationBearerToken();
            headers["Content-Type"] = "multipart/form-data";

          const formData =   packet.formData


            axios({
                url: url,
                headers: headers,
                method: "POST",
                data:formData
            })
                .then(response => {
                    context.commit("updatePostToFeed", response.data.data );

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
};

export default {
    state,
    getters,
    mutations,
    actions
};
