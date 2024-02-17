import type {
  Feature,
  FeatureCollection,
  GeoJSON,
  GeoJsonProperties,
  Geometry
} from "geojson";
import { GeoJSONSource, GeoJSONSourceRaw } from "mapbox-gl";
import { IGeojsonOption, ISource, ISourceBuild } from "@/interface/source";

import { ASource } from "./ASource";
import { MapSimple } from "@/interface/map";
import bbox from "@turf/bbox";
import booleanIntersects from "@turf/boolean-intersects";
import { copyByJson } from "@/utils";
import { point as pointTurf } from "@turf/turf";

export class GeoJsonSourceBuild implements ISourceBuild {
  protected geojson!: GeoJSON;
  protected option: IGeojsonOption = {};
  setData(geojson: GeoJSON) {
    this.geojson = geojson;
    return this;
  }
  build() {
    return new GeojsonDataHandle(this.geojson, this.option);
  }
}
export class GeojsonDataHandle<T extends GeoJsonProperties = GeoJsonProperties>
  extends ASource<T>
  implements ISource<T>
{
  public geojson!: FeatureCollection<Geometry, T>;
  protected field_id: string = "id";
  protected option: IGeojsonOption;
  constructor(geojson: GeoJSON, option: IGeojsonOption = {}) {
    super();
    this.setData(geojson);
    this.option = option;
  }
  getMapboxSource(): GeoJSONSourceRaw {
    return {
      type: "geojson",
      data: this.getAll()
    };
  }
  updateForMap(map: MapSimple) {
    const source = map.getSource(this.id) as GeoJSONSource;
    if (source)
      source.setData(
        this.geojson || {
          type: "FeatureCollection",
          features: []
        }
      );
  }
  setData(
    data?: FeatureCollection<Geometry, T> | GeoJSON | string | undefined
  ) {
    if (!data) {
      return undefined;
    }
    if (typeof data === "string") {
      data = JSON.parse(data) as GeoJSON;
    }
    let temp: FeatureCollection<Geometry, T>;
    if (data.type === "FeatureCollection") {
      temp = data as FeatureCollection<Geometry, T>;
    } else if (data.type === "Feature") {
      temp = {
        type: "FeatureCollection",
        features: [data as Feature<Geometry, T>]
      };
    } else {
      temp = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {} as T,
            geometry: data
          }
        ]
      };
    }
    this.geojson = temp;
    this.setBounds(bbox(data));
  }
  getAll() {
    return this.geojson;
  }
  async addFeatures(features: Feature<Geometry, T>[] = []) {
    this.geojson.features.push(
      ...features.map((x) => {
        delete x.id;
        return x;
      })
    );
    this.geojson = copyByJson(this.geojson);
  }
  async updateFeatures(features: Feature<Geometry, T>[] = []) {
    const object_cache = features.reduce<Record<string, Feature<Geometry, T>>>(
      (acc, cur) => {
        acc[cur.properties!.id] = cur;
        return acc;
      },
      {}
    );
    this.geojson.features.forEach((feature, i) => {
      if (object_cache[feature.properties!.id]) {
        this.geojson.features[i] = object_cache[feature.properties!.id];
      }
    });
  }
  async deleteFeatures(features: Feature<Geometry, T>[] = []) {
    const object_cache = features.reduce<Record<string, Feature<Geometry, T>>>(
      (acc, cur) => {
        acc[cur.properties!.id] = cur;
        return acc;
      },
      {}
    );
    this.geojson.features = this.geojson.features.filter(
      (x) => !object_cache[x.properties!.id]
    );
  }
  async getFeatures(point: [number, number]) {
    return this.geojson.features.filter((feature) =>
      booleanIntersects(feature, pointTurf(point))
    );
  }
}
