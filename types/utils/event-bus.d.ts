declare const eventBus: any;
export { eventBus };
export default eventBus;
export declare const EVENTBUS_TYPE: {
  MAP: {
    SET_LAYER: string;
    SET_BASEMAP: string;
    UPDATE_LAYERS: string;
    REMOVE_LAYER: string;
    INIT: string;
    DESTROY: string;
    COMPARE: string;
  };
  EVENT: {
    ADD: string;
    REMOVE: string;
    UPDATE_CURRENT: string;
  };
};
