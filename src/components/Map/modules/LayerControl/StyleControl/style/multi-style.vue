<script setup lang="ts">
import { computed, defineProps, defineEmits, ref, nextTick, watch } from "vue";
import { Layer } from "mapbox-gl";
import { inputSelect } from "@components/input";
import SingleStyle from "./single-style.vue";
import { LayerSimpleMapboxBuild } from "@/model";
import { mdiDelete, mdiPlus } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
const props = defineProps({
  value: {
    required: true
  },
  trans: {
    required: true
  }
});
const emit = defineEmits(["input", "update-style", "close"]);
const layers = computed<Layer[]>({
  get() {
    return props.value as Layer[];
  },
  set(value) {
    emit("input", value);
  }
});
watch(layers, () => {
  if (!tab.value && layers.value.length > 0) {
    tab.value = layers.value[layers.value.length - 1].id;
  }
});
const onSelectTab = (layer_id: string) => {
  tab.value = undefined;
  nextTick(() => {
    tab.value = layer_id;
  });
};
const onUpdateStyleLayer = (layer: Layer, layer_id: string) => {
  emit("update-style", {
    type: "update-one-layer",
    layer,
    index: layers.value.findIndex((x) => x.id === layer_id)
  });
};
const onAddStyleLayer = () => {
  tab.value = undefined;
  emit("update-style", {
    type: "add-one-layer",
    layer: new LayerSimpleMapboxBuild()
      .setStyleType("line")
      .setColor("#fff")
      .build()
  });
};
const onRemoveStyleLayer = (layer_id: string) => {
  let index = layers.value.findIndex((x) => x.id === layer_id);
  if (!layers.value[index]) {
    return;
  }
  tab.value = undefined;
  emit("update-style", {
    type: "remove-one-layer",
    index,
    layer: layers.value[index]
  });
  layers.value.splice(index, 1);
  if (layers.value[0]) onSelectTab(layers.value[0].id);
};
const tab = ref<string | undefined>(layers.value[0].id);
const tabs = computed(() => {
  return layers.value.map((x, i) => {
    return { text: `#${i + 1}`, value: x.id };
  });
});
const current_layer = computed(() => {
  return layers.value.find((x) => x.id === tab.value);
});
const path = {
  delete: mdiDelete,
  create: mdiPlus
};
</script>
<template lang="">
  <div class="multi-style-edit-container">
    <div class="tab-container">
      <div class="tab-item">
        <input-select
          :value="tab"
          @input="onSelectTab"
          :items="tabs"
        ></input-select>
      </div>
      <div
        class="tab-item tab-add clickable"
        @click="onRemoveStyleLayer(tab)"
        :disabled="!tab"
      >
        <SvgIcon size="14" type="mdi" :path="path.delete" :disabled="!tab" />
      </div>
      <div class="tab-item tab-add clickable" @click="onAddStyleLayer()">
        <SvgIcon size="14" type="mdi" :path="path.create" />
      </div>
    </div>
    <div class="style-container" v-if="tab">
      <SingleStyle
        :value="current_layer"
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
.style-container {
  flex-grow: 1;
  overflow: auto;
  display: flex;
  height: 100%;
}
.tab-container {
  display: flex;
  border-bottom-width: thin;
  border-bottom-color: #fff;
  border-bottom-style: solid;
  .tab-item {
    flex-grow: 1;
    padding: 8px 16px;
  }
  .tab-add {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    max-width: 20px;
  }
}
</style>
