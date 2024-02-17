import {
  BBox,
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry
} from "geojson";
import { IView } from "../datasource/view";
import { MapSimple } from "../map";
export interface ISourceBuild {
  build: BuildConstructor;
}
export declare type ISource<IFeature = GeoJsonProperties> = IView &
  DataHandle<IFeature> & {
    getMapboxSource: () => object;
    updateForMap: (map: MapSimple) => void;
    addToMap: (map: MapSimple) => void;
    removeFromMap: (map: MapSimple) => void;
    bounds: BBox;
  };
declare type BuildConstructor = {
  (): ISource;
};
export interface IGeojsonOption {
  bounds?: BBox;
}
export interface DataHandle<IFeature = GeoJsonProperties> {
  setData(
    data?: FeatureCollection<Geometry, IFeature> | string | undefined
  ): void;
  getAll(): FeatureCollection<Geometry, IFeature> | undefined;
  addFeatures?: (
    features: Feature<Geometry, IFeature>[]
  ) => Promise<boolean | void>;
  updateFeatures?: (
    features: Feature<Geometry, IFeature>[]
  ) => Promise<boolean | void>;
  deleteFeatures?: (
    features: Feature<Geometry, IFeature>[]
  ) => Promise<boolean | void>;
  getFeatures?: (point: [number, number]) => Promise<Feature[]>;
}
export {};
