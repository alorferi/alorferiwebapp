// import Vue from "vue";
// import axios from "axios";
// import mixin from "../mixin";

const state = {
    myCart: JSON.parse(localStorage.getItem("myCart") || null) || [] ,

};

const getters = {
    myCart: state => state.myCart,


};

const mutations = {

    addProductToCart(state, product) {

     const filterItems = state.myCart.filter(item => item.id == product.id);

       if(filterItems.length == 0){
        state.myCart.push(product);
       }


    },


};

const actions = {

    addProductToCart(context, prodcut) {

        context.commit("addProductToCart", prodcut);

    },


};

export default {
    state,
    getters,
    mutations,
    actions
};
