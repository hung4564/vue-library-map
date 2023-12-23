import type { Feature, FeatureCollection, GeoJSON, Geometry } from "geojson";
import { GeoJSONSource, GeoJSONSourceRaw } from "mapbox-gl";
import { IGeojsonOption, ISourceBuild } from "@/interface/source";

import { ASource } from "./ASource";
import { MapSimple } from "@/interface/map";
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
export class GeojsonDataHandle<T extends {} = any> extends ASource {
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
      data: this.getAll("geojson")
    };
  }
  updateForMap(map: MapSimple) {
    const source = map.getSource(this.id) as GeoJSONSource;
    if (source) source.setData(this.geojson);
  }
  setData(data: GeoJSON | string) {
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
}
