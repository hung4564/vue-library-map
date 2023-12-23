import { AMapLayer } from "./view/map";
import { ILayerComponentView } from "@/interface/datasource/component";
import { IView } from "@/interface/datasource/view";
import { LayerActionView } from "@/interface/datasource/action";
import { ListView } from "@/interface/datasource/list";

export const KEY_BUILD = {
  LIST: "list",
  MAP: "map",
  IDENTIFY: "identify",
  ACTION: "action",
  LEGEND: "legend",
  COMPONENT: "component"
} as const;

type Keys = keyof typeof KEY_BUILD;

export type TYPE_BUILD = (typeof KEY_BUILD)[Keys];
export type TYPE_VIEW<T> = T extends "action"
  ? LayerActionView
  : T extends "component"
  ? ILayerComponentView
  : T extends "list"
  ? ListView
  : T extends "map"
  ? AMapLayer
  : IView;
