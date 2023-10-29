/* eslint-disable  @typescript-eslint/no-unused-vars */

import { IView, IViewSetting } from "../types";

export class View implements IView {
  start() {}
  view(
    _setting: IViewSetting = {
      coordinates: [],
      features: [],
      value: 0,
      features_label: []
    }
  ) {}
  reset() {}
  destroy() {}
}
