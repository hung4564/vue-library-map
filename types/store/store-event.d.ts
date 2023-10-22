import { IEvent } from "../interface/event";
export declare function addListenerMap(mapId: string, event: IEvent): string;
export declare function removeListenerMap(mapId: string, event: IEvent): void;
export declare function getListenerMap(
  mapId: string,
  event: string
): IEvent<
  "click",
  any,
  (
    ev: import("mapbox-gl").MapMouseEvent & {
      features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & import("mapbox-gl").EventData
  ) => void
>[];
export declare function setCurrentEvent(
  mapId: string,
  event_map_type: string,
  event: IEvent
): void;
export declare function getCurrentEvent(
  mapId: string,
  event_map_type: string
): IEvent<
  "click",
  any,
  (
    ev: import("mapbox-gl").MapMouseEvent & {
      features?: import("mapbox-gl").MapboxGeoJSONFeature[] | undefined;
    } & import("mapbox-gl").EventData
  ) => void
>;
