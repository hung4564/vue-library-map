import { fitBounds } from "@/helper";
/* eslint-disable no-unused-vars */
import { getUUIDv4 } from "@/utils";

export class ALayer {
  constructor(info) {
    this.info = Object.assign({ metadata: {} }, info);
    this._id = this.info.id || `${getUUIDv4()}`;
    this.views = [];
  }
  addView(...layer_view) {
    this.views.push(...layer_view);
  }
  withView(cb) {
    for (let i = 0; i < this.views.length; i++) cb.bind(this)(this.views[i]);
  }
  runViewWithNameFunction(name_func, ...params) {
    this.withView((view) => {
      if (view[name_func]) {
        view[name_func](this, ...params);
      }
    });
  }
  get id() {
    return this._id;
  }
  get type() {
    return this.info ? this.info.type : "";
  }
  get metadata() {
    return this.info ? this.info.metadata : {};
  }
  getBeforeId() {
    return this.id;
  }
  addToMap(map, beforeId) {
    throw new Error("Class not implement 'addToMap' method");
  }
  removeFromMap(map) {
    throw new Error("Class not implement 'removeFromMap' method");
  }
  moveLayer(map, beforeId) {
    throw new Error("Class not implement 'moveLayer' method");
  }
  toggleShow(map, show) {
    throw new Error("Class not implement 'toggleShow' method");
  }
  setOpacity(map, opacity) {
    throw new Error("Class not implement 'setOpacity' method");
  }
  flyTo(map, bounds) {
    let layer = this.info;
    if (!bounds && layer.metadata && layer.metadata.bounds) {
      bounds = layer.metadata.bounds;
    }
    if (!bounds) {
      return;
    }

    fitBounds(map, bounds);
    this.runViewWithNameFunction("flyTo", map, bounds);
  }
}
