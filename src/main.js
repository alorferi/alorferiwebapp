import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";


import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import PortalVue from "portal-vue";

// import JQuery from "jquery";
// window.$ = window.JQuery = JQuery;
window.$ = window.JQuery = require('jquery');

Vue.use(VueAxios, axios);
Vue.prototype.$axios = axios

Vue.use(PortalVue);


Vue.prototype.$apiServerBaseUrl = process.env.VUE_APP_API_SERVER_BASE_URL;
Vue.prototype.$apiClientId = process.env.VUE_APP_API_SERVER_CLIENT_ID;
Vue.prototype.$apiClientSecret = process.env.VUE_APP_API_SERVER_CLIENT_SECRET;

// console.log("apiServerBaseUrl", Vue.prototype.$apiServerBaseUrl);
// console.log("apiClientId", Vue.prototype.$apiClientId);
// console.log("apiClientSecret", Vue.prototype.$apiClientSecret);

Vue.mixin({
    methods: {
        getApiUrl(endPoint) {
            return this.$apiServerBaseUrl + endPoint;
        },
        getEndPointQueryString(endPoint, term = null,page=null) {

            if(page == null){
                page = this.$route.query.page
            }

            if(term == null){
                term = this.$route.query.term
            }

            var queryObj ={
                page: page==undefined? null: page,
                term: term==undefined? null: term,
        }

       queryObj = this.cleanObject(queryObj)

    var qString = new URLSearchParams(queryObj).toString()

    return endPoint +"?"+ qString;


        },
        cleanObject(obj) {
            for (var propName in obj) {
              if (obj[propName] === null || obj[propName] === undefined) {
                delete obj[propName];
              }
            }
            return obj
          },
        getBearerToken(){
            return {
                headers: {
                    Authorization: "Bearer " + this.$store.getters.access_token
                }
            }
        },
        extractUrl(text) {
            var regex = /(https?:\/\/[^ ]*)/;
            // var regex = /^(https?:\/\/[^/]+(\/[\w-]+)+)/;

            var matches = text.match(regex);

            if (matches && matches.length >= 1) {
                return matches[0];
            }

            return null;
        },
        extractYouTubeVideoId(url) {
            var newval = "";
            var vid = "";

            if ((newval = url.match(/(\?|&)v=([^&#]+)/))) {
                vid = newval.pop();
            } else if ((newval = url.match(/(\.be\/)+([^\\/]+)/))) {
                vid = newval.pop();
            } else if ((newval = url.match(/(\\embed\/)+([^\\/]+)/))) {
                vid = newval.pop().replace("?rel=0", "");
            }

            return vid;
        }
    }
});

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

//  Vue.prototype.$http = axios;

const access_token = localStorage.getItem("access_token");
if (access_token) {
    Vue.prototype.$http.defaults.headers.common["Authorization"] =
        "Bearer " + access_token;
}

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
