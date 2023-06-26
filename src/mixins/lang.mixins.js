import enLang from "@/lang/en/map";
import { storeLang } from "@hungpv97/vue-map-store";
import viLang from "@/lang/vi/map";
const { mapLang, removeMapLang, setMapLang } = storeLang;

export const LangMixin = {
  props: {
    trans: { type: Function },
    locale: { type: [String, Object], default: "en" }
  },
  computed: {
    transText() {
      return mapLang(this.id);
    }
  },
  mounted() {
    this.setLocale(this.locale);
  },
  watch: {
    locale() {
      this.setLocale(this.locale);
    }
  },
  beforeDestroy() {
    removeMapLang(this.id);
  },
  methods: {
    async setLocale(locale) {
      if (typeof locale == "object") {
        setMapLang(this.id, locale);
      } else if (["en", "vi"].includes(locale)) {
        let res = locale == "en" ? enLang : viLang;
        setMapLang(this.id, { map: res });
      }
    },
    transLocal(key) {
      return getProp(this.transText, key, key);
    }
  }
};

function getProp(object, path, defaultVal) {
  const _path = Array.isArray(path)
    ? path
    : path.split(".").filter((i) => i.length);

  if (!_path.length) {
    return object === undefined ? defaultVal : object;
  }
  if (object == null) return defaultVal;
  return getProp(object[_path.shift()], _path, defaultVal);
}
