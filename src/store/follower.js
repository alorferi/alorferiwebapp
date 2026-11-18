const state = {
    followersResponse: { data: [], links: null, meta: null },
    follower: null,
    followingByMe: null,
    followingSource: null,
};

const getters = {
    follower: (state) => state.follower,
    followersResponse: (state) => state.followersResponse,
    followingByMe: (state) => state.followingByMe,
    followingSource: (state) => state.followingSource,
};

const mutations = {
    setFollowersResponse(state, newFollowersResponse) {
        if (state.followersResponse.data.length == 0) {
            state.followersResponse.data = newFollowersResponse.data;
        } else {
            newFollowersResponse.data.forEach(function (item) {
                state.followersResponse.data.push(item);
            });
        }
        state.followersResponse.links = newFollowersResponse.links;
        state.followersResponse.meta = newFollowersResponse.meta;
    },
    clearFollowersResponse(state) {
        state.followersResponse = { data: [], links: null, meta: null };
    },

    insertFollower(state, followerData) {
        state.followersResponse.data.splice(0, 0, followerData);
        if (!state.followersResponse.meta) state.followersResponse.meta = { total: 0 };
        state.followersResponse.meta.total++;
    },

    removeMeFromFollowers(state) {
        var activeUserId = this.getters.activeUser.id;

        state.followersResponse.data.forEach(function (followerItem, index, arr) {
            if (followerItem.attributes.user.id == activeUserId) {
                arr.splice(index, 1);
            }
        });

        if (state.followersResponse.meta)
            state.followersResponse.meta.total = Math.max(0, state.followersResponse.meta.total - 1);
    },

    setFollowingSource(state, source) {
        if (state.followingSource !== source) state.followingByMe = null;
        state.followingSource = source;
    },
    setFollowingByMe(state, newFollowingByMe) {
        state.followingByMe = newFollowingByMe;
    },

    clearFollowingByMe(state) {
        state.followingByMe = null;
    },
};

const actions = {};

export default {
    state,
    getters,
    mutations,
    actions,
};
