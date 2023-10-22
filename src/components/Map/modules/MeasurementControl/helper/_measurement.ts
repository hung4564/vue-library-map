import { CoordinatesNumber } from "@/interface/map";
import { IViewSetting } from "../types";

export class Measure {
  protected value: CoordinatesNumber[];
  constructor() {
    this.value = [];
  }
  get coordinates() {
    return this.value.filter((x) => x[0] != null && x[1] != null);
  }
  start() {}
  add(coordinate: CoordinatesNumber) {
    const index = getFirstIndexNotVaild(this.value);
    if (index >= 0) {
      this.value[index] = coordinate;
    } else {
      this.value.push(coordinate);
    }
  }
  init(coordinates: CoordinatesNumber[]) {
    this.value = coordinates;
  }
  getResult(): IViewSetting {
    return {};
  }
  reset() {
    this.value = [];
  }
  destroy() {
    this.value = [];
  }
}
function getFirstIndexNotVaild(coordinates: any[] = []) {
  return coordinates.findIndex((value) => !value[0] || !value[1]);
}
export function formatNumber(number: any, locales = "vi") {
  return new Intl.NumberFormat(locales).format(number);
}
