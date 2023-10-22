import { LayerBuildFunction } from "@/interface/datasource/view";
import { Layer } from "../Layer";
import { LayerPartContainer } from "./_default";

export class LayerBuildContainer extends LayerPartContainer {
  builds: { [key: string]: [LayerBuildFunction, any] } = {};
  set(key = "", build: LayerBuildFunction, option: any = {}) {
    this.builds[key] = [build, option];
    return this;
  }
  build(key: string, layer: Layer) {
    const [build, option] = this.builds[key];
    const res = build(layer, option);
    res.setParent(layer);
    return res;
  }
  canForView(key: string) {
    if (!key) {
      return false;
    }
    return !!this.builds[key];
  }
}
