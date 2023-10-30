import { AView } from "../view";
import { IMapOption } from "@/interface/datasource/map";
import { MapSimple } from "@/interface/map";
/* eslint-disable no-unused-vars */
import { getUUIDv4 } from "@/utils/uuid";

export abstract class AMapLayer<
  T extends IMapOption = IMapOption
> extends AView {
  protected info: T;
  constructor(info: T) {
    super();
    this.info = Object.assign({ metadata: {} }, info);
    this._id = this.info.id || `${getUUIDv4()}`;
  }
  get id() {
    return this._id;
  }
  get metadata() {
    return this.info ? this.info.metadata : {};
  }
  abstract getBeforeId(): string;
  abstract getAllLayerIds(): string[];
  abstract addToMap(map: MapSimple, beforeId: string): void;
  abstract removeFromMap(map: MapSimple): void;
  abstract moveLayer(map: MapSimple, beforeId: string): void;
  abstract toggleShow(map: MapSimple, show: boolean): void;
  abstract setOpacity(map: MapSimple, opacity: number): void;
  abstract getValue(): any;
  abstract getComponentUpdate(): any;
  abstract updateValue(map: MapSimple, value: any): void;
}
