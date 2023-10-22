import { ListView, Menu } from "./list";

import { IView } from "./view";

export type LayerActionOption = {
  actions: LayerAction[];
};
type Action = IView & IAction;
export interface LayerActionView extends Action {
  id: string;
  name?: string;
  config: LayerActionOption;
}
export type LayerAction<T = any> = {
  id: string;
  component: any;
  menu?: Menu;
  convert?: (view: ListView) => T;
  option?: any;
};
export interface IAction extends IView {
  call: (id: string) => any;
  menus?: Menu[];
  get(id: string): LayerAction;
}
