import Vue from "vue";
import merge from "lodash/merge";
if (!Vue.prototype.$_hungpv_map.lang_object) {
  Vue.prototype.$_hungpv_map.lang_object = {};
}

export const setMapLang = (mapId, lang) => {
  Vue.prototype.$_hungpv_map.lang_object[mapId] = lang;
};
export const removeMapLang = (mapId) => {
  delete Vue.prototype.$_hungpv_map.lang_object[mapId];
};

export const updateMapLang = (mapId, lang) => {
  Vue.prototype.$_hungpv_map.lang_object[mapId] = merge(
    Vue.prototype.$_hungpv_map.lang_object[mapId] || {},
    lang
  );
};

export const mapLang = (mapId) =>
  Vue.prototype.$_hungpv_map.lang_object[mapId] || {};
