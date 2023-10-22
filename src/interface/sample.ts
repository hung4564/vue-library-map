import type { BBox, GeoJSON } from "geojson";

import type { Color } from "./datasource/list";

export type OptionRasterJson = {
  name: string;
  url: string;
};
export type OptionRasterTile = {
  name: string;
  tiles: string[];
  bounds?: BBox;
};

export type OptionGeojson = {
  name: string;
  geojson: GeoJSON;
  type: string;
  color?: Color;
};
