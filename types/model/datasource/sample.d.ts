import type {
  OptionDefault,
  OptionGeojson,
  OptionRasterJson,
  OptionRasterTile
} from "@/interface/sample";
import { Layer } from "./Layer";
export declare function setupDefault(
  layer: Layer,
  default_options: Required<OptionDefault>,
  options?: OptionDefault
): Layer<
  import("../../interface/source").ISource<import("geojson").GeoJsonProperties>
>;
export declare function createRasterUrlLayer(
  options: OptionRasterTile
): Layer<
  import("../../interface/source").ISource<import("geojson").GeoJsonProperties>
>;
export declare function createRasterJsonLayer(
  options: OptionRasterJson
): Layer<
  import("../../interface/source").ISource<import("geojson").GeoJsonProperties>
>;
export declare function createGeoJsonLayer(
  options: OptionGeojson
): Layer<
  import("../../interface/source").ISource<import("geojson").GeoJsonProperties>
>;
