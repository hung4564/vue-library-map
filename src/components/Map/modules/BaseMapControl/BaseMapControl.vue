<template>
  <ModuleContainer v-bind="bindModule" :btnWidth="70">
    <template #btn>
      <MapControlButton v-if="current_baseMaps" :tooltip="title">
        <map-card
          class="clickable base-map-button__container"
          height="70px"
          width="70px"
          @click="onToggleList"
        >
          <div class="base-map-button__content">
            <map-image :src="current_baseMaps.thumbnail">
              <div class="base-map-button__title">
                <map-icon dark small>{{ controlIcon }}</map-icon>
                <div class="">
                  {{ title || trans("map.basemap.title") }}
                </div>
              </div>
            </map-image>
          </div>
        </map-card>
      </MapControlButton>

      <div v-else></div>
    </template>
    <template #draggable="props">
      <DraggablePopup
        v-if="show"
        v-bind="props"
        :height="70 * (Math.floor(c_baseMaps.length / 3) + 1) + 48 + 10"
        :show.sync="show"
        :is-resizable="false"
        :title="trans('map.basemap.setting')"
        :width="70 * 3 + 24"
      >
        <div class="base-map-control-setting">
          <div
            v-for="baseMap in c_baseMaps"
            :key="baseMap.id"
            class="clickable base-map-control-setting-item"
            :style="{ width: sizeBaseMap + 'px' }"
            :title="baseMap.title"
            @click="onClick(baseMap)"
          >
            <div
              :style="{
                width: sizeBaseMap - 34 + 'px',
                height: sizeBaseMap - 34 + 'px'
              }"
            >
              <img style="width: 100%; height: 100%" :src="baseMap.thumbnail" />
            </div>
            <div
              class="base-map-control-setting-item__title"
              :class="{
                'base-map-control-setting-item__active':
                  current_baseMaps && baseMap.id == current_baseMaps.id
              }"
              style="font-size: 14px"
            >
              {{ baseMap.title }}
            </div>
          </div>
        </div>
      </DraggablePopup>
    </template>
    <slot />
  </ModuleContainer>
</template>

<script>
import MapImage from "../../../MapImage.vue";
import MapIcon from "../../../MapIcon.vue";
import { DraggablePopup } from "@hungpv4564/vue-libary-draggable";
import ModuleMixin from "@/components/Map/mixins/ModuleMixin";
//import MapControlGroupButton from "@/components/Map/control/MapControlGroupButton.vue";
import MapControlButton from "@/components/Map/control/MapControlButton.vue";
import defaultbasemap from "./basemap";
import BaseMapMixin from "./BaseMapStore.mixins";
import MapCard from "../../../MapCard.vue";
export default {
  components: { MapControlButton, DraggablePopup, MapCard, MapImage, MapIcon },
  mixins: [ModuleMixin, BaseMapMixin],
  props: {
    baseMaps: {
      type: Array,
      default: () => defaultbasemap
    },
    title: {
      type: String,
      default: ""
    },
    defaultBaseMap: {
      type: String,
      default: "Open Street Map"
    },
    controlIcon: {
      type: String,
      default: "mdi mdi-layers-outline"
    }
  },
  data: () => ({ p_baseMaps: [], show: false }),
  watch: {
    baseMaps: {
      immediate: true,
      handler(value) {
        if (!value || value.length < 1) return;
        this.p_baseMaps = value;
      }
    },
    p_baseMaps: {
      immediate: true,
      handler(value) {
        if (!this.map || !value || value.length < 1) return;
        this.onInit();
      }
    },
    defaultBaseMap: {
      handler(value) {
        this.setDefaultValueForMap(value);
      },
      immediate: true
    }
  },
  computed: {
    sizeBaseMap() {
      return 70;
    }
  },
  methods: {
    onInit() {
      if (this.p_baseMaps.length > 0) {
        this.setBaseMaps(this.p_baseMaps);
      }
    },
    onToggleList() {
      this.show = !this.show;
    },
    onClick(item) {
      if (this.current_baseMaps && item.id === this.current_baseMaps.id) {
        return;
      }
      this.loadItem(item);
    }
  }
};
</script>
<style scoped>
.base-map-button__title {
  position: absolute;
  padding: 4px;
  bottom: 0;
  width: 100%;
  text-align: center;
  overflow: hidden;
  color: white;
  background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
}
.base-map-button__title > div {
  font-size: 0.6rem;
}
.base-map-button__content {
  padding: 2px;
}
.base-map-control-setting {
  display: flex;
  flex-wrap: wrap;
}
.base-map-control-setting-item {
  padding: 8px 4px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: unset;
}
.base-map-control-setting-item .map-card {
  box-shadow: unset;
}
.base-map-control-setting-item__title {
  font-size: 0.75rem !important;
  font-weight: 400;
  line-height: 1.25rem;
  letter-spacing: 0.0333333333em !important;
  font-family: "Roboto", sans-serif !important;

  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;

  width: 100%;
}
.base-map-control-setting-item__active {
  --v-primary-base: #1a73e8;
  color: var(--v-primary-base) !important;
  caret-color: var(--v-primary-base) !important;
}
</style>
