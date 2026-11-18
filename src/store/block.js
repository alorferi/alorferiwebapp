import { defineStore } from "pinia";
import axios from "@/api";
import mixin from "../mixin";
export const useBlockStore = defineStore("block", {
  state: () => ({
    blockTypesResponse: {
      data: []
    }
  }),
  getters: {},
  actions: {
    setBlockTypesResponse(newBlockTypesResponse) {
      const state = this;
      state.blockTypesResponse.data = newBlockTypesResponse.data;
    },
    createBlock(dataModel) {
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/blocks");
        const headers = mixin.methods.getAuthorizationBearerToken();
        axios({
          url: url,
          headers: headers,
          method: "POST",
          data: dataModel
        }).then(response => {
          resolve(response);
        }).catch(err => {
          console.log("error", err.message);
          reject(err);
        });
      });
    }
  }
});
export default useBlockStore;
