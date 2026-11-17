import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";

import ImageUploader from "vue-image-upload-resize";
Vue.use(ImageUploader);

import "@/styles/tailwind.css";
import UiModal from "@/components/ui/UiModal.vue";
import UiDropdown from "@/components/ui/UiDropdown.vue";
import UiFileInput from "@/components/ui/UiFileInput.vue";
Vue.component("UiModal", UiModal);
Vue.component("UiDropdown", UiDropdown);
Vue.component("UiFileInput", UiFileInput);

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";


import PortalVue from "portal-vue";


import mixin from "./mixin";

Vue.mixin(mixin);

Vue.use(VueAxios, axios);
Vue.prototype.$axios = axios;

Vue.use(PortalVue);

import moment from "moment";
import i18n from "./i18n";

Vue.prototype.moment = moment;

Vue.prototype.$apiServerBaseUrl = process.env.VUE_APP_API_SERVER_BASE_URL;
Vue.prototype.$apiClientId = process.env.VUE_APP_API_SERVER_CLIENT_ID;
Vue.prototype.$apiClientSecret = process.env.VUE_APP_API_SERVER_CLIENT_SECRET;

// console.log("apiServerBaseUrl", Vue.prototype.$apiServerBaseUrl);
// console.log("apiClientId", Vue.prototype.$apiClientId);
// console.log("apiClientSecret", Vue.prototype.$apiClientSecret);


//  Vue.prototype.$http = axios;

const access_token = JSON.parse(localStorage.getItem("otc_token") || null);
if (access_token) {
    Vue.prototype.$http.defaults.headers.common["Authorization"] =
        "Bearer " + access_token;
}

Vue.config.productionTip = false;

// router.beforeEach((to, from, next) => {
//     let language = to.params.lang;

//     if (!language) {
//         language = "en";
//     }

//     store.dispatch("setActiveLanguage",language)

//     i18n.locale = language;


//     next();
// });

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount("#app");
