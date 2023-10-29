import { IView } from "./view";
import { Menu } from "./list";

export type LayerActionOption = {
  actions: LayerAction[];
};
type Action = IView & IAction;
export interface LayerActionView extends Action {
  id: string;
  name?: string;
  config: LayerActionOption;
}
export type LayerAction = {
  id: string;
  component?: any;
  menu: Menu;
  type?: string;
  option?: any;
};
export interface IAction extends IView {
  call: (id: string) => any;
  menus?: Menu[];
  get(id: string): LayerAction;
  addActions(actions: LayerAction[]): LayerActionView;
  addAction(action: LayerAction): LayerActionView;
}
