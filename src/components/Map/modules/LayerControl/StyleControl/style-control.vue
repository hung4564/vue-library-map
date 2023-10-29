<script setup lang="ts">
import { defineExpose, ref } from "vue";

import { useMap } from "@/components/Map/mixins/useMap";
import ModuleContainer from "@/components/Map/ModuleContainer.vue";
import { useShow } from "@/hooks/useShow";
import { Layer } from "@/model";
import { DraggableSidebar } from "@hungpv97/vue-library-draggable";
import { updateMapLang } from "@/store/store-lang";
import { Sketch } from "vue-color";
import enLang from "@/lang/en/style-control.json";

const [show, toggleShow] = useShow(false);
const { c_mapId, $map } = useMap();
updateMapLang(c_mapId.value, {
  map: { "style-control": enLang }
});
const open = (layer: Layer) => {
  toggleShow(true);
  let layer_map = layer.getView("map");
  console.log("🚀 ~ open ~ layer_map", layer_map);
};
const close = () => {
  toggleShow(false);
};
defineExpose({ open, close });
const colors = ref("#194d33");
</script>
<template>
  <ModuleContainer v-bind="$attrs">
    <template #draggable="props">
      <DraggableSidebar v-bind="props" right :show.sync="show">
        <template #title>
          <span class="layer-control__title">
            {{ $map.trans("map.style-control.title") }}
          </span>
        </template>
        <div class="style-control">
          <Sketch v-model="colors"></Sketch>
        </div>
      </DraggableSidebar>
    </template>
  </ModuleContainer>
</template>
<style lang="scss">
.style-control {
  .vc-sketch {
    width: calc(100% - 20px);
    background-color: transparent;
    box-shadow: unset;
  }
}
</style>
