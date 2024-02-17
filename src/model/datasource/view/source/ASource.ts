import type { BBox, FeatureCollection, GeoJSON, Geometry } from "geojson";

import { AView } from "../view";
import { AnySourceData } from "mapbox-gl";
import { ISource } from "@/interface/source";
import { MapSimple } from "@/interface/map";

export abstract class ASource<IFeature = any>
  extends AView
  implements ISource<IFeature>
{
  bounds: BBox;
  constructor() {
    super();
    this.bounds = [-180, -85.051129, 180, 85.051129];
    this.runAfterSetParent = () => {
      if (this.bounds && this.parent) {
        this.parent.metadata.bounds = this.bounds;
      }
    };
  }
  getAll(): FeatureCollection<Geometry, IFeature> | undefined {
    return undefined;
  }
  setData(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _?: FeatureCollection<Geometry, IFeature> | GeoJSON | string | undefined
  ) {
    return;
  }
  setBounds(bounds: BBox) {
    this.bounds = bounds;
    if (this.parent) {
      this.parent.metadata.bounds = bounds;
    }
  }
  addToMap(map: MapSimple) {
    if (this.id && !map.getSource(this.id)) {
      map.addSource(this.id, this.getMapboxSource());
    }
  }
  removeFromMap(map: MapSimple) {
    if (this.id && map.getSource(this.id)) {
      map.removeSource(this.id);
    }
  }
  abstract updateForMap(map: MapSimple): void;
  getMapboxSource(): AnySourceData {
    return {
      type: "geojson"
    };
  }
}
