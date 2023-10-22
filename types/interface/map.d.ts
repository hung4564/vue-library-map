import type { BBox } from "geojson";
import { Map as Mapbox } from "mapbox-gl";
export interface MapSimple extends Mapbox {
  id: string;
}
declare type RGB = `rgb(${number}, ${number}, ${number})`;
declare type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
declare type HEX = `#${string}`;
export declare type Color = RGB | RGBA | HEX;
export declare type Coordinates = {
  x: number;
  y: number;
};
export declare type CoordinatesNumber = [number, number];
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
export declare type SourceScheme = "xyz" | "tms";
export {};
