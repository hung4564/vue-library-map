<template>
  <div class="map-row">
    <slot></slot>
    <div class="map-col-12">
      <input-text
        v-model="form.url"
        :label="$map.trans('map.layer-control.field.url')"
      />
    </div>
    <div class="map-col-6">
      <input-text
        v-model="form.minzoom"
        :label="$map.trans('map.layer-control.field.minzoom')"
      />
    </div>
    <div class="map-col-6">
      <input-text
        v-model="form.maxzoom"
        :label="$map.trans('map.layer-control.field.maxzoom')"
      />
    </div>
    <template v-if="form.bounds">
      <div class="map-col-6">
        <input-text
          v-model="form.bounds[0]"
          :label="$map.trans('map.layer-control.field.bound.minx')"
        />
      </div>
      <div class="map-col-6">
        <input-text
          v-model="form.bounds[1]"
          :label="$map.trans('map.layer-control.field.bound.miny')"
        />
      </div>

      <div class="map-col-6">
        <input-text
          v-model="form.bounds[2]"
          :label="$map.trans('map.layer-control.field.bound.maxx')"
        />
      </div>
      <div class="map-col-6">
        <input-text
          v-model="form.bounds[3]"
          :label="$map.trans('map.layer-control.field.bound.maxy')"
        />
      </div>
    </template>
  </div>
</template>
<script setup>
import { useMap } from "@components/Map/mixins/useMap";
import { inputText } from "@/components/input";
import { computed, defineProps, defineEmits } from "vue";
const props = defineProps({
  value: {}
});

const emit = defineEmits(["input"]);
const form = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit("input", value);
  }
});
const { $map } = useMap();
</script>
