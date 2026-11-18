import { defineStore } from "pinia";
import { useStores } from "./registry";
import axios from "@/api";
import mixin from '../mixin';
export const useLibraryBookStore = defineStore("libraryBook", {
  state: () => ({
    libraryBook: JSON.parse(localStorage.getItem("libraryBook") || null),
    libraryBooksResponse: null,
    libraryStatus: null
  }),
  getters: {},
  actions: {
    setLibraryBook(libraryBook) {
      const state = this;
      state.libraryBook = libraryBook;
    },
    setLibraryBooksResponse(libraryBooksResponse) {
      const state = this;
      state.libraryBooksResponse = libraryBooksResponse;
    },
    fetchLibraryBook(library_id) {
      const appStores = useStores();
      var url = mixin.methods.getApiUrl("/api/libraries/" + library_id);
      var headers = mixin.methods.getHeaderWithAuthorizationBearerToken();
      return new Promise((resolve, reject) => {
        axios.get(url, headers).then(response => {
          const libraryBook = response.data.data.attributes;
          appStores.libraryBook.setLibraryBook(libraryBook);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    },
    fetchLibraryBooks(payload) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        const endPoint = "/api/libraries/" + payload.library_id + "/books";
        var url = mixin.methods.getApiUrl(endPoint, payload.term, payload.page);
        const headers = mixin.methods.getAuthorizationBearerToken();
        axios({
          url: url,
          headers: headers,
          method: "GET"
        }).then(response => {
          const libraryBooksResponse = response.data;
          appStores.libraryBook.setLibraryBooksResponse(libraryBooksResponse);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    }
  }
});
export default useLibraryBookStore;
