import { IEvent } from "../interface/event";
export declare function addListenerMap(mapId: string, event: IEvent): string;
export declare function removeListenerMap(mapId: string, event: IEvent): void;
export declare function getListenerMap(
  mapId: string,
  event: string
): IEvent<any, Function>[];
export declare function setCurrentEvent(
  mapId: string,
  event_map_type: string,
  event: IEvent
): void;
export declare function getCurrentEvent(
  mapId: string,
  event_map_type: string
): IEvent<any, Function>;
