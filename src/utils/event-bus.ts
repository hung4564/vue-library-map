import { getStore, initStore } from "@/store/store";

import mitt from "mitt";

initStore("eventbus", () => mitt());
const eventBus = getStore("eventbus");
export { eventBus };
export default eventBus;
export const EVENTBUS_TYPE = {
  MAP: {
    SET_LAYER: "map:set-layer",
    SET_BASEMAP: "map:set-basemap",
    UPDATE_LAYERS: "map:update-layers",
    REMOVE_LAYER: "map:remove-layer",
    INIT: "map:init",
    DESTROY: "map:destroy",
    COMPARE: "map:compare"
  },
  EVENT: {
    ADD: "map:add-event",
    REMOVE: "map:remove-event",
    UPDATE_CURRENT: "map:update-event-current"
  },
  COMPONENT: {
    ADD: "map:add-component",
    REMOVE: "map:remove-component"
  }
};
