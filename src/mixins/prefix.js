import { I18N_LOCALE } from "@/plugins/i18n";

export default {
  computed: {
    locale_key() {
      return this.$store.state.locale_key;
    },
    prefix() {
      return this.locale_key === I18N_LOCALE ? "" : `/${this.locale_key}`;
    }
  },
}