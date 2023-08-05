export interface MapSimple {
  id: string;
  [key: string]: any;
}
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

export type Coordinates = {
  x: number;
  y: number;
};
