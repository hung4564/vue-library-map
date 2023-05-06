<template>
  <ModuleContainer v-bind="bindModule">
    <template #btn>
      <MapControlGroupButton>
        <MapControlButton
          v-if="showCompass"
          :title="$map.trans('map.action.navigation-control-reset-bearing')"
          @click="onResetBearing"
        >
          <svg
            height="22"
            :style="{ transform: transform }"
            viewBox="0 0 24 24"
            width="22"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fill-rule="evenodd">
              <path d="M0 0h24v24H0z"></path>
              <path d="M12 3l4 8H8z" fill="#f44336"></path>
              <path d="M12 21l-4-8h8z" fill="#9E9E9E"></path>
            </g>
          </svg>
        </MapControlButton>
        <MapControlButton
          v-if="showZoom"
          :title="$map.trans('map.action.navigation-control-zoom-in')"
          @click="onZoomIn"
        >
          <SvgIcon :size="18" type="mdi" :path="path.plus" />
        </MapControlButton>
        <MapControlButton
          v-if="showZoom"
          :title="$map.trans('map.action.navigation-control-zoom-out')"
          @click="onZoomOut"
        >
          <SvgIcon :size="18" type="mdi" :path="path.minus" />
        </MapControlButton>
      </MapControlGroupButton>
    </template>
    <slot />
  </ModuleContainer>
</template>

<script>
import { mdiPlus, mdiMinus } from "@mdi/js";
import ModuleMixin from "@/components/Map/mixins/ModuleMixin";
import MapControlButton from "@/components/Map/control/MapControlButton.vue";

import MapControlGroupButton from "@/components/Map/control/MapControlGroupButton.vue";
export default {
  components: { MapControlGroupButton, MapControlButton },
  mixins: [ModuleMixin],
  props: {
    showCompass: { type: Boolean, default: true },
    showZoom: { type: Boolean, default: true }
  },
  data: () => ({
    transform: "rotate(0deg)"
  }),
  computed: {
    path() {
      return {
        plus: mdiPlus,
        minus: mdiMinus
      };
    }
  },

  methods: {
    onInit() {
      this.syncRotate = this.syncRotate.bind(this);
      this.map.on("rotate", this.syncRotate);
    },
    onZoomIn(e) {
      this.map.zoomIn({}, { originalEvent: e });
    },
    onZoomOut(e) {
      this.map.zoomOut({}, { originalEvent: e });
    },
    onResetBearing() {
      this.map.easeTo({ bearing: 0, pitch: 0 });
    },
    syncRotate() {
      const angle = this.map.getBearing() * -1;
      this.transform = `rotate(${angle}deg)`;
    }
  }
};
</script>
