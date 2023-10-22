import { Event } from "../Event";
import { EventClickOption } from "@/interface/event";
import { MapSimple } from "@/interface/map";
export declare class EventClick extends Event<EventClickOption> {
  constructor(type_select?: string);
  setClassPointer(classPointer: string): void;
  addToMap(map: MapSimple): this;
  removeFromMap(map: MapSimple): this;
}
