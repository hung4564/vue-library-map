<template>
  <ModuleContainer v-bind="bindModule">
    <template #btn>
      <MapControlButton
        @click="onGoHome"
        :tooltip="$map.trans('map.home.title')"
      >
        <SvgIcon :size="18" type="mdi" :path="path.home" />
      </MapControlButton>
    </template>
    <slot />
  </ModuleContainer>
</template>

<script>
import { mdiHome } from "@mdi/js";
import ModuleMixin from "@/components/Map/mixins/ModuleMixin";
import MapControlButton from "@/components/Map/control/MapControlButton.vue";

export default {
  components: { MapControlButton },
  mixins: [ModuleMixin],

  data() {
    return {
      center: {
        lat: 0,
        lng: 0
      },
      zoom: 0
    };
  },
  computed: {
    path() {
      return { home: mdiHome };
    }
  },

  methods: {
    onGoHome() {
      this.map.setCenter(this.center);
      this.map.setZoom(this.zoom);
    },
    onInit() {
      this.center = this.map.getCenter();
      this.zoom = this.map.getZoom();
    }
  }
};
</script>
