import type {
  OptionGeojson,
  OptionRasterJson,
  OptionRasterTile
} from "@/interface/sample";
import { Layer } from "./Layer";
export declare function createRasterUrlLayer({
  name,
  tiles,
  bounds
}: OptionRasterTile): Layer<import("../../interface/source").ISource>;
export declare function createRasterJsonLayer({
  name,
  url
}: OptionRasterJson): Layer<import("../../interface/source").ISource>;
export declare function createGeoJsonLayer({
  name,
  geojson,
  type,
  color
}: OptionGeojson): Layer<import("../../interface/source").ISource>;
