import { AView } from "@/model/datasource/view/view";
import { IView } from "./view";
import { Layer } from "@/model";

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
  click?: (layer: Layer, map_id: string) => any;
  icon?: string;
  attr?: any;
}
export type Menu = MenuDivider | MenuItem;

export type Group = string | AGroup;
export type AGroup = { name: string; id: string; children?: AView[] };
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

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
  show: any;
  updateMenus(): void;
}
export interface ListSingleView extends ListView {
  show: boolean;
}
export interface ListCompareView extends ListView {
  show: boolean[];
}
