import { ALayer } from "./ALayer";
import { IMapSingleLayerOption } from "@/interface/datasource/map";
import { MapSimple } from "@/interface/map";
export declare class MapSingleLayer extends ALayer {
  protected layer: any;
  protected source: any;
  constructor(info: IMapSingleLayerOption);
  getBeforeId(): any;
  getAllLayerIds(): any[];
  addToMap(map: MapSimple, beforeId: string): void;
  removeFromMap(map: MapSimple): void;
  moveLayer(map: MapSimple, beforeId: string): void;
  toggleShow(map: MapSimple, show: boolean): void;
  setOpacity(map: MapSimple, opacity: number): void;
}
