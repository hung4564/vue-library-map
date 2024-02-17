import { LayerBuildFunction } from "@/interface/datasource/view";
import { Layer } from "../Layer";
import { LayerPartContainer } from "./_default";
export declare class LayerBuildContainer extends LayerPartContainer {
  builds: {
    [key: string]: [LayerBuildFunction, any];
  };
  set(key: string | undefined, build: LayerBuildFunction, option?: any): this;
  build(key: string, layer: Layer): import("@/interface/datasource/view").IView;
  canForView(key: string): boolean;
}
