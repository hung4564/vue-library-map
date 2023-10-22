import { EventData, MapLayerEventType } from "mapbox-gl";
import { Base } from "../Base";
import { IEvent } from "@/interface/event";
import { MapSimple } from "@/interface/map";
export declare class Event<
    T extends keyof MapLayerEventType = "click",
    IOption extends {} = any,
    ICallBack extends Function = (ev: MapLayerEventType[T] & EventData) => void
  >
  extends Base
  implements IEvent<T, IOption, ICallBack>
{
  event_map_type: string;
  type_select: string;
  options: IOption;
  handler?: ICallBack;
  constructor(event_map_type: string, type_select?: string);
  setHandler(handler: ICallBack): this;
  addToMap(map: MapSimple): this;
  removeFromMap(map: MapSimple): this;
}
