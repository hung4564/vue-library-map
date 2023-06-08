import { getUUIDv4 } from "@/utils";
export class Layer {
  map_id = "";
  sub_map_ids = [];
  get id() {
    return this._id;
  }
  isHasMapId(map_id) {
    if (this.map_id === map_id) {
      return true;
    }
    return this.sub_map_ids.includes(map_id);
  }
  constructor() {
    this._id = `${getUUIDv4()}`;
    this.views = [];
    return this.asProxy();
  }
  asProxy() {
    let handler = {
      get: function (target, prop) {
        if (typeof target[prop] !== "undefined") return target[prop];

        return function wrapper() {
          let args = Array.prototype.slice.call(arguments);
          return this.runViewWithNameFunction(prop, ...args);
        };
      }
    };

    return new Proxy(this, handler);
  }
  addToMap(map) {
    if (map.id && !this.sub_map_ids.includes(map.id)) {
      this.sub_map_ids.push(map.id);
    }
    let args = Array.prototype.slice.call(arguments);
    return this.runViewWithNameFunction("addToMap", ...args);
  }
  removeFromMap(map) {
    if (map.id && this.sub_map_ids.includes(map.id)) {
      let index = this.sub_map_ids.indexOf(map.id);
      if (index !== -1) {
        this.sub_map_ids.splice(index, 1);
      }
    }
    let args = Array.prototype.slice.call(arguments);
    return this.runViewWithNameFunction("removeFromMap", ...args);
  }
  setMapId(id) {
    this.map_id = id;
    this.views.forEach((view) => {
      return (view.map_id = this.map_id);
    });
  }
  addView(...views) {
    views.forEach((view) => {
      view.data_id = this.id;
      if (this.map_id) {
        view.map_id = this.map_id;
      }
    });
    this.views.push(...views);
  }
  withView(cb) {
    for (let i = 0; i < this.views.length; i++) cb.bind(this)(this.views[i]);
  }
  runViewWithNameFunction(name_func, ...params) {
    let promises = [];
    this.withView((view) => {
      if (view[name_func]) {
        promises.push(view[name_func](...params));
      }
    });

    return Promise.all(promises);
  }
}
