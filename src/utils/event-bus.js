import Vue from "vue";
import mitt from "mitt";

if (!Vue.prototype.$_hungpv_map_eventbus) {
  Vue.prototype.$_hungpv_map_eventbus = new mitt();
}
export const eventBus = Vue.prototype.$_hungpv_map_eventbus;
eventBus.on("*", (type, e) => console.log("eventBus", type, e));
export default eventBus;
export const EVENTBUS_TYPE = {
  MAP: {
    SET_LAYER: "map:set-layer",
    REMOVE_LAYER: "map:remove-layer"
  }
};
