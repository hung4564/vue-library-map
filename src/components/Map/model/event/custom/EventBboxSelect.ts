import { Coordinates, MapSimple } from "@/interface/map";
import {
  EventBboxRangerHandle,
  EventBboxRangerOption
} from "@/interface/event";

import { Event } from "../Event";

type MapRangerHandle = {
  destroy: () => void;
};
export class EventBboxRanger extends Event<
  EventBboxRangerOption,
  EventBboxRangerHandle
> {
  protected map_ranger?: MapRangerHandle;
  constructor() {
    super("click", "map");
    this.setClassPointer("pointer");
  }
  setClassPointer(classPointer: string) {
    this.options.classPointer = classPointer;
  }
  addToMap(map: MapSimple) {
    if (!this.handler) {
      return this;
    }
    map.getCanvas().classList.add(this.options.classPointer);
    map.dragPan.disable();
    map.boxZoom.disable();
    this.map_ranger = startBoxRangerMap(map.getCanvasContainer(), this.handler);
    return this;
  }
  removeFromMap(map: MapSimple) {
    map.getCanvas().classList.remove(this.options.classPointer);
    if (this.map_ranger) {
      this.map_ranger.destroy();
      this.map_ranger = undefined;
    }
    map.dragPan.enable();
    map.boxZoom.enable();
    return this;
  }
}
export function startBoxRangerMap(
  canvas: HTMLCanvasElement,
  cb_bbox: EventBboxRangerHandle | undefined
): MapRangerHandle {
  let can_draw = true;
  // Variable to hold the starting xy coordinates
  // when `mousedown` occured.
  let start: Coordinates;

  // Variable to hold the current xy coordinates
  // when `mousemove` or `mouseup` occurs.
  let current: Coordinates;

  // Variable for the draw box element.
  let box: HTMLDivElement | undefined;

  // Set `true` to dispatch the event before other functions
  // call it. This is necessary for disabling the default map
  // dragging behaviour.
  canvas.addEventListener("mousedown", mouseDown, true);

  // Return the xy coordinates of the mouse position
  function mousePos(e: any): Coordinates {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left - canvas.clientLeft,
      y: e.clientY - rect.top - canvas.clientTop
    };
  }

  function mouseDown(e: any) {
    // // Continue the rest of the function if the shiftkey is pressed.
    // if (!(e.shiftKey && e.button === 0)) return;
    // Disable default drag zooming when the shift key is held down.

    // Call functions for the following events
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("keydown", onKeyDown);

    // Capture the first xy coordinates
    start = mousePos(e);
  }

  function onMouseMove(e: any) {
    if (!can_draw) return;
    // Capture the ongoing xy coordinates
    current = mousePos(e);

    // Append the box element if it doesnt exist
    if (!box) {
      box = document.createElement("div");
      box.classList.add("boxdraw");
      canvas.appendChild(box);
    }

    const minX = Math.min(start.x, current.x),
      maxX = Math.max(start.x, current.x),
      minY = Math.min(start.y, current.y),
      maxY = Math.max(start.y, current.y);

    // Adjust width and xy position of the box element ongoing
    const pos = `translate(${minX}px, ${minY}px)`;
    box.style.transform = pos;
    box.style.width = maxX - minX + "px";
    box.style.height = maxY - minY + "px";
  }

  function onMouseUp(e: any) {
    // Capture xy coordinates
    finish([start, mousePos(e)]);
  }

  function onKeyDown(e: any) {
    // If the ESC key is pressed
    if (e.keyCode === 27) finish();
  }

  function finish(bbox?: [Coordinates, Coordinates]) {
    // Remove these events now that finish has been called.
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("keydown", onKeyDown);
    document.removeEventListener("mouseup", onMouseUp);
    if (box) {
      if (box.parentNode) box.parentNode.removeChild(box);
      box = undefined;
    }
    // If bbox exists. use this value as the argument for `queryRenderedFeatures`
    if (bbox && cb_bbox) {
      cb_bbox(bbox);
    }
  }
  function destroy() {
    // Remove these events now that finish has been called.
    canvas.removeEventListener("mousedown", mouseDown);
    can_draw = false;
    cb_bbox = undefined;
    finish();
  }
  return {
    destroy: destroy
  };
}
