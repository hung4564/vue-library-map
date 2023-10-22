import { LayerBuildContainer, LayerViewContainer } from "./part";
import type { BBox } from "geojson";
import { Base } from "../Base";
import { IAction } from "@/interface/datasource/action";
import { ISource } from "@/interface/source";
import { LayerBuildFunction } from "@/interface/datasource/view";
import { MapSimple } from "@/interface/map";
export interface LayerInfo {
  metadata: {
    loading?: Boolean;
    bounds?: BBox;
  };
  name?: string;
  [key: string]: any;
}
export declare class Layer<TSource extends ISource = ISource> extends Base {
  private _build;
  private _view;
  private _map;
  info: LayerInfo;
  source: TSource;
  action: IAction;
  constructor();
  get metadata(): {
    loading?: Boolean | undefined;
    bounds?: BBox | undefined;
  };
  get name(): string | undefined;
  asProxy(): any;
  isHasMap(map: MapSimple): boolean;
  addToMap(map: MapSimple, ...args: any[]): Promise<any[]>;
  removeFromMap(map: MapSimple, ...args: any[]): Promise<any[]>;
  setInfo(info: LayerInfo): this;
  setBuild(
    key: string,
    build: LayerBuildFunction,
    option?: {}
  ): LayerBuildContainer;
  canBuildForView(key: string): boolean;
  setView(...args: any[]): LayerViewContainer;
  getView(key: string): any;
  runBuild(key: string): this | undefined;
  setSource(source: TSource): void;
  getSource(): TSource;
  getAction(): IAction;
  setAction(action: IAction): void;
  callAction(id: string): any;
}
export declare type TLayer = Layer & {
  [key: string]: any;
};
