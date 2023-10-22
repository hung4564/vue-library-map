import {
  LayerAction,
  LayerActionOption,
  LayerActionView
} from "@/interface/datasource/action";
import { ABuild } from "./_default";
import { Layer } from "../Layer";
export declare class LayerActionBuild extends ABuild<
  LayerActionOption,
  LayerActionView
> {
  constructor(option?: LayerActionOption);
  addAction(action: LayerAction): this;
  setForLayer(layer: Layer): this;
}
export declare function createActionView(
  layer: Layer,
  config: LayerActionOption
): LayerActionView;
