import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";

import JQuery from "jquery";
import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import PortalVue from "portal-vue";

Vue.use(VueAxios, axios);

Vue.use(PortalVue);

window.$ = window.JQuery = JQuery;

Vue.prototype.$apiServerBaseUrl = "http://alorfericpanelsrv.test";
Vue.prototype.$apiClientId = "91309ef1-f5dc-4b0e-b311-1b19f94dbe16";
Vue.prototype.$apiClientSecret = "n0Kywq6QTvTBFjNmvEtqJacxmiKtfLHGpA0czcQG";

Vue.mixin({
    methods: {
        getApiUrl(endPoint) {
            return this.$apiServerBaseUrl + endPoint;
        },
        extractUrl(text) {
            var regex = /(https?:\/\/[^ ]*)/;
            // var regex = /^(https?:\/\/[^/]+(\/[\w-]+)+)/;

            var matches = text.match(regex);

            if (matches.length >= 1) {
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

// Vue.prototype.$http = axios;

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
