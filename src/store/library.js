import { defineStore } from "pinia";
import { useStores } from "./registry";
import axios from "@/api";
import mixin from "../mixin";
export const useLibraryStore = defineStore("library", {
  state: () => ({
    detailRequest: 0,
    library: JSON.parse(localStorage.getItem("library") || null),
    myLibrariesResponse: null,
    libraryCoverUrl: null,
    libraryStatus: null
  }),
  getters: {},
  actions: {
    setLibrary(library) {
      const state = this;
      state.library = library;
    },
    setLibraryCoverUrl(libraryCoverUrl) {
      const state = this;
      state.libraryCoverUrl = libraryCoverUrl;
    },
    setMyLibrariesResponse(myLibrariesResponse) {
      const state = this;
      state.myLibrariesResponse = myLibrariesResponse;
    },
    fetchLibrary(library_id) {
      const appStores = useStores();
      const request = ++this.detailRequest;
      const token = appStores.auth.access_token;
      var url = mixin.methods.getApiUrl("/api/libraries/" + library_id);
      var headers = mixin.methods.getHeaderWithAuthorizationBearerToken();
      return new Promise((resolve, reject) => {
        axios.get(url, headers).then(response => {
          const library = response.data.data.attributes;
          if (request === this.detailRequest && appStores.auth.access_token === token) appStores.library.setLibrary(library);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    },
    fetchSearchLibrary(username) {
      const appStores = useStores();
      const request = ++this.detailRequest;
      const token = appStores.auth.access_token;
      var url = mixin.methods.getApiUrl("/api/searches/" + username);
      var headers = mixin.methods.getHeaderWithAuthorizationBearerToken();
      return new Promise((resolve, reject) => {
        axios.get(url, headers).then(response => {
          const library = response.data.data.attributes;
          if (request === this.detailRequest && appStores.auth.access_token === token) appStores.library.setLibrary(library);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    },
    fetchMyLibraries(payload) {
      const appStores = useStores();
      var endpoint = "/api/users/" + appStores.user.activeUser.id + "/libraries";
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl(endpoint, payload.term, payload.page);
        const headers = mixin.methods.getAuthorizationBearerToken();
        axios({
          url: url,
          headers: headers,
          method: "GET"
        }).then(response => {
          const myLibrariesResponse = response.data;
          appStores.library.setMyLibrariesResponse(myLibrariesResponse);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    },
    fetchAllLibraries(payload) {
      const appStores = useStores();
      var endpoint = "/api/libraries";
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl(endpoint, payload.term, payload.page);
        const headers = mixin.methods.getAuthorizationBearerToken();
        axios({
          url: url,
          headers: headers,
          method: "GET"
        }).then(response => {
          const myLibrariesResponse = response.data;
          appStores.library.setMyLibrariesResponse(myLibrariesResponse);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    },
    uploadLibraryCoverPhoto(packet) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/libraries/" + packet.library_id + "/upload-cover-photo");
        const headers = mixin.methods.getAuthorizationBearerToken();
        headers["Content-Type"] = "multipart/form-data";
        const formData = packet.formData;
        axios({
          url: url,
          headers: headers,
          method: "POST",
          data: formData
        }).then(response => {
          const cover_url = response.data.data + "?tick=" + Date.now();
          appStores.library.setLibraryCoverUrl(cover_url);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    },
    uploadLibraryLogo(packet) {
      const appStores = useStores();
      return new Promise((resolve, reject) => {
        var url = mixin.methods.getApiUrl("/api/libraries/" + packet.library_id + "/upload-logo");
        const headers = mixin.methods.getAuthorizationBearerToken();
        headers["Content-Type"] = "multipart/form-data";
        const formData = packet.formData;
        axios({
          url: url,
          headers: headers,
          method: "POST",
          data: formData
        }).then(response => {
          const logo_url = response.data.data + "?tick=" + Date.now();
          const library = appStores.library.library;
          library.logo_url = logo_url;
          appStores.library.setLibrary(library);
          resolve(response);
        }).catch(err => {
          console.log("err:", err);
          reject(err);
        });
      });
    }
  }
});
export default useLibraryStore;
