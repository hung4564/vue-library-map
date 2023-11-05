<script setup lang="ts">
import { computed, defineExpose, ref } from "vue";

import { useMap } from "@/components/Map/mixins/useMap";
import ModuleContainer from "@/components/Map/ModuleContainer.vue";
import { useShow } from "@/hooks/useShow";
import { Layer } from "@/model";
import { DraggableSidebar } from "@hungpv97/vue-library-draggable";
import { updateMapLang } from "@/store/store-lang";
//
import enLang from "@/lang/en/style-control.json";
import circleStyleLang from "@/lang/en/style/circle-style.json";
import lineStyleLang from "@/lang/en/style/line-style.json";
import fillStyleLang from "@/lang/en/style/fill-style.json";
import symbolStyleLang from "@/lang/en/style/symbol-style.json";
import rasterStyleLang from "@/lang/en/style/raster-style.json";
import { AMapLayer } from "@/model/datasource/view/map";
import { MapSimple } from "@/interface/map";
const [show, toggleShow] = useShow(false);
const { c_mapId, $map, callMap } = useMap();
updateMapLang(c_mapId.value, {
  map: { "style-control": enLang },
  "circle-style": circleStyleLang,
  "line-style": lineStyleLang,
  "fill-style": fillStyleLang,
  "symbol-style": symbolStyleLang,
  "raster-style": rasterStyleLang
});
const layer = ref();
const layer_map = ref<AMapLayer | undefined>(undefined);
const layer_map_component = computed(() => {
  return layer_map.value && layer_map.value.getComponentUpdate();
});
const open = (_layer: Layer) => {
  toggleShow(true);
  layer_map.value = _layer.getView("map") as AMapLayer;
  layer.value = layer_map.value.getValue();
};
const close = () => {
  toggleShow(false);
  onClose();
};
const onClose = () => {
  layer_map.value = undefined;
  layer.value = undefined;
};
const onUpdateStyle = (value: any) => {
  if (!layer_map.value) {
    return;
  }
  callMap((map: MapSimple) => {
    if (!layer_map.value) {
      return;
    }
    layer_map.value.updateValue(map, value);
    layer.value = layer_map.value.getValue();
  });
};
defineExpose({ open, close });
</script>
<template>
  <ModuleContainer v-bind="$attrs">
    <template #draggable="props">
      <DraggableSidebar
        v-bind="props"
        right
        :show.sync="show"
        v-if="layer_map_component"
        @close="onClose"
      >
        <template #title>
          <span class="layer-control__title">
            {{ $map.trans("map.style-control.title") }}
          </span>
        </template>
        <div class="style-control">
          <component
            :is="layer_map_component"
            v-model="layer"
            @update-style="onUpdateStyle"
            :trans="$map.trans"
          />
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
    .vc-input__label {
      color: #fff;
    }
  }
  height: 100%;
  overflow: hidden;
}
</style>
