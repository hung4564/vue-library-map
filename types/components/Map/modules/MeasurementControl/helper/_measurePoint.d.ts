import { CoordinatesNumber } from "@/interface/map";
import { CrsItem } from "@/store/store-crs";
import { IViewSetting } from "../types";
import { Measure } from "./_measurement";
export declare class MeasurePoint extends Measure {
  protected crs_items: CrsItem[];
  constructor(crs_items?: CrsItem[]);
  get name(): string;
  get type(): string;
  get setting(): {
    maxLength: number;
  };
  add(coordinate: CoordinatesNumber): void;
  getResult(): IViewSetting;
}
