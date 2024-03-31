// import Vue from "vue";
// import axios from "axios";
// import mixin from "../mixin";

const state = {
    myCart: JSON.parse(localStorage.getItem("myCart") || null),

    myCartsResponse: null,
};

const getters = {
    myCart: state => state.myCart,
    myCartsResponse: state => state.myCartsResponse,

};

const mutations = {

    setMyCart(state, myCart) {
        state.myCart = myCart;
    },

    setMyCartsResponse(state, myCartsResponse) {
        state.myCartsResponse = myCartsResponse;
    },


};

const actions = {



};

export default {
    state,
    getters,
    mutations,
    actions
};
