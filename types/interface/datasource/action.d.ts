import { Menu } from "./list";
export declare type LayerActionOption = {
  actions: LayerAction[];
};
declare type Action = IAction;
export interface LayerActionView extends Action {
  config: LayerActionOption;
}
export declare type LayerAction = {
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
}
export {};
