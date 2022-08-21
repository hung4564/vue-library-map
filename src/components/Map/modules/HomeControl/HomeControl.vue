<template>
  <ModuleContainer v-bind="bindModule">
    <template #btn>
      <MapControlButton icon="mdi-home" @click="onGoHome" />
    </template>
    <slot />
  </ModuleContainer>
</template>

<script>
//import mapboxgl from '@plugins/mapbox-gl'
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
