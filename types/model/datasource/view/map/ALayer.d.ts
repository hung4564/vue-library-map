import { IMapOption } from "@/interface/datasource/map";
import { AView } from "../view";
import { MapSimple } from "@/interface/map";
export declare abstract class ALayer<
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
}
