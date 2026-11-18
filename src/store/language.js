import { defineStore } from "pinia";
import { useStores } from "./registry";
export const useLanguageStore = defineStore("language", {
  state: () => ({
    activeLanguage: localStorage.getItem("lang") || "en"
  }),
  getters: {},
  actions: {
    applySetActiveLanguage(newLanguage) {
      const state = this;
      state.activeLanguage = newLanguage;
    },
    setActiveLanguage(activeLanguage) {
      const appStores = useStores();
      localStorage.setItem("lang", activeLanguage);
      appStores.language.applySetActiveLanguage(activeLanguage);
    }
  }
});
export default useLanguageStore;
