import { BBox, FeatureCollection, Geometry } from "geojson";
import { IView } from "../datasource/view";
export interface ISourceBuild {
  build: BuildConstructor;
}
export interface ISource extends IView {
  getMapboxSource: () => object;
  bounds: BBox;
}
declare type BuildConstructor = {
  (): ISource;
};
export interface IGeojsonOption {
  bounds?: BBox;
}
export declare type FeatureReturn<T extends {}> = T & {
  geometry: Geometry;
};
export interface DataHandle<IList = any, IFeature extends {} = any> {
  setData(data: IList): IList;
  getAll(format: DataHandleFormatList): IList;
  convertToGeoJson(geojson: IList): FeatureCollection<Geometry, IFeature>;
  find(id: string | number): FeatureReturn<IFeature> | undefined;
  create(data: FeatureReturn<IFeature>): FeatureReturn<IFeature>;
  update(
    id: string | number,
    data: FeatureReturn<IFeature>
  ): FeatureReturn<IFeature>;
  delete(id: string | number): boolean;
}
export declare type DataHandleFormatList = "list" | "geojson";
export {};
