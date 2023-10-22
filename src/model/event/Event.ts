import { EventData, MapLayerEventType } from "mapbox-gl";

import { Base } from "../Base";
import { IEvent } from "@/interface/event";
import { MapSimple } from "@/interface/map";

export class Event<
    T extends keyof MapLayerEventType = "click",
    IOption extends {} = any,
    // eslint-disable-next-line no-unused-vars
    ICallBack extends Function = (ev: MapLayerEventType[T] & EventData) => void
  >
  extends Base
  implements IEvent<T, IOption, ICallBack>
{
  public event_map_type: string;
  public type_select: string;
  public options: IOption;
  public handler?: ICallBack;
  constructor(event_map_type: string, type_select = "map") {
    super();
    this.event_map_type = event_map_type;
    this.type_select = type_select;
    this.options = {} as IOption;
  }
  setHandler(handler: ICallBack) {
    this.handler = handler;
    return this;
  }
  addToMap(map: MapSimple) {
    if (this.handler) map.on(this.event_map_type, this.handler as any);
    return this;
  }
  removeFromMap(map: MapSimple) {
    if (this.handler) map.off(this.event_map_type, this.handler as any);
    return this;
  }
}
