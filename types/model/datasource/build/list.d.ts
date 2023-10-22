import {
  Color,
  Group,
  ListOption,
  ListView,
  Menu
} from "@/interface/datasource/list";
import { ABuild } from "./_default";
export declare class LayerListBuild extends ABuild<ListOption, ListView> {
  constructor(option?: ListOption);
  disableDelete(): this;
  disableOpacity(): this;
  setColor(color: Color): this;
  setGroup(group: Group): this;
  setMenus(menus: Menu[]): this;
  setButton(menus: Menu[]): this;
}
