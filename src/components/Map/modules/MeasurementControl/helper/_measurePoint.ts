import { CoordinatesNumber } from "@/interface/map";
import { IViewSetting } from "../types";
import { Measure } from "./_measurement";
import { point } from "@turf/turf";

export class MeasurePoint extends Measure {
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
    const lng = this.coordinates[0][0].toFixed(6);
    const lat = this.coordinates[0][1].toFixed(6);
    result.value = `${lng}, ${lat}`;
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
    result.fields = [
      {
        trans: "map.measurement.setting.point",
        value: result.value
      }
    ];
    return result;
  }
}
