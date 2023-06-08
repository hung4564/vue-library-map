import { getUUIDv4 } from "@/utils";

export function createDefaultViewInList(layer) {
  if (!layer.metadata) {
    layer.metadata = {};
  }
  let show = layer.show != null ? layer.show : true;
  let temp = {
    id: layer.id || getUUIDv4(),
    name: layer.name,
    show,
    opacity: 1,
    get menus() {
      return layer.menus || [];
    },
    get extra_buttons() {
      return layer.extra_buttons || [];
    },
    info: layer,
    component: "layer-item",
    selected: false,
    get metadata() {
      return layer.metadata;
    },
    set metadata(value) {
      layer.metadata = value;
    },
    data_id: layer.data_id,
    color: layer.color || "#004e98",
    group: layer.group,
    disable_delete: layer.disable_delete,
    disabled_opacity: layer.disabled_opacity
  };

  return temp;
}

export function createDefaultCompareViewInList(layer, maps = []) {
  let res = createDefaultViewInList(layer);
  let show = maps.map(() => (layer.show != null ? layer.show : true));
  res.component = "layer-item-compare";
  res.multi = true;
  res.show = show;

  return res;
}
export function convertToCompareViewInList(layer, maps = []) {
  let show = maps.map(() => (layer.show != null ? layer.show : true));
  layer.component = "layer-item-compare";
  layer.multi = true;
  layer.show = show;

  return layer;
}

export function convertToSingleViewInList(layer) {
  let show = layer.show;
  if (Array.isArray(layer.show)) {
    show = layer.show.some((x) => x);
  }
  layer.component = "layer-item";
  layer.multi = false;
  layer.show = show;

  return layer;
}
