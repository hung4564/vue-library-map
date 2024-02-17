import { AMapLayer } from "./view/map";
import { ILayerComponentView } from "@/interface/datasource/component";
import { IView } from "@/interface/datasource/view";
import { LayerActionView } from "@/interface/datasource/action";
import { ListView } from "@/interface/datasource/list";
export declare const KEY_BUILD: {
  readonly LIST: "list";
  readonly MAP: "map";
  readonly IDENTIFY: "identify";
  readonly ACTION: "action";
  readonly LEGEND: "legend";
  readonly COMPONENT: "component";
};
declare type Keys = keyof typeof KEY_BUILD;
export declare type TYPE_BUILD = (typeof KEY_BUILD)[Keys];
export declare type TYPE_VIEW<T> = T extends "action"
  ? LayerActionView
  : T extends "component"
  ? ILayerComponentView
  : T extends "list"
  ? ListView
  : T extends "map"
  ? AMapLayer
  : IView;
export {};
