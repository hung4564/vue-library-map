import { callDraw, cancelDraw, deactivateDraw } from "@/store/store-draw";

import { ABuild } from "../build/_default";
import { Layer } from "../Layer";
import { LayerAction } from "@/interface/datasource/action";

const KEY = "draw";
type LayerDrawOption = object;
const menu_draw: LayerAction = {
  id: KEY,
  menu: {
    name: "draw",
    type: "item",
    icon: "",
    click: (layer: Layer, map_id: string) => {
      callDraw(map_id, layer);
      layer.getAction().updateAction(menu_undraw);
    }
  }
};
const menu_undraw: LayerAction = {
  id: KEY,
  menu: {
    name: "cancel draw",
    type: "item",
    icon: "",
    click: (layer: Layer, map_id: string) => {
      cancelDraw(map_id);
      deactivateDraw(map_id);
      layer.getAction().updateAction(menu_draw);
    }
  }
};
export class LayerDrawBuild extends ABuild<LayerDrawOption> {
  constructor() {
    super(KEY, {});
  }
  setForLayer(layer: Layer) {
    layer.getAction().addAction(menu_draw);
    return this;
  }
  toggleDraw(layer: Layer, type: "draw" | "undraw") {
    switch (type) {
      case "draw":
        layer.getAction().updateAction(menu_draw);
        break;
      case "undraw":
        layer.getAction().updateAction(menu_undraw);
        break;
    }
  }
}
