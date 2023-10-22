import { CoordinatesNumber } from "@/interface/map";
import { IView } from "../types";
export declare const MeasurementHandle: () => {
  readonly type: any;
  readonly action: any;
  setAction: (action: any) => void;
  addView: (view: IView) => void;
  start: () => void;
  reset: () => void;
  destroy: () => void;
  add: (point: CoordinatesNumber) => void;
  init: (points?: never[]) => void;
  getResult: () => any;
};
export declare type MeasurementHandleType = typeof MeasurementHandle;
