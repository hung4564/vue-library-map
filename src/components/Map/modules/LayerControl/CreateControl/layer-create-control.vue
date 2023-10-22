<script>
export default {
  name: "create-layer-control"
};
</script>

<script setup>
import { DraggablePopup } from "@hungpv97/vue-library-draggable";
import ModuleContainer from "@components/Map/ModuleContainer.vue";
import { useMap } from "@components/Map/mixins/useMap";
import { inputText, inputSelect } from "@/components/input";
import baseButton from "@/components/base/base-button.vue";
import { defineProps, defineEmits, computed, ref, onMounted } from "vue";
import { addLayer } from "@/store/store-datasource";
import { LayerHelper, LAYER_TYPES } from "./helper";
import { ConfigNo } from "./config";
const props = defineProps({
  show: Boolean
});
const emit = defineEmits(["update:show"]);
const c_show = computed({
  get() {
    return props.show;
  },
  set(value) {
    emit("update:show", value);
  }
});
const { $map, callMap } = useMap();
const initialState = {
  type: "geojson"
};
const key_render = ref(1);
const component_config = ref(ConfigNo);
const helper = new LayerHelper(initialState.type);
const form = ref({
  ...initialState,
  config: { name: "", ...helper.default_value }
});
const items_type = Object.keys(LAYER_TYPES).map((x) => ({
  value: x,
  text: LAYER_TYPES[x]
}));
function onChangeType(type) {
  helper.setType(type);
  component_config.value = helper.component;
  form.value = {
    config: {
      name: form.value.config.name,
      ...helper.default_value
    },
    type: form.value.type
  };
}
function onAddLayer(form) {
  const handle = helper.create;
  if (!handle) {
    return;
  }
  if (!helper.validate(form.config)) {
    return;
  }
  let layer = handle(form.config);
  callMap((map) => {
    addLayer(map.id, layer);
  });
  reset();
}
function reset() {
  helper.setType(initialState.type);
  form.value = {
    ...initialState,
    config: { name: "", ...helper.default_value }
  };
  key_render.value++;
}
function close() {
  reset();
}
onMounted(() => {
  onChangeType(form.value.type);
});
</script>
<template>
  <ModuleContainer>
    <template #draggable="props">
      <DraggablePopup
        :show.sync="c_show"
        v-bind="props"
        :width="400"
        :height="300"
        @close="close"
        :title="$map.trans('map.layer-control.create.title')"
      >
        <div class="create-control-container">
          <div class="form-container">
            <component
              :is="component_config"
              v-model="form.config"
              class="create-control-form"
              :key="key_render"
            >
              <div class="map-col-12">
                <input-text
                  v-model="form.config.name"
                  :label="$map.trans('map.layer-control.field.name')"
                />
              </div>
              <div class="map-col-12">
                <input-select
                  v-model="form.type"
                  :items="items_type"
                  @input="onChangeType"
                  :label="$map.trans('map.layer-control.field.type')"
                />
              </div>
            </component>
          </div>

          <base-button @click="onAddLayer(form)" class="btn-container">
            {{ $map.trans("map.layer-control.create-btn") }}
          </base-button>
        </div>
      </DraggablePopup>
    </template>
  </ModuleContainer>
</template>
<style scoped>
.create-control-container {
  padding: 8px 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.create-control-form {
  flex-grow: 1;
  overflow: auto;
}

.create-control-container .form-container {
  overflow: auto;
  height: 100%;
  padding: 8px;
}
.create-control-container .btn-container {
  padding: 8px;
}
</style>
