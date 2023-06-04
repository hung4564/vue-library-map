import { MultiLayer } from "./data/MultiLayer";
import { SingleLayer } from "./data/SingleLayer";
import { createDefaultView } from "./view";

export class LayerBuild {
  constructor(info = {}) {
    this.info = info || {};
    this.cb_create_view = (info) => createDefaultView(info);
  }
  setInfo(info) {
    this.info = Object.assign(this.info, info);
    return this;
  }
  setMetadata(metadata) {
    this.metadata = metadata;
    return this;
  }
  setCreateView(cb) {
    this.cb_create_view = cb;
    return this;
  }
  setCreateData(cb) {
    this.cb_create_data = cb;
    return this;
  }
  setLayers(layers) {
    this.setCreateData((info) => new MultiLayer(info));
    this.info.layers = layers;
    return this;
  }
  setLayer(layer) {
    this.setCreateData((info) => new SingleLayer(info));
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
  disableOpactiy() {
    this.info.disabled_opacity = true;
    return this;
  }
  build() {
    return {
      ...this.info,
      metadata: this.metadata,
      createView: this.cb_create_view,
      createData: this.cb_create_data
    };
  }
}
