import { MapSimple } from "@/interface/map";
import { View } from "./_view";
export declare class MapView extends View {
  protected map: MapSimple;
  protected source: any;
  protected layers: any[];
  protected onStart?: () => void;
  protected onReset?: () => void;
  constructor(map: any);
  init(layers: any[], source: any): this;
  start(): void;
  reset(): void;
  destroy(): void;
  view({
    features,
    features_label
  }?: {
    features?: never[] | undefined;
    features_label?: never[] | undefined;
  }): void;
}
