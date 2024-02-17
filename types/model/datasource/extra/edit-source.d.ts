import { ABuild } from "../build/_default";
import { Layer } from "../Layer";
declare type LayerEditSourceOption = {};
export declare class LayerEditSourceBuild extends ABuild<LayerEditSourceOption> {
  constructor(options?: LayerEditSourceOption);
  setForLayer(layer: Layer): this;
}
export {};
