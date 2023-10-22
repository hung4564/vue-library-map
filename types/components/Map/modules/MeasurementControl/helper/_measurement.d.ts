import { CoordinatesNumber } from "@/interface/map";
import { IViewSetting } from "../types";
export declare class Measure {
  protected value: CoordinatesNumber[];
  constructor();
  get coordinates(): CoordinatesNumber[];
  start(): void;
  add(coordinate: CoordinatesNumber): void;
  init(coordinates: CoordinatesNumber[]): void;
  getResult(): IViewSetting;
  reset(): void;
  destroy(): void;
}
export declare function formatNumber(number: any, locales?: string): string;
