import { LegendOption, LegendView } from "@/interface/datasource/legend";
import { ABuild } from "./_default";
import { Layer } from "../Layer";
export declare class LayerLegendBuild extends ABuild<LegendOption> {
  constructor();
  addItem(item: any): this;
  setComponent(component: any): this;
  setItems(items?: any[]): this;
}
export declare function createIdentifyView(
  layer: Layer,
  config: LegendOption
): LegendView;
