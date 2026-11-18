import { defineStore } from "pinia";
import { useStores } from "./registry";
import axios from "@/api";
import mixin from '../mixin';
export const useLibraryBookIssueStore = defineStore("libraryBookIssue", {
  state: () => ({
    libraryBookIssue: JSON.parse(localStorage.getItem("libraryBookIssue") || null),
    libraryBookIssuesResponse: null,
    libraryStatus: null
  }),
  getters: {},
  actions: {
    setLibraryBook(libraryBookIssue) {
      const state = this;
      state.libraryBookIssue = libraryBookIssue;
    },
    setLibraryBookIssuesResponse(libraryBookIssuesResponse) {
      const state = this;
      state.libraryBookIssuesResponse = libraryBookIssuesResponse;
    },
    fetchLibraryBookIssue(library_id) {
      const appStores = useStores();
      var url = mixin.methods.getApiUrl("/api/libraries/" + library_id);
      var headers = mixin.methods.getHeaderWithAuthorizationBearerToken();
      return new Promise((resolve, reject) => {
        axios.get(url, headers).then(response => {
          const libraryBookIssue = response.data.data.attributes;
          appStores.libraryBook.setLibraryBook(libraryBookIssue);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    },
    fetchLibraryBookIssues(payload) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        const endPoint = "/api/libraries/" + payload.library_id + "/book-issues";
        var url = mixin.methods.getApiUrl(endPoint, payload.term, payload.page);
        const headers = mixin.methods.getAuthorizationBearerToken();
        axios({
          url: url,
          headers: headers,
          method: "GET"
        }).then(response => {
          const libraryBookIssuesResponse = response.data;
          appStores.libraryBookIssue.setLibraryBookIssuesResponse(libraryBookIssuesResponse);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    }
  }
});
export default useLibraryBookIssueStore;
