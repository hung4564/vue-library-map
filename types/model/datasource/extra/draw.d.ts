import { ABuild } from "../build/_default";
import { Layer } from "../Layer";
declare type LayerDrawOption = object;
export declare class LayerDrawBuild extends ABuild<LayerDrawOption> {
  constructor();
  setForLayer(layer: Layer): this;
}
export {};
