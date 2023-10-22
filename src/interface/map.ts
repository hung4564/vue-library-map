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
