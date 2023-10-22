import { LayerPartContainer } from "./_default";
export declare class LayerMapContainer extends LayerPartContainer {
  map_id: string;
  sub_map_ids: string[];
  constructor();
  isHas(map_id: string): boolean;
  add(map_id: string): this;
  remove(map_id: string): this;
}
