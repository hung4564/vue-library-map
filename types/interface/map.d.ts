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
export {};
