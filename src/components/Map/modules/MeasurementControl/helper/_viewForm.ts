import { IViewSetting, IViewSettingField } from "../types";

import { CoordinatesNumber } from "@/interface/map";
/* eslint-disable no-unused-vars */
import { View } from "./_view";

type FormViewSetting = {
  fields?: IViewSettingField[];
};
type FormViewStartProp = {
  setting?: FormViewSetting;
};
type FormViewChangeSetting = (_setting?: FormViewSetting) => void;
type FormViewChangeValue = (_coordinates?: CoordinatesNumber[]) => void;
type FormViewViewFCProps = IViewSetting & {
  fields?: any[];
  setting?: FormViewSetting;
};
export class FormView extends View {
  protected onChangeSetting?: FormViewChangeSetting;
  protected onChangeValue?: FormViewChangeValue;
  start({ setting }: FormViewStartProp = {}) {
    if (this.onChangeSetting) {
      this.onChangeSetting(setting);
    }
  }
  view({
    coordinates = [],
    setting = {},
    fields = []
  }: FormViewViewFCProps = {}) {
    if (this.onChangeValue) {
      this.onChangeValue(coordinates);
    }
    if (this.onChangeSetting) {
      setting.fields = fields;
      this.onChangeSetting(setting);
    }
  }
  reset() {
    if (this.onChangeValue) {
      this.onChangeValue([]);
    }
    if (this.onChangeSetting) {
      this.onChangeSetting();
    }
  }
}
