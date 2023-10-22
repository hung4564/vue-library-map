import type { BBox } from "geojson";
import { Map as Mapbox } from "mapbox-gl";

export interface MapSimple extends Mapbox {
  id: string;
}
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

export type Coordinates = {
  x: number;
  y: number;
};
export type CoordinatesNumber = [number, number];

export interface IRasterOption {
  bounds?: BBox;
  maxzoom?: number;
  minzoom?: number;
  scheme?: SourceScheme;
  tiles?: string[];
  tileSize?: number;
  url?: string;
}
export interface IRasterSource extends IRasterOption {
  type: "raster";
}
export type SourceScheme = "xyz" | "tms";
