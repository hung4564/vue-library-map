import { Event } from "../Event";
import { EventClickOption } from "@/interface/event";
import { MapSimple } from "@/interface/map";

export class EventClick extends Event<EventClickOption> {
  constructor(type_select = "map") {
    super("click", type_select);
    this.setClassPointer("pointer");
  }
  setClassPointer(classPointer: string) {
    this.options.classPointer = classPointer;
  }
  addToMap(map: MapSimple) {
    map.getCanvas().classList.add(this.options.classPointer);
    map.on(this.event_map_type, this.handler);
    return this;
  }
  removeFromMap(map: MapSimple) {
    map.getCanvas().classList.remove(this.options.classPointer);
    map.off(this.event_map_type, this.handler);
    return this;
  }
}
