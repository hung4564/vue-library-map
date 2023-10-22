import { getStore, initStore } from "./store";

import merge from "lodash.merge";

initStore("lang", () => ({}));
const LANG_STORE = getStore("lang");

export const setMapLang = (mapId: string, lang: object) => {
  LANG_STORE[mapId] = lang;
};
export const removeMapLang = (mapId: string) => {
  delete LANG_STORE[mapId];
};

export const updateMapLang = (mapId: string, lang: object) => {
  LANG_STORE[mapId] = merge(LANG_STORE[mapId] || {}, lang);
};

export const mapLang = (mapId: string) => LANG_STORE[mapId] || {};
