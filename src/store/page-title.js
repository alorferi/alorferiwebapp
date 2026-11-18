import { defineStore } from "pinia";
import { useStores } from "./registry";
export const usePageTitleStore = defineStore("pageTitle", {
  state: () => ({
    pageTitle: "Welcome"
  }),
  getters: {},
  actions: {
    applySetPageTitle(pageTitle) {
      const state = this;
      state.pageTitle = pageTitle + " | Alor Feri";
      document.title = state.pageTitle;
    },
    setPageTitle(pageTitle) {
      const appStores = useStores();
      appStores.pageTitle.applySetPageTitle(pageTitle);
    }
  }
});
export default usePageTitleStore;
