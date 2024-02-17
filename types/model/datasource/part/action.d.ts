import {
  LayerAction,
  LayerActionOption,
  LayerActionView
} from "@/interface/datasource/action";
import { Layer } from "../Layer";
export declare class LayerActionBuild {
  option: LayerActionOption;
  constructor(option?: LayerActionOption);
  addAction(action: LayerAction): this;
  addActions(actions?: LayerAction[]): this;
  build(layer: Layer): LayerActionView;
}
export declare function createActionView(
  layer: Layer,
  config: LayerActionOption
): LayerActionView;
