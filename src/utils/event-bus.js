import Vue from "vue";
import mitt from "mitt";

if (!Vue.prototype.$_hungpv_map) {
  Vue.prototype.$_hungpv_map = {};
}
if (!Vue.prototype.$_hungpv_map.eventbus) {
  Vue.prototype.$_hungpv_map.eventbus = new mitt();
}
export const eventBus = Vue.prototype.$_hungpv_map.eventbus;
eventBus.on("*", (type, e) => console.log("eventBus", type, e));
export default eventBus;
export const EVENTBUS_TYPE = {
  MAP: {
    SET_LAYER: "map:set-layer",
    REMOVE_LAYER: "map:remove-layer"
  }
};
