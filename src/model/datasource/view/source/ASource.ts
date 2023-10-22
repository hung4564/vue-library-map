import { AView } from "../view";
import type { BBox } from "geojson";
import { ISource } from "@/interface/source";

export class ASource extends AView implements ISource {
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
  getMapboxSource() {
    return {};
  }
}
