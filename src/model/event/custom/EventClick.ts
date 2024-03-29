import { Event } from "../Event";
import { EventClickOption } from "@/interface/event";
import { MapSimple } from "@/interface/map";

export class EventClick extends Event<"click", EventClickOption> {
  constructor(type_select = "map") {
    super("click", type_select);
    this.setClassPointer("pointer");
  }
  setClassPointer(classPointer: string) {
    this.options.classPointer = classPointer;
  }
  addToMap(map: MapSimple) {
    if (this.options.classPointer)
      map.getCanvas().classList.add(this.options.classPointer);
    if (this.handler) {
      map.on("click", this.handler);
      map.on("touchstart", this.handler);
    }
    return this;
  }
  removeFromMap(map: MapSimple) {
    if (this.options.classPointer)
      map.getCanvas().classList.remove(this.options.classPointer);
    if (this.handler) {
      map.off("click", this.handler);
      map.off("touchstart", this.handler);
    }
    return this;
  }
}
