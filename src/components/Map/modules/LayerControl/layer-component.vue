<template lang="">
  <ModuleContainer v-bind="$attrs">
    <template #draggable="props">
      <component
        :is="item.component"
        v-for="item in components_show"
        :key="item.id"
        v-bind="{ ...props, ...item.attr }"
        @close="onRemoveComponent(item)"
      ></component
    ></template>
  </ModuleContainer>
</template>
<script setup lang="ts">
import ModuleContainer from "@/components/Map/ModuleContainer.vue";
import { ListView } from "@/interface/datasource/list";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { eventBus, EVENTBUS_TYPE } from "@/utils/event-bus";
const components_show = ref<
  {
    component: any;
    id: string;
    attr: any;
  }[]
>([]);
function onRemoveComponent(item: { id: string }) {
  let index = components_show.value.findIndex((x) => x.id == item.id);
  if (index < 0) {
    return;
  }
  components_show.value.splice(index, 1);
}
function onAddComponent({
  component,
  item,
  option,
  id
}: {
  component: any;
  item: ListView;
  option: any;
  id: string;
}) {
  components_show.value.push({
    id,
    attr: { item, option },
    component
  });
}
onMounted(() => {
  eventBus.on(EVENTBUS_TYPE.COMPONENT.ADD, onAddComponent);
  eventBus.on(EVENTBUS_TYPE.COMPONENT.REMOVE, onRemoveComponent);
});
onBeforeUnmount(() => {
  eventBus.off(EVENTBUS_TYPE.COMPONENT.ADD, onAddComponent);
  eventBus.on(EVENTBUS_TYPE.COMPONENT.REMOVE, onRemoveComponent);
});
</script>
