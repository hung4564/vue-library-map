import {
  DataHandle,
  FeatureReturn,
  IGeojsonOption,
  ISourceBuild
} from "@/interface/source";
import type { Feature, FeatureCollection, GeoJSON, Geometry } from "geojson";
import { ASource } from "./ASource";
export declare class GeoJsonSourceBuild implements ISourceBuild {
  protected geojson: GeoJSON;
  protected option: IGeojsonOption;
  setData(geojson: GeoJSON): this;
  build(): GeojsonDataHandle<any>;
}
export declare class GeojsonDataHandle<T extends {} = any>
  extends ASource
  implements DataHandle<GeoJSON, T>
{
  geojson: FeatureCollection<Geometry, T>;
  protected field_id: string;
  protected option: IGeojsonOption;
  constructor(geojson: GeoJSON, option?: IGeojsonOption);
  getMapboxSource(): {
    type: string;
    data: FeatureCollection<Geometry, T>;
  };
  setData(data: GeoJSON): GeoJSON;
  getAll(format?: string): FeatureCollection<Geometry, T>;
  convertToGeoJson(
    geojson: FeatureCollection<Geometry, T>
  ): FeatureCollection<Geometry, T>;
  checkData(data: Feature<Geometry, any>, id: string | number): boolean;
  find(id: string | number): FeatureReturn<T> | undefined;
  create(data: FeatureReturn<T>): FeatureReturn<T>;
  update(id: string | number, data: FeatureReturn<T>): FeatureReturn<T>;
  delete(id: string | number): boolean;
}
