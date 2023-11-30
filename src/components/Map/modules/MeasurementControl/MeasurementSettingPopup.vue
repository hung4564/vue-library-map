<template>
  <ModuleContainer v-bind="$attrs">
    <template #draggable="props">
      <DraggablePopup
        v-bind="Object.assign(props, popUpPosition)"
        v-if="c_show"
        :show.sync="c_show"
        :title="$map.trans('map.measurement.setting.title')"
      >
        <div class="setting-container">
          <MeasurementSettingFields :fields="fields" />
          <FieldGeometry
            v-model="model"
            :maxLength="maxLength"
            @click:fillbound="onFlyTo"
          />
        </div>
      </DraggablePopup>
    </template>
    <slot />
  </ModuleContainer>
</template>

<script setup>
import MeasurementSettingFields from "./setting/fields-show";
import FieldGeometry from "./setting/field-geometry";
import { DraggablePopup } from "@hungpv97/vue-library-draggable";
import ModuleContainer from "@components/Map/ModuleContainer.vue";
import { fitBounds } from "@/helper";
import { computed, defineProps, defineEmits } from "vue";
import { useMap } from "../../mixins/useMap";
const props = defineProps({
  maxLength: { type: Number, default: 0 },
  value: {
    type: Array,
    default: () => [[0, 0]]
  },
  fields: {
    type: Array,
    default: () => [{ text: "Status", value: "waiting..." }]
  },
  show: Boolean,
  popUpPosition: {
    type: Object,
    default: () => ({
      top: 50,
      right: 40,
      width: 350,
      height: 300
    })
  }
});
const { $map, callMap } = useMap();
const emit = defineEmits(["input", "close", "update:show"]);
const model = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit("input", value);
  }
});
const c_show = computed({
  get() {
    return props.show;
  },
  set(value) {
    emit("update:show", value);
    if (!value) {
      emit("close");
    }
  }
});
const onFlyTo = (geometry) => {
  callMap((map) => {
    fitBounds(map, geometry);
  });
};
</script>
<style scoped>
.setting-container {
  padding: 8px;
  color: #fff;
}
.field-container {
  padding: 12px;
}
</style>
