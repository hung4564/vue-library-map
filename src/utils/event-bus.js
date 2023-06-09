import Vue from "vue";
import mitt from "mitt";

if (!Vue.prototype.$_hungpv_map) {
  Vue.prototype.$_hungpv_map = {};
}
let eventBus = Vue.prototype.$_hungpv_map.eventbus;
if (!eventBus) {
  eventBus = new mitt();
  Vue.prototype.$_hungpv_map.eventbus = eventBus;
  eventBus.on("*", (type, e) => console.log("eventBus", type, e));
}
export { eventBus };
export default eventBus;
export const EVENTBUS_TYPE = {
  MAP: {
    SET_LAYER: "map:set-layer",
    UPDATE_LAYERS: "map:update-layers",
    REMOVE_LAYER: "map:remove-layer",
    INIT: "map:init",
    DESTROY: "map:destroy",
    COMPARE: "map:compare"
  }
};
