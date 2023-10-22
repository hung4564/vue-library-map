import { MapSimple } from "@/interface/map";
import {
  EventBboxRangerHandle,
  EventBboxRangerOption
} from "@/interface/event";
import { Event } from "../Event";
declare type MapRangerHandle = {
  destroy: () => void;
};
export declare class EventBboxRanger extends Event<
  "click",
  EventBboxRangerOption,
  EventBboxRangerHandle
> {
  protected map_ranger?: MapRangerHandle;
  constructor();
  setClassPointer(classPointer: string): void;
  addToMap(map: MapSimple): this;
  removeFromMap(map: MapSimple): this;
}
export declare function startBoxRangerMap(
  canvas: HTMLCanvasElement,
  cb_bbox: EventBboxRangerHandle | undefined
): MapRangerHandle;
export {};
