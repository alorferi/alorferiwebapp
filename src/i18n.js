import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import bn from './locales/bn.json';
const locale=localStorage.getItem('lang')==='bn'?'bn':'en';
export default createI18n({legacy:false,globalInjection:true,locale,fallbackLocale:'en',messages:{en,bn}});
