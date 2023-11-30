<script setup>
import { mdiInboxOutline } from "@mdi/js";
import { DraggablePopup } from "@hungpv97/vue-library-draggable";
import ModuleContainer from "@components/Map/ModuleContainer.vue";
import MapControlButton from "@components/Map/control/MapControlButton.vue";
import { useMap } from "@components/Map/mixins/useMap";
import SvgIcon from "@jamescoyle/vue-icon";
import enLang from "@/lang/en/crs-control.json";
import { useShow } from "@/hooks/useShow";
import { updateMapLang } from "@/store/store-lang";
import Collapse from "@/components/Collapse/index.vue";
import { ref } from "vue";
import InputText from "@/components/input/input-text.vue";
import InputSelect from "@/components/input/input-select.vue";
import { getCrsItems } from "@/store/store-crs";
const { $map, c_mapId } = useMap();
const [show, setShow] = useShow(false);
const crs_items = ref([]);
updateMapLang(c_mapId.value, {
  map: { "crs-control": enLang }
});
function onToggleShow() {
  setShow(!show.value);
  crs_items.value = getCrsItems(c_mapId.value);
}
const unit_items = [
  { text: "degree", value: "degree" },
  { text: "meter", value: "meter" }
];
</script>
<template>
  <ModuleContainer v-bind="$attrs">
    <template #btn>
      <MapControlButton
        @click="onToggleShow"
        :tooltip="$map.trans('map.crs-control.title')"
      >
        <SvgIcon :size="18" type="mdi" :path="mdiInboxOutline" />
      </MapControlButton>
    </template>
    <template #draggable="props">
      <DraggablePopup
        v-if="show"
        :height="200"
        :width="400"
        v-bind="props"
        :show.sync="show"
        :title="$map.trans('map.crs-control.title')"
      >
        <Collapse
          v-for="crs_item in crs_items"
          :key="crs_item.epsg"
          :selected="false"
        >
          <template #header>
            {{ crs_item.name }}
          </template>
          <div class="crs-item">
            <div>
              <InputText
                readonly
                v-model="crs_item.name"
                :label="$map.trans('map.crs-control.field.name')"
              />
            </div>
            <div>
              <InputText
                v-model="crs_item.epsg"
                :label="$map.trans('map.crs-control.field.epsg')"
              />
            </div>
            <div v-if="!crs_item.default">
              <InputText
                readonly
                v-model="crs_item.proj4js"
                :label="$map.trans('map.crs-control.field.proj4js')"
              />
            </div>
            <div v-if="!crs_item.default">
              <InputSelect
                readonly
                v-model="crs_item.unit"
                :label="$map.trans('map.crs-control.field.unit')"
                :items="unit_items"
              />
            </div>
          </div>
        </Collapse>
      </DraggablePopup>
    </template>

    <slot />
  </ModuleContainer>
</template>
<style scoped>
.crs-item {
  padding: 4px 16px;
}
.crs-item .form-group {
  padding-bottom: 4px;
}
</style>
