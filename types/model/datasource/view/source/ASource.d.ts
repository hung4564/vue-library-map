import type { BBox, FeatureCollection, GeoJSON, Geometry } from "geojson";
import { AView } from "../view";
import { AnySourceData } from "mapbox-gl";
import { ISource } from "@/interface/source";
import { MapSimple } from "@/interface/map";
export declare abstract class ASource<IFeature = any>
  extends AView
  implements ISource<IFeature>
{
  bounds: BBox;
  constructor();
  getAll(): FeatureCollection<Geometry, IFeature> | undefined;
  setData(
    _?: FeatureCollection<Geometry, IFeature> | GeoJSON | string | undefined
  ): void;
  setBounds(bounds: BBox): void;
  addToMap(map: MapSimple): void;
  removeFromMap(map: MapSimple): void;
  abstract updateForMap(map: MapSimple): void;
  getMapboxSource(): AnySourceData;
}
