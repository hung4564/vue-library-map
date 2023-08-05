import { Base } from "../Base";
import { IEvent } from "@hungpv97/vue-map-store/types/interface/event";
import { MapSimple } from "@/interface/map";
export class Event<
    IOption extends {} = any,
    ICallBack extends Function = Function
  >
  extends Base
  implements IEvent
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
    map.on(this.event_map_type, this.handler);
    return this;
  }
  removeFromMap(map: MapSimple) {
    map.off(this.event_map_type, this.handler);
    return this;
  }
}
