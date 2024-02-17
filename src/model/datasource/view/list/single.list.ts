import { ListOption, ListSingleView } from "@/interface/datasource/list";

import { Layer } from "../../Layer";
import { getUUIDv4 } from "@/utils/uuid";

export function createDefaultViewInList(
  layer: Layer,
  option: ListOption = {}
): ListSingleView {
  const show = option.show != null ? option.show : true;
  const opacity = option.opacity != null ? option.opacity : 1;
  let menus = option.menus?.slice() || [];
  if (layer.action && layer.action.menus) {
    menus.push(...layer.action.menus);
  }
  let parent: Layer | undefined;
  const temp: ListSingleView = {
    setParent(_parent: Layer) {
      parent = _parent;
    },
    updateMenus() {
      menus = option.menus?.slice() || [];
      if (layer.action && layer.action.menus) {
        menus.push(...layer.action.menus);
      }
    },
    get parent() {
      return parent;
    },
    id: layer.id || getUUIDv4(),
    name: layer.name,
    show,
    opacity,
    get menus() {
      return menus || [];
    },
    get extra_buttons() {
      return option.extra_buttons || [];
    },
    selected: false,
    get metadata() {
      return layer.metadata;
    },
    color: option.color || "#38d4ff",
    config: {
      disable_delete: false,
      disabled_opacity: false,
      component: "layer-item"
    },
    multi: false
  };
  if (option.group) {
    temp.group = option.group;
  }
  if (option.disable_delete) {
    temp.config.disable_delete = option.disable_delete;
  }

  if (option.disabled_opacity) {
    temp.config.disabled_opacity = option.disabled_opacity;
  }

  return temp;
}
