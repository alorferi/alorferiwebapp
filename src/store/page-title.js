const state = {
    pageTitle: "Welcome"
};
const getters = {
    pageTitle: state => {
        return state.pageTitle;
    }
};

const mutations = {
    setPageTitle: (state, pageTitle) => {
        state.pageTitle = pageTitle + " | Alor Feri";
        document.title = state.pageTitle
    }
};


const actions = {
    setPageTitle({ commit }, pageTitle) {
        commit("setPageTitle", pageTitle);
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};
