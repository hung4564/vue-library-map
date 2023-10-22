export interface MapSimple {
  id: string;
  [key: string]: any;
}
declare type RGB = `rgb(${number}, ${number}, ${number})`;
declare type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
declare type HEX = `#${string}`;
export declare type Color = RGB | RGBA | HEX;
export declare type Coordinates = {
  x: number;
  y: number;
};
export {};
