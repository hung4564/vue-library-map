import { ListCompareView, ListOption } from "@/interface/datasource/list";
import { createDefaultViewInList } from "./single.list";
import { Layer } from "../..";

export function createDefaultCompareViewInList(
  layer: Layer,
  option: ListOption = {},
  maps: string[] = []
) {
  const res = createDefaultViewInList(layer) as any as ListCompareView;
  const show = maps.map(() => (option.show != null ? option.show : true));
  res.config.component = "layer-item-compare";
  res.multi = true;
  res.show = show;

  return res;
}
