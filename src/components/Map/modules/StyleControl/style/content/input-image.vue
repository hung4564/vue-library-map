<script setup lang="ts">
import { IconItem } from "@/interface/image";
import { getImages } from "@/store/store-image";
import { computed, defineProps, defineEmits } from "vue";
import MapImage from "@components/MapImage.vue";
import { inputText } from "@/components/input";
const props = defineProps({
  value: {
    required: true
  },
  mapId: {
    type: String,
    required: true
  }
});
const emit = defineEmits(["input", "change"]);
const form = computed({
  get() {
    return props.value;
  },
  set(value) {
    if (!value) {
      value = undefined;
    }
    emit("input", value);
    emit("change", value);
  }
});
const images_convert = computed(() => getImages(props.mapId));
function onToggleImage(image: IconItem) {
  if (form.value == image.id) {
    form.value = undefined;
  } else {
    form.value = image.id;
  }
}
</script>
<template lang="">
  <div class="image-select-container">
    <div class="image-select__input">
      <inputText :value="form" @change="form = $event" />
    </div>
    <div class="fill-canvas full-height overflow-auto pa-1">
      <div v-for="category in images_convert" :key="category.id">
        <div class="item-icon__group">
          {{ category.name }}
        </div>
        <div class="item-icon__container">
          <button
            class="item-icon"
            v-for="item in category.children"
            :key="item.id"
            :class="{ 'item-icon-active': item.id === value }"
            @click="onToggleImage(item)"
          >
            <map-image :src="item.path"> </map-image>
            <div
              :style="{
                'background-image': `url(${item.path})`
              }"
            ></div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-select-container {
  display: flex;
  flex-direction: column;
}
.image-select__input {
  padding: 4px 0;
  width: 100%;
}

.item-icon__group {
  padding: 4px;
}
.item-icon__container {
  display: flex;
  flex-wrap: wrap;
}
.item-icon {
  background: transparent;
  width: calc(20% - 8px);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  border: 2px solid transparent;
  padding: 2px;
  margin: 4px;
}
.item-icon div {
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
}
.item-icon-active {
  border-color: var(--v-primary-base, #1a73e8);
}
</style>
