import { AMapLayer } from "./ALayer";
import { IMapMultiLayerOption } from "@/interface/datasource/map";
import { MapSimple } from "@/interface/map";
import MultiStyle from "@map/modules/StyleControl/style/multi-style.vue";
export declare class MapMultiLayer extends AMapLayer {
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
  getValue(): any[];
  getComponentUpdate(): import("vue").VueConstructor<
    MultiStyle<
      Record<string, any>,
      Record<string, any>,
      never,
      never,
      (
        event: string,
        ...args: any[]
      ) => MultiStyle<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        any
      >
    >
  >;
  updateValue(map: MapSimple, value: any): void;
}
