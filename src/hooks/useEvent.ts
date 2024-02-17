import { EVENTBUS_TYPE, eventBus } from "@/utils/event-bus";
import {
  addListenerMap,
  getCurrentEvent,
  removeListenerMap
} from "@/store/store-event";
import { inject, onBeforeUnmount, onMounted, ref } from "vue";

import { Event } from "@/model";
import { MapSimple } from "@/interface/map";

export function useEventMap(event: Event, immediate = false) {
  const $map: MapSimple | undefined = inject("$map");
  if (!$map) return { add: () => {}, remove: () => {} };
  const { add, remove, isActive, updateEventActive } = setEventMap($map, event);
  onBeforeUnmount(() => {
    remove();
    eventBus.off(EVENTBUS_TYPE.EVENT.UPDATE_CURRENT, updateEventActive);
  });
  if (immediate) {
    onMounted(() => {
      add();
    });
  }
  return { add, remove, isActive };
}
export function setEventMap($map: MapSimple, event: Event) {
  const isActive = ref(false);
  const add = () => {
    updateEventActive();
    addListenerMap($map.id, event);
  };
  const remove = () => {
    isActive.value = false;
    removeListenerMap($map.id, event);
  };
  function updateEventActive() {
    if (!$map) return;
    const c_event = getCurrentEvent($map.id, event.event_map_type);
    isActive.value = !!c_event && c_event.id === event.id;
  }
  eventBus.on(EVENTBUS_TYPE.EVENT.UPDATE_CURRENT, updateEventActive);
  updateEventActive();
  return { add, remove, isActive, updateEventActive };
}
