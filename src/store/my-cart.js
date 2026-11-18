import { defineStore } from "pinia";
import { useStores } from "./registry";
export const useMyCartStore = defineStore("myCart", {
  state: () => ({
    myCart: JSON.parse(localStorage.getItem("myCart") || null) || []
  }),
  getters: {},
  actions: {
    applyAddProductToCart(product) {
      const state = this;
      const filterItems = state.myCart.filter(item => item.id == product.id);
      if (filterItems.length == 0) {
        state.myCart.push(product);
      }
    },
    addProductToCart(prodcut) {
      const appStores = useStores();
      appStores.myCart.applyAddProductToCart(prodcut);
    }
  }
});
export default useMyCartStore;
