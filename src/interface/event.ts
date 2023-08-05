import { Coordinates } from "./map";

export interface EventClickOption {
  classPointer?: string;
}
export interface EventBboxRangerOption extends EventClickOption {}
export type EventBboxRangerHandle = (bbox?: [Coordinates, Coordinates]) => any;
