import {
  LayerAction,
  LayerActionOption,
  LayerActionView
} from "@/interface/datasource/action";
import eventBus, { EVENTBUS_TYPE } from "@/utils/event-bus";

import { KEY_BUILD } from "../type";
import { Layer } from "../Layer";
import { Menu } from "@/interface/datasource/list";

export class LayerActionBuild {
  option: LayerActionOption;
  constructor(option: LayerActionOption = { actions: [] }) {
    this.option = option;
  }
  addAction(action: LayerAction) {
    this.option.actions.push(action);
    return this;
  }
  addActions(actions: LayerAction[] = []) {
    this.option.actions.push(...actions);
    return this;
  }
  build(layer: Layer) {
    return createActionView(layer, this.option);
  }
}
export function createActionView(
  layer: Layer,
  config: LayerActionOption
): LayerActionView {
  let menu_cache: { [key: string]: LayerAction } = {};
  const resetCacheMenu = () => {
    menu_cache = config.actions.reduce<{ [key: string]: LayerAction }>(
      (acc, cur) => {
        acc[cur.id] = cur;
        return acc;
      },
      {}
    );
  };
  resetCacheMenu();
  const temp = {
    config,
    call(id: string, map_id: string) {
      const menu = menu_cache[id];
      if (menu.component) {
        layer.getView(KEY_BUILD.COMPONENT).setFromAction(menu);
      } else if (menu.menu.type == "item") {
        menu.menu.click && menu.menu.click(layer, map_id);
      }
    },
    get menus() {
      return config.actions.reduce<Menu[]>((acc, cur) => {
        if (cur.menu) {
          if (cur.menu.type == "item") cur.menu.id = cur.id;
          acc.push(cur.menu);
        }
        return acc;
      }, []);
    },
    get(id: string): LayerAction {
      return menu_cache[id];
    },
    addActions(actions: LayerAction[] = []) {
      config.actions.push(...actions);
      resetCacheMenu();
      return this;
    },
    addAction(action: LayerAction) {
      if (action) config.actions.push(action);
      resetCacheMenu();
      return this;
    },
    updateAction(action: LayerAction) {
      const index = config.actions.findIndex((x) => x.id === action.id);
      if (index >= 0) {
        config.actions[index] = action;
        resetCacheMenu();
      }
      const view_list = layer.getView("list");
      if (view_list) {
        view_list.updateMenus();
        eventBus.emit(EVENTBUS_TYPE.MAP.UPDATE_LAYER);
      }
      return this;
    }
  };

  return temp;
}
