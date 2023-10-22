import { Layer } from "../model/datasource";
export declare function addLayer(
  mapId: string,
  layer: Layer
): Promise<Layer<import("../interface/source").ISource>>;
export declare function removeLayer(mapId: string, layer: Layer): void;
export declare function getAllViewForKey(mapId: string, key: string): any[];
