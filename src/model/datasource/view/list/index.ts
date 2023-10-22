import { ListCompareView, ListSingleView } from "@/interface/datasource/list";

export { createDefaultViewInList } from "./single.list";
export { createDefaultCompareViewInList } from "./compare.list";
export function convertToCompareViewInList(
  layer: ListSingleView,
  maps = []
): ListCompareView {
  const show = maps.map(() => (layer.show != null ? layer.show : true));
  layer.config.component = "layer-item-compare";
  layer.multi = true;
  (layer as any as ListCompareView).show = show;

  return layer as any as ListCompareView;
}

export function convertToSingleViewInList(
  layer: ListCompareView
): ListSingleView {
  let show: boolean;
  if (Array.isArray(layer.show)) {
    show = layer.show.some((x) => x);
  } else {
    show = layer.show;
  }
  layer.config.component = "layer-item";
  layer.multi = false;
  (layer as any as ListSingleView).show = show;

  return layer as any as ListSingleView;
}
