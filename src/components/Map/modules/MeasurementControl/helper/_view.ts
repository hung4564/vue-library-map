/* eslint-disable no-unused-vars */

import { IView, IViewSetting } from "../types";

export class View implements IView {
  start() {}
  view(
    setting: IViewSetting = {
      coordinates: [],
      features: [],
      value: 0,
      features_label: []
    }
  ) {}
  reset() {}
  destroy() {}
}
