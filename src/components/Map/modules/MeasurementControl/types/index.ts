import { CoordinatesNumber } from "@/interface/map";
/* eslint-disable no-unused-vars */
export type IViewSetting = {
  coordinates?: CoordinatesNumber[];
  features?: any;
  value?: any;
  features_label?: any;
  fields?: IViewSettingField[];
};
export type IViewSettingField = {
  trans?: string;
  text?: string;
  value?: any;
};
export interface IView extends Object {
  start: (_props?: IViewSetting) => void;
  view: (_props: IViewSetting) => void;
  reset: () => void;
  destroy: () => void;
}
