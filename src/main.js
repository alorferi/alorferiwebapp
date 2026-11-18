import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import {pinia,stores,storeActions} from './store';
import api from './api';
import {apiBaseUrl} from './config/runtime';
import i18n from './i18n';
import mixin from './mixin';
import UiModal from './components/ui/UiModal.vue';
import UiDropdown from './components/ui/UiDropdown.vue';
import UiFileInput from './components/ui/UiFileInput.vue';
import moment from 'moment';
import 'moment/locale/bn.js';
import '@/styles/tailwind.css';
import '@/styles/social.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/v5-font-face.css';
const app=createApp(App);
app.use(pinia);app.use(router);app.use(i18n);app.mixin(mixin);
app.component('UiModal',UiModal);app.component('UiDropdown',UiDropdown);app.component('UiFileInput',UiFileInput);
Object.assign(app.config.globalProperties,{$stores:stores,$actions:storeActions,$axios:api,$http:api,$apiServerBaseUrl:apiBaseUrl,moment});
if(stores.auth.access_token)api.defaults.headers.common.Authorization='Bearer '+stores.auth.access_token;
if(import.meta.env.MODE==='browser-test'){
    const {installBrowserHarness}=await import('./testing/browserHarness.js');
    installBrowserHarness(app,{router,pinia,stores,i18n});
}
app.mount('#app-root');
