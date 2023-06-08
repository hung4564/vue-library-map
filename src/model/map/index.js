import { MapSingleLayer } from "./MapSingleLayer";

export function createDefaultViewInMap(layer) {
  return new MapSingleLayer(layer);
}
export * from "./MapSingleLayer";
export * from "./MapMultiLayer";
export * from "./ALayer";

export * from "./custom";
