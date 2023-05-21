const state = {
    activeLanguage: localStorage.getItem("lang") || "bn"
};
const getters = {
    activeLanguage: state => {
        return state.activeLanguage;
    }
};

const mutations = {
    setActiveLanguage: (state, newLanguage) => {
        state.activeLanguage = newLanguage
        localStorage.setItem("lang", newLanguage);
    }
};


const actions = {
    setActiveLanguage({ commit }, activeLanguage) {
        commit("setActiveLanguage", activeLanguage);
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};
