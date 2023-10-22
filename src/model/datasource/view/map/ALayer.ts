import { IMapOption } from "@/interface/datasource/map";
import { AView } from "../view";
/* eslint-disable no-unused-vars */
import { getUUIDv4 } from "@/utils/uuid";
import { MapSimple } from "@/interface/map";

export abstract class ALayer<T extends IMapOption = IMapOption> extends AView {
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
}
