import {
  LayerAction,
  LayerActionOption,
  LayerActionView
} from "@/interface/datasource/action";

import { ABuild } from "./_default";
import { Layer } from "../Layer";
import { Menu } from "@/interface/datasource/list";

export class LayerActionBuild extends ABuild<
  LayerActionOption,
  LayerActionView
> {
  constructor(option: LayerActionOption = { actions: [] }) {
    super("action", option, { actions: [] });
    this.setBuild(createActionView);
  }
  addAction(action: LayerAction) {
    this.option.actions.push(action);
    return this;
  }
  setForLayer(layer: Layer) {
    if (this.build) layer.setAction(this.build(layer, this.option));
    return this;
  }
}
export function createActionView(
  layer: Layer,
  config: LayerActionOption
): LayerActionView {
  let parent = layer;
  const menu_cache = config.actions.reduce<{ [key: string]: LayerAction }>(
    (acc, cur) => {
      acc[cur.id] = cur;
      return acc;
    },
    {}
  );
  const temp = {
    setParent(_parent: Layer) {
      parent = _parent;
    },
    get parent() {
      return parent;
    },
    get id() {
      return parent.id;
    },
    config,
    call(id: string) {
      const menu = menu_cache[id];
      console.log("🚀 ~ call ~ id", id, menu, parent);
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
    }
  };

  return temp;
}
