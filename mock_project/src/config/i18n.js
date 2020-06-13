import Vue from 'vue';
import VueI18n from 'vue-i18n';

import en from '../../locales/en.json'
import jp from '../../locales/ja.json'
import vi from '../../locales/vi.json'

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'vi', // set locale
  fallbackLocale: 'vi', // set fallback locale
  messages: {
    en: en,
    jp: jp,
    vi: vi
  }
});

export default i18n;