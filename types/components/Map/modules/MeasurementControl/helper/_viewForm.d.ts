import { IViewSetting, IViewSettingField } from "../types";
import { CoordinatesNumber } from "@/interface/map";
import { View } from "./_view";
declare type FormViewSetting = {
  fields?: IViewSettingField[];
};
declare type FormViewStartProp = {
  setting?: FormViewSetting;
};
declare type FormViewChangeSetting = (_setting?: FormViewSetting) => void;
declare type FormViewChangeValue = (_coordinates?: CoordinatesNumber[]) => void;
declare type FormViewViewFCProps = IViewSetting & {
  fields?: any[];
  setting?: FormViewSetting;
};
export declare class FormView extends View {
  protected onChangeSetting?: FormViewChangeSetting;
  protected onChangeValue?: FormViewChangeValue;
  start({ setting }?: FormViewStartProp): void;
  view({ coordinates, setting, fields }?: FormViewViewFCProps): void;
  reset(): void;
}
export {};
