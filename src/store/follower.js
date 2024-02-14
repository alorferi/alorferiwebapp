
const state = {
    followersResponse: { data: [], links: null, meta: null },
    follower: null,
    followingByMe: null
};

const getters = {
    follower: state => state.follower,
    followersResponse: state => state.followersResponse,
    followingByMe: state => state.followingByMe
};

const mutations = {
    setFollowersResponse(state, newFollowersResponse) {
        if (state.followersResponse.data.length == 0) {
            state.followersResponse.data = newFollowersResponse.data;
        } else {
            newFollowersResponse.data.forEach(function(item) {
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
        state.followersResponse.meta.total =
            state.followersResponse.meta.total + 1;
    },

    removeMeFromFollowers(state) {
        var activeUserId = this.getters.activeUser.id;

        state.followersResponse.data.forEach(function(
            followerItem,
            index,
            arr
        ) {
            if (followerItem.attributes.user.id == activeUserId) {
                arr.splice(index, 1);
            }
        });

        state.followersResponse.meta.total =
            state.followersResponse.meta.total - 1;
    },

    setFollowingByMe(state, newFollowingByMe) {
        state.followingByMe = newFollowingByMe;
    },

    clearFollowingByMe(state) {
        state.followingByMe = null;
    }
};

const actions = {

};

export default {
    state,
    getters,
    mutations,
    actions
};
