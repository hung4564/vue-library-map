import { Measure } from "./_measurement";
import { IViewSetting } from "../types";
export declare class MeasureArea extends Measure {
  get name(): string;
  get type(): string;
  getResult(): IViewSetting;
}
