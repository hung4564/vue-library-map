import { AView } from "@/model/datasource/view/view";
import { IView } from "./view";
export interface ListOption {
  disable_delete?: boolean;
  disabled_opacity?: boolean;
  color?: Color;
  menus?: Menu[];
  group?: Group;
  show?: boolean;
  opacity?: number;
  extra_buttons?: Menu[];
}
export interface MenuDivider {
  type: "divider";
}
export interface MenuItem {
  id?: string;
  type: "item";
  class?: string;
  name: string;
  click?: Function | string;
  icon?: string;
  attr?: any;
}
export declare type Menu = MenuDivider | MenuItem;
export declare type Group = string | AGroup;
export declare type AGroup = {
  name: string;
  id: string;
  children?: AView[];
};
declare type RGB = `rgb(${number}, ${number}, ${number})`;
declare type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
declare type HEX = `#${string}`;
export declare type Color = RGB | RGBA | HEX;
export interface ListView extends IView {
  name?: string;
  opacity: number;
  menus: Menu[];
  extra_buttons: Menu[];
  selected: boolean;
  metadata: any;
  color: Color;
  config: {
    disable_delete: boolean;
    disabled_opacity: boolean;
    component: any;
  };
  index?: number;
  group?: Group;
  multi: boolean;
  addMenus(menus: Menu[]): ListView;
  show: any;
}
export interface ListSingleView extends ListView {
  show: boolean;
}
export interface ListCompareView extends ListView {
  show: boolean[];
}
export {};