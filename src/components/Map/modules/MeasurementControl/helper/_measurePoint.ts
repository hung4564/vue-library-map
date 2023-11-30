import { CoordinatesNumber } from "@/interface/map";
import { CrsItem } from "@/store/store-crs";
import { IViewSetting } from "../types";
import { Measure } from "./_measurement";
import { formatCoordinate } from "@/components/Map/helper/formatCoordinate";
import { point } from "@turf/turf";
import proj4 from "proj4";

export class MeasurePoint extends Measure {
  protected crs_items: CrsItem[];
  constructor(crs_items: CrsItem[] = []) {
    super();
    this.crs_items = crs_items;
  }
  get name() {
    return "Measure Point";
  }
  get type() {
    return "point";
  }
  get setting() {
    return { maxLength: 1 };
  }
  add(coordinate: CoordinatesNumber) {
    if (this.value.length > 0) {
      this.value = [];
    }
    this.value.push(coordinate);
  }
  getResult() {
    const features: any[] = [];
    const value: any = 0;
    const features_label: any[] = [];
    const result: IViewSetting = {
      features,
      value,
      features_label,
      fields: []
    };
    if (!this.coordinates || this.coordinates.length < 1) {
      return result;
    }
    result.features = [point(this.coordinates[0])];
    const lng = this.coordinates[0][0];
    const lat = this.coordinates[0][1];
    const temp = formatCoordinate(
      { longitude: lng, latitude: lat },
      undefined,
      false
    );
    if (temp) result.value = `${temp.longitude}, ${temp.latitude}`;
    if (this.crs_items) {
      const crs_default = this.crs_items.find((x) => x.default);
      result.fields = [
        {
          trans: crs_default?.name,
          value: result.value
        }
      ];
      this.crs_items
        .filter((x) => !x.default)
        .forEach((crs) => {
          if (!crs.default && crs.proj4js) {
            const point = formatCoordinate(
              { longitude: lng, latitude: lat },
              crs,
              false
            );
            if (point)
              result.fields?.push({
                trans: crs.name,
                value: `${point.longitude}, ${point.latitude}`
              });
          }
        });
    } else {
      result.fields = [
        {
          trans: "map.measurement.setting.point",
          value: result.value
        }
      ];
    }
    result.features_label = [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: this.coordinates[0]
        },
        properties: {
          is_label: true,
          text: result.value
        }
      }
    ];
    return result;
  }
}
