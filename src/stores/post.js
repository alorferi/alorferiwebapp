const state = {
    post: null,
    postsResponse: null
};

const getters = {
    getPost: state => state.post,
    getPostsResponse: state => state.postsResponse
};

const mutations = {
    setPost(state, post) {
        state.post = post;
    },

    setPostResponse(state, postsResponse) {
        state.postsResponse = postsResponse;
    }
};

const actions = {};

export default {
    state,
    getters,
    mutations,
    actions
};
