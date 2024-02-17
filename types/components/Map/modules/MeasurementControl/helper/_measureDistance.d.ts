import { Measure } from "./_measurement";
import { IViewSetting } from "../types";
export declare class MeasureDistance extends Measure {
  get name(): string;
  get type(): string;
  getResult(): IViewSetting;
}
