import Vue from 'vue'
import VueRouter from 'vue-router'
import { LOCALES_KEYS, LOCALES_MAGS } from '@/locales'
import { setLocale } from '@/plugins/i18n'
import store from '@/store'

Vue.use(VueRouter)

function loadView(comp) {
  return () => import(/* webpackChunkName: "about" */ `../views/${comp}.vue`)
}

const routes = [
  {
    path: '',
    name: 'Home',
    component: loadView('Home')
  },
  {
    path: 'about',
    name: 'About',
    component: loadView('About')
  },
  {
    path: '*',
    name: '404',
    component: loadView('404')
  }
]

function getRootPath() {
  let reg = '';
  for (let i = 0; i < LOCALES_KEYS.length; i++) {
    reg = `${reg}${LOCALES_KEYS[i].name}${i !== LOCALES_KEYS.length - 1 ? '|' : ''}`
  }
  return `/:locale(${reg})?`
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: getRootPath(),
      component: {
        template: `<router-view></router-view>`
      },
      beforeEnter: function (to, from, next) {
        const locale_key = to.params.locale || 'zh';
        const locale = LOCALES_MAGS[locale_key];
        setLocale(store, locale_key, locale);
        next()
      },
      children: routes
    }
  ]
})

export default router
