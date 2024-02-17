import { AView } from "../view";
import { IMapOption } from "@/interface/datasource/map";
import { MapSimple } from "@/interface/map";
export declare abstract class AMapLayer<
  T extends IMapOption = IMapOption
> extends AView {
  protected info: T;
  constructor(info: T);
  get id(): string;
  get metadata(): {
    bounds?: number[] | undefined;
  };
  abstract getBeforeId(): string;
  abstract getAllLayerIds(): string[];
  abstract addToMap(map: MapSimple, beforeId: string): void;
  abstract removeFromMap(map: MapSimple): void;
  abstract moveLayer(map: MapSimple, beforeId: string): void;
  abstract toggleShow(map: MapSimple, show: boolean): void;
  abstract setOpacity(map: MapSimple, opacity: number): void;
  abstract getValue(): any;
  abstract getComponentUpdate(): any;
  abstract updateValue(map: MapSimple, value: any): void;
}
