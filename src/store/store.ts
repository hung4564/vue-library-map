import Vue from "vue";

if (!Vue.prototype.$_hungpv_map) {
  Vue.prototype.$_hungpv_map = {};
}

const STORE: { [key: string]: any } = Vue.prototype.$_hungpv_map;

export function getStore(type?: string) {
  if (type) {
    return STORE[type];
  }
  return STORE;
}

export function setStore(type: string, value: any) {
  if (type) {
    STORE[type] = value;
  }
}

export function initStore<T = any>(type: string, cb: () => T) {
  if (type && !STORE[type]) {
    STORE[type] = cb() as T;
  }
}
