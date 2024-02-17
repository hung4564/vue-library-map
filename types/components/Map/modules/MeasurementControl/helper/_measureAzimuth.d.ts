import { CoordinatesNumber } from "@/interface/map";
import { IViewSetting } from "../types";
import { Measure } from "./_measurement";
export declare class MeasureAzimuth extends Measure {
  get name(): string;
  get type(): string;
  get setting(): {
    maxLength: number;
  };
  add(coordinate: CoordinatesNumber): void;
  getResult(): IViewSetting;
}
