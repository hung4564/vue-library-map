import {
  CircleLayer,
  FillLayer,
  Layer as LayerMapbox,
  LineLayer,
  RasterLayer,
  SymbolLayer
} from "mapbox-gl";
import { ABuild } from "./_default";
import { Color } from "@/interface/datasource/list";
import { Layer } from "../Layer";
export declare class LayerMapBuild extends ABuild {
  constructor(option?: {});
  setLayers(layers: Omit<LayerMapbox, "id">[]): this;
  setLayer(layer: Omit<LayerMapbox, "id">): this;
  setSource(source: any): this;
  setForLayer(layer: Layer): this;
}
export interface ILayerMapboxBuild {
  build(): Omit<LayerMapbox, "id">;
}
export declare class LayerRasterMapboxBuild implements ILayerMapboxBuild {
  build(): Omit<RasterLayer, "id">;
}
export declare class LayerSimpleMapboxBuild implements ILayerMapboxBuild {
  color?: Color;
  type: string;
  setColor(color: Color): this;
  setStyleType(type: string): this;
  build(): Omit<LayerMapbox, "id">;
}
export declare const getDefaultLayer: (
  type: string,
  color?: Color | undefined
) => Omit<LineLayer | FillLayer | CircleLayer | SymbolLayer, "id">;
