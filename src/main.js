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
window.$ = window.JQuery = require("jquery");

import mixin from "./mixin"

Vue.mixin(mixin);

Vue.use(VueAxios, axios);
Vue.prototype.$axios = axios;

Vue.use(PortalVue);

import moment from 'moment'

Vue.prototype.moment = moment

Vue.prototype.$apiServerBaseUrl = process.env.VUE_APP_API_SERVER_BASE_URL;
Vue.prototype.$apiClientId = process.env.VUE_APP_API_SERVER_CLIENT_ID;
Vue.prototype.$apiClientSecret = process.env.VUE_APP_API_SERVER_CLIENT_SECRET;

// console.log("apiServerBaseUrl", Vue.prototype.$apiServerBaseUrl);
// console.log("apiClientId", Vue.prototype.$apiClientId);
// console.log("apiClientSecret", Vue.prototype.$apiClientSecret);


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
