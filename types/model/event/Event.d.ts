import { Base } from "../Base";
import { IEvent } from "@/interface/event";
import { MapSimple } from "@/interface/map";
export declare class Event<
    IOption extends {} = any,
    ICallBack extends Function = Function
  >
  extends Base
  implements IEvent
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
