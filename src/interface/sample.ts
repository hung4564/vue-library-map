import type { BBox, GeoJSON } from "geojson";
import { ISourceBuild } from "./source";

import { ABuild } from "@/model/datasource/build/_default";
import type { Color } from "./datasource/list";
import { LayerAction } from "./datasource/action";

export type OptionDefault = {
  builds?: ABuild[];
  actions?: LayerAction[];
  source?: ISourceBuild;
};
export type OptionRasterJson = {
  name: string;
  url: string;
} & OptionDefault;
export type OptionRasterTile = {
  name: string;
  tiles: string[];
  bounds?: BBox;
} & OptionDefault;

export type OptionGeojson = {
  name: string;
  geojson: GeoJSON;
  type: string;
  color?: Color;
} & OptionDefault;
