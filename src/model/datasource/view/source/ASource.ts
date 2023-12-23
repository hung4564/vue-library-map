import { AView } from "../view";
import { AnySourceData } from "mapbox-gl";
import type { BBox } from "geojson";
import { ISource } from "@/interface/source";
import { MapSimple } from "@/interface/map";

export abstract class ASource extends AView implements ISource {
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
