<template>
  <ModuleContainer>
    <template v-if="loaded">
      <Layer
        v-for="layer in c_layers"
        :key="layer.id"
        v-bind="getBindLayer(layer)"
        v-on="getEventLayer(layer)"
      />
    </template>
  </ModuleContainer>
</template>
<script>
import ModuleMixin from "@/components/Map/mixins/ModuleMixin";
import Layer from "@/components/Map/control/Layer.vue";
export default {
  components: { Layer },
  props: {
    value: { type: Array, required: true },
    layers: { type: Array, required: true }
  },
  mixins: [ModuleMixin],
  data: () => ({
    sourceId: undefined,
    layerId: undefined,
    showGeoJSON: {
      type: "FeatureCollection",
      features: []
    }
  }),
  computed: {
    c_layers() {
      return this.layers.map((x, i) => ({
        id: this.layerId + "-" + i,
        source: this.sourceId,
        ...x
      }));
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        value = value || [];
        this.showGeoJSON.features = value;
        this.redraw();
      }
    }
  },
  methods: {
    getBindLayer(layer) {
      let bind = { layer };
      return bind;
    },
    getEventLayer(layer) {
      let bind = {};
      if (layer.onClick) {
        bind["click"] = layer.onClick;
      }
      return bind;
    },
    onInit() {
      this.layerId = `show-controll-layer-${this._uid}`;
      this.sourceId = `show-controll-source-${this._uid}`;
      this.map.addSource(this.sourceId, {
        type: "geojson",
        data: this.showGeoJSON
      });
    },
    onDestroy() {
      this.removeLayer(this.layerId);
      this.removeSource(this.sourceId);
    },
    redraw() {
      this.actionAfterMapLoaded(() => {
        const source = this.map.getSource(this.sourceId);
        if (source) {
          source.setData(this.showGeoJSON);
        }
      });
    }
  }
};
</script>
