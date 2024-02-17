import type {
  Feature,
  FeatureCollection,
  GeoJSON,
  GeoJsonProperties,
  Geometry
} from "geojson";
import { GeoJSONSourceRaw } from "mapbox-gl";
import { IGeojsonOption, ISource, ISourceBuild } from "@/interface/source";
import { ASource } from "./ASource";
import { MapSimple } from "@/interface/map";
export declare class GeoJsonSourceBuild implements ISourceBuild {
  protected geojson: GeoJSON;
  protected option: IGeojsonOption;
  setData(geojson: GeoJSON): this;
  build(): GeojsonDataHandle<GeoJsonProperties>;
}
export declare class GeojsonDataHandle<
    T extends GeoJsonProperties = GeoJsonProperties
  >
  extends ASource<T>
  implements ISource<T>
{
  geojson: FeatureCollection<Geometry, T>;
  protected field_id: string;
  protected option: IGeojsonOption;
  constructor(geojson: GeoJSON, option?: IGeojsonOption);
  getMapboxSource(): GeoJSONSourceRaw;
  updateForMap(map: MapSimple): void;
  setData(
    data?: FeatureCollection<Geometry, T> | GeoJSON | string | undefined
  ): undefined;
  getAll(): FeatureCollection<Geometry, T>;
  addFeatures(features?: Feature<Geometry, T>[]): Promise<void>;
  updateFeatures(features?: Feature<Geometry, T>[]): Promise<void>;
  deleteFeatures(features?: Feature<Geometry, T>[]): Promise<void>;
  getFeatures(point: [number, number]): Promise<Feature<Geometry, T>[]>;
}
