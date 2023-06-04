import { getUUIDv4 } from "@/utils";

export function createDefaultView(layer) {
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
    color: "#004e98",
    group: layer.group,
    disable_delete: layer.disable_delete,
    disabled_opacity: layer.disabled_opacity
  };

  return temp;
}
