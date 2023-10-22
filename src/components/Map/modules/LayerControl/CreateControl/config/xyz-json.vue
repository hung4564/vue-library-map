<template>
  <div class="map-row">
    <slot></slot>

    <div class="map-col-12">
      <input-text
        v-model="form.url"
        :label="$map.trans('map.layer-control.field.url')"
      />
    </div>
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
<style></style>
