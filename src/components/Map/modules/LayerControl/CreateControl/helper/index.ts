import {
  ConfigGeojsonHelper,
  ConfigRasterJsonHelper,
  ConfigRasterUrlHelper
} from "./custom";

import { ConfigNo } from "../config";

export const LAYER_TYPES = {
  "raster-url": "Raster url layer",
  "raster-json": "Raster json layer",
  geojson: "Geojson layer"
};
export type LayerType = keyof typeof LAYER_TYPES;

export class LayerHelper {
  helper!: any;
  constructor(type: LayerType) {
    this.setType(type);
  }
  public setType(type: LayerType) {
    this.helper = HelperFactory.create(type);
  }
  get default_value(): any {
    return this.helper.default_value;
  }
  get create() {
    return this.helper.create;
  }
  get component() {
    return this.helper.component || ConfigNo;
  }
  validate(form: any) {
    return this.helper.validate(form);
  }
}
const HelperFactory = {
  create(type: LayerType) {
    switch (type) {
      case "raster-url":
        return new ConfigRasterUrlHelper();
      case "raster-json":
        return new ConfigRasterJsonHelper();
      case "geojson":
        return new ConfigGeojsonHelper();

      default:
        throw new Error("not support type: " + type);
    }
  }
};
