import { MapMultiLayer } from "./map/MapMultiLayer";
import { MapSingleLayer } from "./map/MapSingleLayer";
import { createDefaultViewInList } from "./list";
export class LayerBuild {
  constructor(info = {}) {
    this.info = info || {};
    this.cb_create_view_in_list = (info) => createDefaultViewInList(info);
  }
  setInfo(info) {
    this.info = Object.assign(this.info, info);
    return this;
  }
  setMetadata(metadata) {
    this.metadata = metadata;
    return this;
  }
  setCreateViewInMap(cb) {
    this.cb_create_view_in_map = cb;
    return this;
  }
  setLayers(layers) {
    if (!this.cb_create_view_in_map)
      this.setCreateViewInMap((info) => new MapMultiLayer(info));
    this.info.layers = layers;
    return this;
  }
  setLayer(layer) {
    if (!this.cb_create_view_in_map)
      this.setCreateViewInMap((info) => new MapSingleLayer(info));
    this.info.layer = layer;
    return this;
  }
  setSource(source) {
    this.info.source = source;
    return this;
  }
  disableDelete() {
    this.info.disable_delete = true;
    return this;
  }
  disableOpacity() {
    this.info.disabled_opacity = true;
    return this;
  }
  setColor(color) {
    this.info.color = color;
    return this;
  }
  build() {
    return {
      ...this.info,
      metadata: this.metadata,
      createViewInMap: this.cb_create_view_in_map
    };
  }
}
