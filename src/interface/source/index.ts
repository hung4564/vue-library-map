import { BBox, FeatureCollection, Geometry } from "geojson";

import { IView } from "../datasource/view";
import { MapSimple } from "../map";

export interface ISourceBuild {
  build: BuildConstructor;
}
export interface ISource extends IView {
  getMapboxSource: () => object;
  updateForMap: (map: MapSimple) => void;
  addToMap: (map: MapSimple) => void;
  removeFromMap: (map: MapSimple) => void;
  bounds: BBox;
}
type BuildConstructor = {
  (): ISource;
};
export interface IGeojsonOption {
  bounds?: BBox;
}

export type FeatureReturn<T extends {}> = T & {
  geometry: Geometry;
};
export interface DataHandle<IList = any, IFeature extends {} = any> {
  setData(data: IList): IList;
  getAll(format: DataHandleFormatList): IList;
  convertToGeoJson(geojson: IList): FeatureCollection<Geometry, IFeature>;
}
export type DataHandleFormatList = "list" | "geojson";
