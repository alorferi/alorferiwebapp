import { defineStore } from "pinia";
import { useStores } from "./registry";
import axios from "@/api";
import mixin from '../mixin';
export const useLibraryMemberRequestStore = defineStore("libraryMemberRequest", {
  state: () => ({
    myLibraryMemberRequest: JSON.parse(localStorage.getItem("myLibraryMemberRequest") || null)
  }),
  getters: {},
  actions: {
    setMyLibraryMemberRequest(myLibraryMemberRequest) {
      const state = this;
      state.myLibraryMemberRequest = myLibraryMemberRequest;
    },
    fetchMyLibraryMemberRequest(library_id) {
      const appStores = useStores();
      const endPoint = "/api/libraries/" + library_id + "/member-requests/my-request";
      var url = mixin.methods.getApiUrl(endPoint);
      var headers = mixin.methods.getHeaderWithAuthorizationBearerToken();
      return new Promise((resolve, reject) => {
        axios.get(url, headers).then(response => {
          const libraryMember = response.data.data.attributes;
          appStores.libraryMemberRequest.setMyLibraryMemberRequest(libraryMember);
          resolve(response);
        }).catch(err => {
          appStores.libraryMemberRequest.setMyLibraryMemberRequest(null);
          console.log("err:", err);
          reject(err);
        });
      });
    },
    createLibraryMemberRequest(payload) {
      const appStores = useStores();
      var url = mixin.methods.getApiUrl("/api/libraries/" + payload.library_id + "/member-requests");
      var headers = mixin.methods.getHeaderWithAuthorizationBearerToken();
      return new Promise((resolve, reject) => {
        axios.post(url, payload, headers).then(response => {
          const myLibraryMemberRequest = response.data.data.attributes;
          appStores.libraryMemberRequest.setMyLibraryMemberRequest(myLibraryMemberRequest);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    }
  }
});
export default useLibraryMemberRequestStore;
