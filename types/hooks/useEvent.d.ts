import { Event } from "@/model";
import { MapSimple } from "@/interface/map";
export declare function useEventMap(
  event: Event,
  immediate?: boolean
):
  | {
      add: () => void;
      remove: () => void;
      isActive?: undefined;
    }
  | {
      add: () => void;
      remove: () => void;
      isActive: import("vue").Ref<boolean>;
    };
export declare function setEventMap(
  $map: MapSimple,
  event: Event
): {
  add: () => void;
  remove: () => void;
  isActive: import("vue").Ref<boolean>;
  updateEventActive: () => void;
};
