import {
  CircleLayer,
  FillLayer,
  Layer as LayerMapbox,
  LineLayer,
  RasterLayer
} from "mapbox-gl";
import { MapMultiLayer, MapSingleLayer } from "../view/map";

import { ABuild } from "./_default";
import { Color } from "@/interface/datasource/list";
import { Layer } from "../Layer";
import { getChartRandomColor } from "@/utils/color";

export class LayerMapBuild extends ABuild {
  editable: boolean = false;
  constructor(option = {}) {
    super("map", option);
  }
  setLayers(layers: Omit<LayerMapbox, "id">[]) {
    if (!this.build)
      this.setBuild((_: any, option: any) => new MapMultiLayer(option));
    this.option.layers = layers;
    return this;
  }
  setLayer(layer: Omit<LayerMapbox, "id">) {
    if (!this.build)
      this.setBuild((_: any, option: any) => new MapSingleLayer(option));
    this.option.layer = Object.assign({ layout: {}, paint: {} }, layer);
    return this;
  }
  setSource(source: any) {
    this.option.source = source;
    return this;
  }
  setEditable(editable = true) {
    this.editable = editable;
    return this;
  }
  runAfterSetLayer(layer: Layer) {
    layer.getAction().addAction({
      id: "editable",
      menu: {
        name: "edit style",
        type: "item",
        icon: ""
      },
      type: "edit-style"
    });
  }
}
export interface ILayerMapboxBuild {
  build(): Omit<LayerMapbox, "id">;
}
export class LayerRasterMapboxBuild implements ILayerMapboxBuild {
  build(): Omit<RasterLayer, "id"> {
    return {
      type: "raster"
    };
  }
}
export class LayerSimpleMapboxBuild implements ILayerMapboxBuild {
  public color?: Color;
  public type: string = "point";
  setColor(color: Color) {
    this.color = color;
    return this;
  }
  setStyleType(type: string) {
    this.type = type;
    return this;
  }
  build(): Omit<LayerMapbox, "id"> {
    return getDefaultLayer(this.type, this.color);
  }
}

export const getDefaultLayer = (
  type: string,
  color?: Color
): Omit<LineLayer | FillLayer | CircleLayer, "id"> => {
  switch (type) {
    case "point":
      return {
        layout: { visibility: "visible" },
        type: "circle",
        paint: {
          "circle-color": color || getChartRandomColor(),
          "circle-radius": 6
        }
      };

    case "line":
      return {
        layout: { visibility: "visible" },
        type: "line",
        paint: {
          "line-color": color || getChartRandomColor(),
          "line-width": 4
        }
      };
    case "area":
      return {
        layout: { visibility: "visible" },
        type: "fill",
        paint: {
          "fill-color": color || getChartRandomColor()
        }
      };

    default:
      throw new Error("Invalid type: " + type);
  }
};
