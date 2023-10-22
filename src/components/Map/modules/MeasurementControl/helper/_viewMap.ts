import { GeoJSONSource } from "mapbox-gl";
import { MapSimple } from "@/interface/map";
import { View } from "./_view";
import { getUUIDv4 } from "@/utils";

export class MapView extends View {
  protected map: MapSimple;
  protected source: any;
  protected layers: any[] = [];
  protected onStart?: () => void;
  protected onReset?: () => void;
  constructor(map: any) {
    super();
    this.map = map;
  }
  init(layers: any[], source: any) {
    if (!source.id) {
      source.id = `measurment-control-${getUUIDv4()}`;
    }
    this.map.addSource(source.id, source.data);
    layers.forEach((layer) => {
      if (!layer.id) {
        layer.id = `measurment-control-${getUUIDv4()}`;
      }
      if (!layer.source) {
        layer.source = source.id;
      }
      this.map.addLayer(layer);
    });
    this.source = source;
    this.layers = layers;
    return this;
  }
  start() {
    if (this.onStart) {
      this.onStart();
    }
  }
  reset() {
    const source = this.map.getSource(this.source.id);
    if (source) {
      (source as GeoJSONSource).setData({
        type: "FeatureCollection",
        features: []
      });
    }
    if (this.onReset) {
      this.onReset();
    }
  }
  destroy() {
    if (!this.map) return;
    this.layers.forEach((layer) => {
      const layerId = layer.id;
      if (this.map.getLayer(layerId)) {
        this.map.removeLayer(layerId);
      }

      if (this.map.getSource(layerId)) {
        this.map.removeSource(layerId);
      }
    });
    if (this.map.getSource(this.source.id)) {
      this.map.removeSource(this.source.id);
    }
  }
  view({ features = [], features_label = [] } = {}) {
    const source = this.map.getSource(this.source.id);
    if (source) {
      (source as GeoJSONSource).setData({
        type: "FeatureCollection",
        features: [...features, ...features_label]
      });
    }
  }
}
