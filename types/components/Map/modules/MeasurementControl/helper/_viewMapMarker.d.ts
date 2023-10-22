import { Color, CoordinatesNumber, MapSimple } from "@/interface/map";
import { Marker } from "mapbox-gl";
import { View } from "./_view";
declare type onDragMarker = (
  coordinates: CoordinatesNumber[],
  coordinate: CoordinatesNumber,
  index: number,
  marker: Marker
) => void;
declare type onRightClickMarker = (
  coordinates: CoordinatesNumber[],
  coordinate: CoordinatesNumber,
  index: number,
  marker: Marker
) => void;
declare type bindOnDragMaker = (
  marker: Marker,
  index: number,
  coordinates: CoordinatesNumber[]
) => void;
declare type bindOnRightClickMarker = (
  marker: Marker,
  index: number,
  coordinates: CoordinatesNumber[]
) => void;
export declare class MapMarkerView extends View {
  protected map: MapSimple;
  protected markers: any[];
  protected color: Color;
  protected onDragMarker?: onDragMarker;
  protected bindOnDragMaker?: bindOnDragMaker;
  protected onRightClickMarker?: onRightClickMarker;
  protected bindOnRightClickMarker?: bindOnRightClickMarker;
  constructor(map: MapSimple);
  setColor(color: Color): this;
  view({ coordinates }?: { coordinates?: never[] | undefined }): void;
  reset(): void;
  destroy(): void;
}
export {};
