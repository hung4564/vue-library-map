import { getLayerData } from "@/store/store-datasource";

export function toggleShow(layer_view) {
  getLayerData(layer_view, (map, layer_data, index) => {
    layer_data.toggleShow(
      map,
      layer_view.multi ? layer_view.show[index] : layer_view.show
    );
  });
}

export function updateLayerSimple(layer_view) {
  getLayerData(layer_view, (map, layer_data, index) => {
    layer_data.toggleShow(
      map,
      layer_view.multi ? layer_view.show[index] : layer_view.show
    );

    if (!layer_view.disabled_opacity)
      layer_data.setOpacity(map, layer_view.opacity);
  });
}
