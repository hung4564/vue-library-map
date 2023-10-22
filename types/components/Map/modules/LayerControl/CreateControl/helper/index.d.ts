export declare const LAYER_TYPES: {
  "raster-url": string;
  "raster-json": string;
  geojson: string;
};
export declare type LayerType = keyof typeof LAYER_TYPES;
export declare class LayerHelper {
  helper: any;
  constructor(type: LayerType);
  setType(type: LayerType): void;
  get default_value(): any;
  get create(): any;
  get component(): any;
  validate(form: any): any;
}
