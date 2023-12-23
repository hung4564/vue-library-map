import {
  Color,
  Group,
  ListOption,
  ListView,
  Menu
} from "@/interface/datasource/list";

import { ABuild } from "./_default";
import { KEY_BUILD } from "../type";
import { createDefaultViewInList } from "../view/list";

export class LayerListBuild extends ABuild<ListOption, ListView> {
  constructor(option: ListOption = {}) {
    super(KEY_BUILD.LIST, option, { show: true, opacity: 1 });
    this.setBuild(createDefaultViewInList);
  }
  disableDelete() {
    this.option.disable_delete = true;
    return this;
  }
  disableOpacity() {
    this.option.disabled_opacity = true;
    return this;
  }
  setColor(color: Color) {
    this.option.color = color;
    return this;
  }
  setGroup(group: Group) {
    this.option.group = group;
    return this;
  }
  setMenus(menus: Menu[]) {
    this.option.menus = menus;
    return this;
  }
  setButton(menus: Menu[]) {
    this.option.extra_buttons = menus;
    return this;
  }
}
