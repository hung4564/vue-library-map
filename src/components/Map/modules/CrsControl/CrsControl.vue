<script setup lang="ts">
import { mdiDelete, mdiInboxOutline, mdiPlus } from "@mdi/js";
import { DraggablePopup } from "@hungpv97/vue-library-draggable";
import ModuleContainer from "@components/Map/ModuleContainer.vue";
import MapControlButton from "@components/Map/control/MapControlButton.vue";
import { useMap } from "@components/Map/mixins/useMap";
import SvgIcon from "@jamescoyle/vue-icon";
import enLang from "@/lang/en/crs-control.json";
import { useShow } from "@/hooks/useShow";
import { updateMapLang } from "@/store/store-lang";
import Collapse from "@/components/Collapse/index.vue";
import { computed } from "vue";
import InputText from "@/components/input/input-text.vue";
import InputSelect from "@/components/input/input-select.vue";
import { getCrsItems, setCrsItems, CrsItem } from "@/store/store-crs";
const { $map, c_mapId } = useMap();
const [show, setShow] = useShow(false);
updateMapLang(c_mapId.value, {
  map: { "crs-control": enLang }
});
function onToggleShow() {
  setShow(!show.value);
}
const crs_items = computed(() => {
  return getCrsItems(c_mapId.value);
});
const unit_items = [
  { text: "degree", value: "degree" },
  { text: "meter", value: "meter" }
];
const path = {
  delete: mdiDelete,
  plus: mdiPlus
};
const onRemove = (item: CrsItem) => {
  setCrsItems(
    c_mapId.value,
    crs_items.value.filter((x) => x.epsg !== item.epsg)
  );
};
const onAdd = () => {
  crs_items.value.push({ name: "", unit: "degree", epsg: "" });
};
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
            <div class="crs-item-header">
              <div class="crs-item-header__title">
                {{ crs_item.name }}
              </div>
              <div class="crs-item-header__action">
                <button
                  class="layer-item__button"
                  v-if="!crs_item.default"
                  @click.stop="onRemove(crs_item)"
                >
                  <SvgIcon size="14" type="mdi" :path="path.delete" />
                </button>
              </div>
            </div>
          </template>
          <div class="crs-item">
            <div>
              <InputText
                :readonly="crs_item.default"
                :value="crs_item.name"
                @change="crs_item.name = $event"
                :label="$map.trans('map.crs-control.field.name')"
              />
            </div>
            <div>
              <InputText
                :readonly="crs_item.default"
                :value="crs_item.epsg"
                @change="crs_item.epsg = $event"
                :label="$map.trans('map.crs-control.field.epsg')"
              />
            </div>
            <div v-if="!crs_item.default">
              <InputText
                :value="crs_item.proj4js"
                @change="crs_item.proj4js = $event"
                :label="$map.trans('map.crs-control.field.proj4js')"
              />
            </div>
            <div v-if="!crs_item.default">
              <InputSelect
                v-model="crs_item.unit"
                :label="$map.trans('map.crs-control.field.unit')"
                :items="unit_items"
              />
            </div>
          </div>
        </Collapse>
        <div class="crs-item__add">
          <button class="layer-item__button clickable" @click.stop="onAdd()">
            <SvgIcon size="14" type="mdi" :path="path.plus" />
          </button>
        </div>
      </DraggablePopup>
    </template>

    <slot />
  </ModuleContainer>
</template>
<style scoped>
.crs-item-header {
  display: flex;
  flex-grow: 1;
}
.crs-item-header__title {
  flex-grow: 1;
}
.crs-item-header__action {
  flex-grow: 0;
}
.crs-item {
  padding: 4px 16px;
}
.crs-item .form-group {
  padding-bottom: 4px;
}
.crs-item__add {
  padding: 8px;
}
.crs-item__add .layer-item__button {
  padding: 8px;
  width: 100%;
}
</style>
