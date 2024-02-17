import { Menu } from "./list";

export type LayerActionOption = {
  actions: LayerAction[];
};
type Action = IAction;
export interface LayerActionView extends Action {
  config: LayerActionOption;
}
export type LayerAction = {
  id: string;
  component?: any;
  menu: Menu;
  type?: string;
  option?: any;
};
export interface IAction {
  call: (id: string, map_id: string) => any;
  menus?: Menu[];
  get(id: string): LayerAction;
  addActions(actions: LayerAction[]): LayerActionView;
  addAction(action: LayerAction): LayerActionView;
  updateAction(action: LayerAction): LayerActionView;
}
