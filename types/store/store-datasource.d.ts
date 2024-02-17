import { Layer } from "../model/datasource";
export declare function addLayer(
  mapId: string,
  layer: Layer
): Layer<
  import("../interface/source").ISource<import("geojson").GeoJsonProperties>
>;
export declare function removeLayer(mapId: string, layer: Layer): void;
export declare function getAllViewForKey(mapId: string, key: string): any[];
