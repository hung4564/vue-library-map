import {
  DataHandle,
  FeatureReturn,
  IGeojsonOption,
  ISourceBuild
} from "@/interface/source";
import type { Feature, FeatureCollection, GeoJSON, Geometry } from "geojson";

import { ASource } from "./ASource";
import bbox from "@turf/bbox";

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
export class GeojsonDataHandle<T extends {} = any>
  extends ASource
  implements DataHandle<GeoJSON, T>
{
  public geojson!: FeatureCollection<Geometry, T>;
  protected field_id: string = "id";
  protected option: IGeojsonOption;
  constructor(geojson: GeoJSON, option: IGeojsonOption = {}) {
    super();
    this.setData(geojson);
    this.option = option;
  }
  getMapboxSource() {
    return {
      type: "geojson",
      data: this.getAll("geojson")
    };
  }
  setData(data: GeoJSON) {
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
    return data;
  }
  getAll(format = "list") {
    if (format === "geojson") {
      return this.convertToGeoJson(this.geojson);
    }
    return this.geojson;
  }
  convertToGeoJson(
    geojson: FeatureCollection<Geometry, T>
  ): FeatureCollection<Geometry, T> {
    return geojson;
  }
  checkData(data: Feature<Geometry, any>, id: string | number) {
    return data.properties[this.field_id] === id;
  }
  find(id: string | number): FeatureReturn<T> | undefined {
    const item = this.geojson.features.find((x) => this.checkData(x, id));
    if (!item) {
      return;
    }
    return {
      ...item.properties,
      geometry: item.geometry
    };
  }
  create(data: FeatureReturn<T>): FeatureReturn<T> {
    const { geometry, ...item } = data;
    this.geojson.features.push({
      type: "Feature",
      properties: item as any as T,
      geometry
    });
    return data;
  }
  update(id: string | number, data: FeatureReturn<T>): FeatureReturn<T> {
    const index = this.geojson.features.findIndex((x) => this.checkData(x, id));
    if (index >= 0) {
      const { geometry, ...item } = data;
      this.geojson.features[index] = {
        type: "Feature",
        properties: item as any as T,
        geometry
      };
    }
    return data;
  }
  delete(id: string | number): boolean {
    const index = this.geojson.features.findIndex((x) => this.checkData(x, id));
    if (index >= 0) {
      this.geojson.features.splice(index, 1);
    }
    return false;
  }
}
