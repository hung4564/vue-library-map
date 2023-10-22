import { ListCompareView, ListSingleView } from "@/interface/datasource/list";
export { createDefaultViewInList } from "./single.list";
export { createDefaultCompareViewInList } from "./compare.list";
export declare function convertToCompareViewInList(
  layer: ListSingleView,
  maps?: never[]
): ListCompareView;
export declare function convertToSingleViewInList(
  layer: ListCompareView
): ListSingleView;
