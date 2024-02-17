import { AMapLayer } from "./ALayer";
import { IMapSingleLayerOption } from "@/interface/datasource/map";
import { MapSimple } from "@/interface/map";
import SingleStyle from "@map/modules/StyleControl/style/single-style.vue";
export declare class MapSingleLayer extends AMapLayer {
  protected layer: any;
  constructor(info: IMapSingleLayerOption);
  getBeforeId(): any;
  getAllLayerIds(): any[];
  addToMap(map: MapSimple, beforeId: string): void;
  removeFromMap(map: MapSimple): void;
  moveLayer(map: MapSimple, beforeId: string): void;
  toggleShow(map: MapSimple, show: boolean): void;
  setOpacity(map: MapSimple, opacity: number): void;
  getValue(): any;
  getComponentUpdate(): import("vue").VueConstructor<
    SingleStyle<
      Record<string, any>,
      Record<string, any>,
      never,
      never,
      (
        event: string,
        ...args: any[]
      ) => SingleStyle<
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
