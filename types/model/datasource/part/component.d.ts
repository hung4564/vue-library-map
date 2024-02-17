import {
  ILayerComponentItem,
  ILayerComponentView,
  LayerComponentOption
} from "@/interface/datasource/component";
import { Layer } from "../Layer";
import { LayerAction } from "@/interface/datasource/action";
export declare class LayerComponentBuild {
  option: LayerComponentOption;
  build(layer: Layer): LayerComponentView;
}
declare class LayerComponentView implements ILayerComponentView {
  option: LayerComponentOption;
  components: ILayerComponentItem[];
  layer: Layer;
  constructor(layer: Layer, option?: LayerComponentOption);
  setFromAction(menu: LayerAction): this;
  add(component: ILayerComponentItem): this;
  remove(component: ILayerComponentItem): this;
  removeFromMap(): void;
}
export {};
