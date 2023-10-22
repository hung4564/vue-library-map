import { CoordinatesNumber } from "@/interface/map";
import { IView } from "../types";

export const MeasurementHandle = function () {
  let _action: any = null;
  const _views: IView[] = [];

  // eslint-disable-next-line no-unused-vars
  const withView = (wv: (_view: IView) => any) => {
    for (let i = 0; i < _views.length; i++) wv(_views[i]);
  };
  const setAction = (action: any) => {
    _action = action;
  };
  const addView = (view: IView) => {
    _views.push(view);
  };
  const start = () => {
    if (_action) _action.start();
    withView((view) => {
      if (view.start) view.start(getResult());
    });
  };
  const reset = () => {
    if (_action) _action.reset();
    withView((view) => {
      if (view.reset) view.reset();
    });
  };
  const destroy = () => {
    if (_action) _action.destroy();
    withView((view) => {
      view.destroy();
    });
  };
  const getResult = () => {
    return {
      coordinates: _action.value,
      setting: _action.setting,
      ..._action.getResult()
    };
  };
  const add = (point: CoordinatesNumber) => {
    if (_action) _action.add(point);
    withView((view) => {
      if (view.view) view.view(getResult());
    });
  };
  const init = (points = []) => {
    if (_action) _action.init(points);
    withView((view) => {
      view.view(getResult());
    });
  };
  return {
    get type() {
      if (!_action) return null;
      return _action.type;
    },
    get action() {
      return _action;
    },
    setAction,
    addView,
    start,
    reset,
    destroy,
    add,
    init,
    getResult
  };
};
export type MeasurementHandleType = typeof MeasurementHandle;
