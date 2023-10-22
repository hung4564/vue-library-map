import { IMapMultiLayerOption } from "@/interface/datasource/map";
import { ALayer } from "./ALayer";
import { MapSimple } from "@/interface/map";
export declare class MapMultiLayer extends ALayer {
  protected layers: any[];
  protected source: any;
  constructor(info: IMapMultiLayerOption);
  getBeforeId(): any;
  getAllLayerIds(): any[];
  addToMap(map: MapSimple, beforeId: string): void;
  removeFromMap(map: MapSimple): void;
  moveLayer(map: MapSimple, beforeId: string): void;
  toggleShow(map: MapSimple, show: boolean): void;
  setOpacity(map: MapSimple, opacity: number): void;
}
