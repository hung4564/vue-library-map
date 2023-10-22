import { EventData, MapLayerEventType } from "mapbox-gl";
import { Coordinates, MapSimple } from "./map";
export interface EventClickOption {
  classPointer?: string;
}
export interface EventBboxRangerOption extends EventClickOption {}
export declare type EventBboxRangerHandle = (
  _bbox?: [Coordinates, Coordinates]
) => any;
export interface IEvent<
  T extends keyof MapLayerEventType = "click",
  IOption extends {} = any,
  ICallBack extends Function = (ev: MapLayerEventType[T] & EventData) => void
> {
  _id: string;
  get id(): string;
  event_map_type: string;
  type_select: string;
  options: IOption;
  handler?: ICallBack;
  setHandler(_handler: ICallBack): this;
  addToMap(_map: MapSimple): this;
  removeFromMap(_map: MapSimple): this;
}
