import type { BBox, GeoJSON } from "geojson";
import { ISourceBuild } from "./source";
import { ABuild } from "@/model/datasource/build/_default";
import type { Color } from "./datasource/list";
import { LayerAction } from "./datasource/action";
export declare type OptionDefault = {
  builds?: ABuild[];
  actions?: LayerAction[];
  source?: ISourceBuild;
};
export declare type OptionRasterJson = {
  name: string;
  url: string;
} & OptionDefault;
export declare type OptionRasterTile = {
  name: string;
  tiles: string[];
  bounds?: BBox;
} & OptionDefault;
export declare type OptionGeojson = {
  name: string;
  geojson: GeoJSON;
  type: string;
  color?: Color;
} & OptionDefault;
