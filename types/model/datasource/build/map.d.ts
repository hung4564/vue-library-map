import { Color } from "@/interface/datasource/list";
import { ABuild } from "./_default";
export declare class LayerMapBuild extends ABuild {
  constructor(option?: {});
  setLayers(layers: any[]): this;
  setLayer(layer: any): this;
  setSource(source: any): this;
}
export declare class LayerSimpleMapboxBuild {
  color?: Color;
  type: string;
  setColor(color: Color): this;
  setStyleType(type: string): this;
  build():
    | {
        layout: {
          visibility: string;
        };
        type: string;
        paint: {
          "circle-color": Color;
          "circle-radius": number;
          "line-color"?: undefined;
          "line-width"?: undefined;
          "fill-color"?: undefined;
        };
      }
    | {
        layout: {
          visibility: string;
        };
        type: string;
        paint: {
          "line-color": Color;
          "line-width": number;
          "circle-color"?: undefined;
          "circle-radius"?: undefined;
          "fill-color"?: undefined;
        };
      }
    | {
        layout: {
          visibility: string;
        };
        type: string;
        paint: {
          "fill-color": Color;
          "circle-color"?: undefined;
          "circle-radius"?: undefined;
          "line-color"?: undefined;
          "line-width"?: undefined;
        };
      }
    | undefined;
}
export declare const getDefaultLayer: (
  type: string,
  color?: Color | undefined
) =>
  | {
      layout: {
        visibility: string;
      };
      type: string;
      paint: {
        "circle-color": Color;
        "circle-radius": number;
        "line-color"?: undefined;
        "line-width"?: undefined;
        "fill-color"?: undefined;
      };
    }
  | {
      layout: {
        visibility: string;
      };
      type: string;
      paint: {
        "line-color": Color;
        "line-width": number;
        "circle-color"?: undefined;
        "circle-radius"?: undefined;
        "fill-color"?: undefined;
      };
    }
  | {
      layout: {
        visibility: string;
      };
      type: string;
      paint: {
        "fill-color": Color;
        "circle-color"?: undefined;
        "circle-radius"?: undefined;
        "line-color"?: undefined;
        "line-width"?: undefined;
      };
    }
  | undefined;
