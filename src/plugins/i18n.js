import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { LOCALES_MAGS } from '@/locales/index'

Vue.use(VueI18n)

export const I18N_LOCALE = process.env.VUE_APP_I18N_LOCALE || 'zh';

const i18n = new VueI18n({
  silentTranslationWarn: true,
  locale: I18N_LOCALE,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: LOCALES_MAGS
})

export const setLocale = (store, locale_key, locale) => {
  store.commit('setLocaleKey', locale_key);
  store.commit('setLocale', locale);
  i18n.setLocaleMessage(locale_key, locale);
  i18n.locale = locale_key
}

export default i18n;