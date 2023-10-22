export const BASEMAP_PREFIX: "base_map_control_";
export class BaseMapLayer {
  layers: any[];
  source: {};
  getBeforeId(): any;
  setBaseMap(baseMap: any): Promise<void>;
  _baseMap: any;
  sources: {} | {} | undefined;
  addToMap(map: any, beforeId: any): void;
  removeFromMap(map: any): void;
}
