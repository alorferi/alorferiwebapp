import axios from "axios";
import mixin from "@/mixin";

const state = {
    postsResponse: { data: [], links: null, meta: null },
    post: null
};

const getters = {
    post: state => state.post,
    postsResponse: state => state.postsResponse
};

const mutations = {
    setPost(state, newPost) {
        state.post = newPost;
    },

    insertPostToFeed(state, newPost) {
        state.postsResponse.data.splice(0, 0, newPost);
    },

    updatePostToFeed(state, updatedPost) {
        state.postsResponse.data.forEach(function(postItem) {
            if (postItem.attributes.id == updatedPost.attributes.id) {
                postItem.attributes.title = updatedPost.attributes.title;
                postItem.attributes.body = updatedPost.attributes.body;
                postItem.attributes.image_url =
                    updatedPost.attributes.image_url == null
                        ? null
                        : updatedPost.attributes.image_url +
                          "?rand=" +
                          Date.now();
            }
        });
    },

    removePost(state, post) {
        state.postsResponse.data.forEach(function(postItem, index, arr) {
            if (postItem.attributes.id == post.id) {
                arr.splice(index, 1);
            }
        });
    },

    clearPostsResponse(state) {
        state.postsResponse = { data: [], links: null, meta: null };
    },

    setPostsResponse(state, newPostsResponse) {
        if (state.postsResponse.data.length == 0) {
            state.postsResponse.data = newPostsResponse.data;
        } else {
            newPostsResponse.data.forEach(function(item) {
                state.postsResponse.data.push(item);
            });
        }

        state.postsResponse.links = newPostsResponse.links;
        state.postsResponse.meta = newPostsResponse.meta;
    },

    setUserPostsResponse(state, newPostsResponse) {
        this.setPostsResponse(state, newPostsResponse);
    },
    pushPostComments(state, payload) {
        state.postsResponse.data.forEach(function(post) {
            if (post.attributes.id == payload.post.id) {
                if (post.attributes.comments == null) {
                    post.attributes.comments = payload.data;
                } else {
                    payload.data.data.forEach(function(comment) {
                        post.attributes.comments.data.push(comment);
                        post.attributes.comments.meta.total++;
                    });
                }
            }
        });
    },

    pushPostLikes(state, payload) {
        state.postsResponse.data.forEach(function(post) {
            if (post.attributes.id == payload.post.id) {
                if (post.attributes.likes == null) {
                    post.attributes.likes = payload.data;
                } else {
                    payload.data.data.forEach(function(like) {
                        post.attributes.likes.data.push(like);
                        post.attributes.likes.meta.total++;
                    });
                }
            }
        });
    },
    pushMyLikeOnPost(state, payload) {
        state.postsResponse.data.forEach(function(post) {
            if (post.attributes.id == payload.post.id) {
                if (post.attributes.my_like == null) {
                    post.attributes.my_like = payload.my_like;
                }
            }
        });
    },
    removeMyLikeFromPost(state, packet) {
        state.postsResponse.data.forEach(function(post) {
            if (post.attributes.id == packet.overhead.post.id) {
                if (post.attributes.my_like != null) {
                    post.attributes.likes.data.forEach(function(
                        likeItem,
                        index,
                        arr
                    ) {
                        if (
                            likeItem.attributes.id == post.attributes.my_like.id
                        ) {
                            arr.splice(index, 1);
                        }
                    });

                    post.attributes.my_like = null;
                }
            }
        });
    },

    removePostComment(state, packet) {
        state.postsResponse.data.forEach(function(postItem) {
            if (postItem.attributes.id == packet.overhead.post.id) {
                postItem.attributes.comments.data.forEach(function(
                    commentItem,
                    index,
                    arr
                ) {
                    if (
                        commentItem.attributes.id == packet.overhead.comment.id
                    ) {
                        arr.splice(index, 1);
                    }
                });
            }
        });
    }
};

const actions = {
    fetchPostFeed(context) {
        return new Promise((resolve, reject) => {
            var url = null;

            try {
                url = context.getters.postsResponse.links.next;
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




};

export default {
    state,
    getters,
    mutations,
    actions
};
