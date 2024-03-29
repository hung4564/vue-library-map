import {
  LayerBuildContainer,
  LayerMapContainer,
  LayerViewContainer
} from "./part";
import { TYPE_BUILD, TYPE_VIEW } from "./type";

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
export class Layer<TSource extends ISource = ISource> extends Base {
  private _build: LayerBuildContainer;
  private _view: LayerViewContainer;
  private _map: LayerMapContainer;
  info: LayerInfo;
  source!: TSource;
  action!: IAction;
  constructor() {
    super();
    this.info = { metadata: {} };
    this._view = new LayerViewContainer();
    this._build = new LayerBuildContainer();
    this._map = new LayerMapContainer();
    return this.asProxy();
  }
  get metadata() {
    return this.info.metadata;
  }
  get name() {
    return this.info.name;
  }
  asProxy() {
    const handler = {
      get: function (target: any, prop: string) {
        if (target[prop] != null) {
          return target[prop];
        }
        return function wrapper(...rest: any[]) {
          return target._view.runWithNameFunction(prop, ...rest);
        };
      }
    };

    return new Proxy(this, handler);
  }
  isHasMap(map: MapSimple) {
    return this._map.isHas(map.id);
  }
  async addToMap(map: MapSimple, ...args: any[]) {
    this._map.add(map.id);
    this.source.addToMap(map);
    await this._view.runWithNameFunction("addToMap", map, ...args);
  }
  async removeFromMap(map: MapSimple, ...args: any[]) {
    this._map.remove(map.id);
    await this._view.runWithNameFunction("removeFromMap", map, ...args);
    this.source.removeFromMap(map);
  }
  async updateForMap(map: MapSimple, ...args: any[]) {
    this.source.updateForMap(map);
    await this._view.runWithNameFunction("updateForMap", map, ...args);
  }
  setInfo(info: LayerInfo) {
    if (info.metadata == null) {
      info.metadata = {
        loading: false
      };
    } else {
      if (info.metadata.loading == null) {
        info.metadata.loading = false;
      }
    }
    this.info = info;
    return this;
  }
  setBuild(key: string, build: LayerBuildFunction, option = {}) {
    return this._build.set(key, build, option);
  }
  canBuildForView(key: string) {
    return this._build.canForView(key);
  }
  setView(...args: any[]) {
    return this._view.add(...args);
  }
  getView<T extends TYPE_BUILD>(key: T): TYPE_VIEW<T> {
    return this._view.get(key);
  }
  runBuild(key: string) {
    if (!this._build.canForView(key)) {
      return;
    }
    this._view.add(key, this._build.build(key, this));
    return this;
  }
  setSource(source: TSource) {
    this.source = source;
    if (source.bounds) {
      this.metadata.bounds = source.bounds;
    }
  }
  getSource(): TSource {
    return this.source;
  }
  getAction(): IAction {
    return this.action;
  }
  setAction(action: IAction) {
    this.action = action;
  }
  callAction(id: string, map_id: string) {
    return this.action.call(id, map_id);
  }
}
export type TLayer = Layer & {
  [key: string]: any;
};
