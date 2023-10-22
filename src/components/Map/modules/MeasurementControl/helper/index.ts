import { MapSimple } from "@/interface/map";

export * from "./_view";
export * from "./_viewMap";
export * from "./_viewMapMarker";
export * from "./_measurement";
export * from "./_measureDistance";
export * from "./_measureArea";
export * from "./_measureAzimuth";
export * from "./_measurePoint";

export * from "./_handle";
export function addCursorCrosshair(map: MapSimple) {
  if (!map) {
    return;
  }
  const canvas = map.getCanvas();
  canvas.classList.add("cursor-crosshair");
}

export function removeCursorCrosshair(map: MapSimple) {
  if (!map) {
    return;
  }
  const canvas = map.getCanvas();
  canvas.classList.remove("cursor-crosshair");
}
