<script setup lang="ts">
import { computed, defineProps, defineEmits, ref, nextTick } from "vue";
import { Layer } from "mapbox-gl";
import SingleStyle from "./single-style.vue";
const props = defineProps({
  value: {
    required: true
  },
  trans: {
    required: true
  }
});
const emit = defineEmits(["input", "update-style"]);
const layers = computed<Layer[]>({
  get() {
    return props.value as Layer[];
  },
  set(value) {
    emit("input", value);
  }
});
const onSelectTab = (index: number) => {
  tab.value = undefined;
  nextTick(() => {
    tab.value = index;
  });
};
const onUpdateStyleLayer = (layer: Layer, index: number) => {
  emit("update-style", { type: "update-one-layer", layer, index });
};
const tab = ref<number | undefined>(0);
</script>
<template lang="">
  <div class="multi-style-edit-container">
    <div class="tab-container">
      <div
        v-for="(layer, i) in layers"
        :key="i"
        class="tab-item"
        :name="`#${i + 1}`"
        @click="onSelectTab(i)"
        :class="{ 'tab-item-active': tab === i }"
      >
        #{{ i + 1 }}
      </div>
    </div>
    <div class="style-container" v-if="tab >= 0">
      <SingleStyle
        :value="layers[tab]"
        :trans="trans"
        @update-style="onUpdateStyleLayer($event, tab)"
      />
    </div>
  </div>
</template>
<style lang="scss">
.multi-style-edit-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.tab-container {
  display: flex;
  flex-grow: 0;
  border-bottom-width: thin;
  border-bottom-color: #fff;
  border-bottom-style: solid;
  .tab-item {
    min-width: 100px;
    height: 30px;
    padding: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .tab-item-active {
    color: var(--v-primary-base, #38d4ff);
  }
}
.style-container {
  flex-grow: 1;
  overflow: auto;
  display: flex;
  height: 100%;
}
</style>
