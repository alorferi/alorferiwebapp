import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import PortalVue from "portal-vue";
Vue.use(PortalVue);

// Import the styles directly. (Or you could add them via script tags.)
import JQuery from "jquery";

window.$ = window.JQuery = JQuery;

import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.prototype.$http = Axios;

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
