import { defineStore } from "pinia";
import { useStores } from "./registry";
import axios from "@/api";
import mixin from "../mixin";
export const useComplainStore = defineStore("complain", {
  state: () => ({
    complainTypesResponse: {
      data: []
    }
  }),
  getters: {},
  actions: {
    setComplainTypesResponse(newComplainTypesResponse) {
      const state = this;
      state.complainTypesResponse.data = newComplainTypesResponse.data;
    },
    fetchComplainTypes(complainableType) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/complain-types/" + complainableType);
        console.log("url", url);
        const headers = mixin.methods.getAuthorizationBearerToken();
        axios({
          url: url,
          headers: headers,
          method: "GET"
        }).then(response => {
          console.log(response.data);
          appStores.complain.setComplainTypesResponse(response.data);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    },
    createReport(dataModel) {
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/complains");
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
export default useComplainStore;
