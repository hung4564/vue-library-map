<script setup>
import ModuleContainer from "@components/Map/ModuleContainer.vue";
import { useMap } from "@components/Map/mixins/useMap";
import { EVENTBUS_TYPE, eventBus, storeEvent } from "@hungpv97/vue-map-store";
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
  const listeners = storeEvent.getListenerMap(c_mapId.value, event);
  callMap((map) => {
    if (current_listener[event]) {
      current_listener[event].removeFromMap(map);
    }
    current_listener[event] = listeners[0];
    if (current_listener[event]) {
      storeEvent.setCurrentEvent(c_mapId.value, event, current_listener[event]);
      current_listener[event].addToMap(map);
    } else {
      storeEvent.setCurrentEvent(c_mapId.value, event, undefined);
    }
  });
};
</script>
<template setup>
  <ModuleContainer v-bind="$attrs"> </ModuleContainer>
</template>
