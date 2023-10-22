import { CoordinatesNumber } from "@/interface/map";
import { IViewSetting } from "../types";
import { Measure } from "./_measurement";
export declare class MeasurePoint extends Measure {
  get setting(): {
    maxLength: number;
  };
  add(coordinate: CoordinatesNumber): void;
  getResult(): IViewSetting;
}
