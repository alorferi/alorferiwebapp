import { defineStore } from "pinia";
import { useStores } from "./registry";
import axios from "@/api";
import mixin from "../mixin";
export const useLibraryMemberStore = defineStore("libraryMember", {
  state: () => ({
    libraryMember: JSON.parse(localStorage.getItem("libraryMember") || null),
    activeLibraryMember: JSON.parse(localStorage.getItem("activeLibraryMember") || null),
    myLibraryMembership: JSON.parse(localStorage.getItem("myLibraryMembership") || null),
    libraryMembersResponse: null,
    libraryStatus: null
  }),
  getters: {},
  actions: {
    setLibraryMembersResponse(libraryMembersResponse) {
      const state = this;
      state.libraryMembersResponse = libraryMembersResponse;
    },
    setMyLibraryMembership(myLibraryMembership) {
      const state = this;
      state.myLibraryMembership = myLibraryMembership;
    },
    fetchLibraryMember(memberId) {
      const appStores = useStores();
      var url = mixin.methods.getApiUrl("/api/libraries/" + memberId);
      var headers = mixin.methods.getHeaderWithAuthorizationBearerToken();
      return new Promise((resolve, reject) => {
        axios.get(url, headers).then(response => {
          const libraryMember = response.data.data.attributes;
          appStores.libraryBook.setLibraryBook(libraryMember);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    },
    fetchLibraryMembers(payload) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        const endPoint = "/api/libraries/" + payload.library_id + "/members";
        var url = mixin.methods.getApiUrl(endPoint, payload.term, payload.page);
        const headers = mixin.methods.getAuthorizationBearerToken();
        axios({
          url: url,
          headers: headers,
          method: "GET"
        }).then(response => {
          const libraryMembersResponse = response.data;
          appStores.libraryMember.setLibraryMembersResponse(libraryMembersResponse);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    },
    fetchMyLibraryMembership(library_id) {
      const appStores = useStores();
      const endPoint = "/api/libraries/" + library_id + "/members/my-membership";
      var url = mixin.methods.getApiUrl(endPoint);
      var headers = mixin.methods.getHeaderWithAuthorizationBearerToken();
      return new Promise((resolve, reject) => {
        axios.get(url, headers).then(response => {
          const libraryMember = response.data.data.attributes;
          appStores.libraryMember.setMyLibraryMembership(libraryMember);
          resolve(response);
        }).catch(err => {
          appStores.libraryMember.setMyLibraryMembership(null);
          console.log("err:", err);
          reject(err);
        });
      });
    }
  }
});
export default useLibraryMemberStore;
