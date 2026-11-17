import axios from "axios";
import mixin from "@/mixin";

const state = {
    postsResponse: { data: [], links: null, meta: null },
    post: null,
    postsPaging: { source: null, generation: 0, loading: false, loaded: false, next: null, error: false }
};

const getters = {
    post: state => state.post,
    postsResponse: state => state.postsResponse,
    postsPaging: state => state.postsPaging
};

function resetFeed(state, source = null) {
    state.postsResponse = { data: [], links: null, meta: null };
    state.postsPaging = {
        source,
        generation: state.postsPaging.generation + 1,
        loading: false,
        loaded: false,
        next: null,
        error: false,
    };
}

function appendPosts(state, response) {
    const ids = new Set(state.postsResponse.data.map((post) => String(post.attributes.id)));
    for (const post of response.data) {
        const id = String(post.attributes.id);
        if (!ids.has(id)) {
            ids.add(id);
            state.postsResponse.data.push(post);
        }
    }
    state.postsResponse.links = response.links;
    state.postsResponse.meta = response.meta;
}

const mutations = {
    setPost(state, newPost) {
        state.post = newPost;
    },

    insertPostToFeed(state, newPost) {
        const id = String(newPost.attributes.id);
        state.postsResponse.data = state.postsResponse.data.filter(post => String(post.attributes.id) !== id);
        state.postsResponse.data.unshift(newPost);
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
        resetFeed(state);
    },

    beginPostsFeed(state, source) {
        resetFeed(state, source);
    },

    releasePostsFeed(state, generation) {
        if (state.postsPaging.generation === generation) resetFeed(state);
    },

    setPostsPaging(state, { generation, ...changes }) {
        if (state.postsPaging.generation === generation) Object.assign(state.postsPaging, changes);
    },

    setPostsResponse: appendPosts,
    setUserPostsResponse: appendPosts,

    pushPostComments(state, payload) {
        state.postsResponse.data.forEach(function(post) {
            if (post.attributes.id == payload.post.id) {
                if (post.attributes.comments_data == null) {
                    post.attributes.comments_data = payload.data;
                } else {
                    payload.data.data.forEach(function(comment) {
                        post.attributes.comments_data.data.push(comment);
                        post.attributes.comments_data.meta.total++;
                    });
                }
            }
        });
    },

    pushPostLikes(state, payload) {
        state.postsResponse.data.forEach(function(post) {
            if (post.attributes.id == payload.post.id) {
                if (post.attributes.likes_data == null) {
                    post.attributes.likes_data = payload.data;
                } else {
                    payload.data.data.forEach(function(like) {
                        post.attributes.likes_data.data.push(like);
                        post.attributes.likes_data.meta.total++;
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
                    post.attributes.likes_data.data.forEach(function(
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
                postItem.attributes.comments_data.data.forEach(function(
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
    fetchPostFeed(context, options = {}) {
        return context.dispatch("fetchPostsPage", { ...options, source: "/api/posts" });
    },

    async fetchPostsPage({ state, rootGetters, commit }, { source, generation, reset = false, retry = false }) {
        if (!rootGetters.isLoggedIn) return null;
        if (generation != null && generation !== state.postsPaging.generation) return null;
        if (reset || state.postsPaging.source !== source) commit("beginPostsFeed", source);

        const paging = state.postsPaging;
        if (paging.loading || (paging.error && !retry) || (paging.loaded && !paging.next)) return null;

        const requestGeneration = paging.generation;
        const token = rootGetters.access_token;
        const current = () =>
            state.postsPaging.generation === requestGeneration &&
            state.postsPaging.source === source &&
            rootGetters.isLoggedIn &&
            rootGetters.access_token === token;
        commit("setPostsPaging", { generation: requestGeneration, loading: true, error: false });
        try {
            const firstUrl = mixin.methods.getApiUrl(source);
            const url = paging.loaded ? new URL(paging.next, firstUrl).href : firstUrl;
            const response = await axios.get(url, { headers: mixin.methods.getAuthorizationBearerToken() });
            if (!current()) return null;
            if (!response.data || !Array.isArray(response.data.data)) throw new Error("Invalid post page");
            commit("setPostsResponse", response.data);
            commit("setPostsPaging", {
                generation: requestGeneration,
                loading: false,
                loaded: true,
                error: false,
                next: (response.data.links && response.data.links.next) || null,
            });
            return response;
        } catch (error) {
            if (!current()) return null;
            commit("setPostsPaging", { generation: requestGeneration, loading: false, error: true });
            throw error;
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
