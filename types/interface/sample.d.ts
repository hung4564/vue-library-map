import type { BBox, GeoJSON } from "geojson";
import type { Color } from "./datasource/list";
export declare type OptionRasterJson = {
  name: string;
  url: string;
};
export declare type OptionRasterTile = {
  name: string;
  tiles: string[];
  bounds?: BBox;
};
export declare type OptionGeojson = {
  name: string;
  geojson: GeoJSON;
  type: string;
  color?: Color;
};
