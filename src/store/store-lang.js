import Vue from "vue";
import merge from "lodash/merge";
if (!Vue.prototype.$_hungpv_map_lang_object) {
  Vue.prototype.$_hungpv_map_lang_object = {};
}
function copyByJson(json) {
  return JSON.parse(JSON.stringify(json));
}

export const setMapLang = (mapId, lang) => {
  Vue.prototype.$_hungpv_map_lang_object[mapId] = copyByJson(lang);
};
export const removeMapLang = (mapId) => {
  delete Vue.prototype.$_hungpv_map_lang_object[mapId];
};

export const updateMapLang = (mapId, lang) => {
  Vue.prototype.$_hungpv_map_lang_object[mapId] = merge(
    Vue.prototype.$_hungpv_map_lang_object[mapId] || {},
    copyByJson(lang)
  );
};

export const mapLang = (mapId) =>
  Vue.prototype.$_hungpv_map_lang_object[mapId] || {};
