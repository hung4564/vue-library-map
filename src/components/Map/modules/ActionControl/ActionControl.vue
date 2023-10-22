<script setup>
import ModuleContainer from "@components/Map/ModuleContainer.vue";
import { EVENTBUS_TYPE, eventBus } from "@/utils/event-bus";
import { useMap } from "@components/Map/mixins/useMap";
import { getListenerMap, setCurrentEvent } from "@/store/store-event";
const { c_mapId, callMap } = useMap();
const current_listener = {};
eventBus.on(EVENTBUS_TYPE.EVENT.ADD, (item) => {
  if (!item) {
    return;
  }
  updateEventMap(item.event_map_type);
});
eventBus.on(EVENTBUS_TYPE.EVENT.REMOVE, (item) => {
  if (!item) {
    return;
  }
  updateEventMap(item.event_map_type);
});
const updateEventMap = (event) => {
  const listeners = getListenerMap(c_mapId.value, event);
  callMap((map) => {
    if (current_listener[event]) {
      current_listener[event].removeFromMap(map);
    }
    current_listener[event] = listeners[0];
    if (current_listener[event]) {
      setCurrentEvent(c_mapId.value, event, current_listener[event]);
      current_listener[event].addToMap(map);
    } else {
      setCurrentEvent(c_mapId.value, event, undefined);
    }
  });
};
</script>
<template setup>
  <ModuleContainer v-bind="$attrs"> </ModuleContainer>
</template>
