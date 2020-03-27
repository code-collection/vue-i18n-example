<template>
  <div id="app">
    <button
      v-for="locale in locales"
      :key="locale.name"
      @click="changeLocale(locale.name)"
    >{{locale.text}}</button>
    <div id="nav">
      <router-link :to="prefix + '/'">{{$t('main.nav.home')}}</router-link> |
      <router-link :to="prefix + '/about'">{{$t('main.nav.about')}}</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { LOCALES_KEYS, LOCALES_MAGS } from "@/locales/index";
import { I18N_LOCALE, setLocale } from "@/plugins/i18n";
import PrefixMixin from "@/mixins/prefix";
export default {
  data() {
    return {
      locales: LOCALES_KEYS
    };
  },
  mixins: [PrefixMixin],
  methods: {
    changeLocale(key) {
      if (key === this.locale_key) {
        return;
      }
      let path = this.$route.path;
      if (path.startsWith(`/${this.locale_key}`)) {
        path = path.substring(this.locale_key.length + 1);
      }

      const newKey = key === I18N_LOCALE ? "" : `/${key}`;
      this.$router.push(`${newKey}${path}`);
    }
  },

  watch: {
    $route(to) {
      const newKey = to.params.locale;
      if (newKey && newKey !== this.locale_key) {
        setLocale(this.$store, newKey, LOCALES_MAGS[newKey]);
      }
      if (!newKey && this.locale_key !== I18N_LOCALE) {
        setLocale(this.$store, I18N_LOCALE, LOCALES_MAGS[I18N_LOCALE]);
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
