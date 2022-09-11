<template>
  <ModuleContainer>
    <slot />
  </ModuleContainer>
</template>

<script>
import ModuleMixin from "../mixins/ModuleMixin";

export default {
  mixins: [ModuleMixin],

  props: {
    /**
     * Mapbox Layer:
     * https://docs.mapbox.com/mapbox-gl-js/api/map/#addlayer-parameters
     *
     * @typedef {object} Layer
     * @property {string} id
     * @property {string} type
     * @property {string | object} [source] https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/
     * @property {string} [sourceLayer]
     * @property {any[]} [filter]
     * @property {object} [paint]
     * @property {object} [layout]
     * @property {number} [maxzoom]
     * @property {number} [minzoom]
     * @property {object} [metadata]
     * @property {string} [renderingMode]
     */
    layer: {
      type: Object,
      default: undefined
    },

    beforeId: {
      type: String,
      default: undefined
    },

    popupOptions: {
      type: Object,
      default: () => ({ maxWidth: "none" }) // "none" for fitting content
    }
  },

  data() {
    return {
      mapboxLayer: null
    };
  },

  watch: {
    layer(newLayer, oldLayer) {
      this.removeComponentLayer(oldLayer);
      this.addComponentLayer(newLayer);
    },
    beforeId: {
      handler(value) {
        if (!value) return;
        if (!this.map) return;
        if (!this.map.getLayer(this.layer.id) || !this.map.getLayer(value))
          return;
        this.map.moveLayer(this.layer.id, value);
      }
    },

    "layer.source": {
      deep: true,
      handler() {
        this.onLayerDataChanged();
      }
    },

    "layer.minzoom": {
      handler() {
        this.onZoomChange();
      }
    },

    "layer.maxzoom": {
      handler() {
        this.onZoomChange();
      }
    },

    "layer.paint": {
      deep: true,
      handler() {
        this.onLayerPaintChanged();
      }
    },

    "layer.layout": {
      deep: true,
      handler() {
        this.onLayerLayoutChanged();
      }
    }
  },
  computed: {},
  methods: {
    onInit() {
      this.addComponentLayer(this.layer, this.beforeId);
    },

    onMouseLeaveLayer() {
      this.map.getCanvas().style.cursor = "";
    },

    onDestroy() {
      this.removeComponentLayer(this.layer);
    },

    addComponentLayer(layer, beforeId) {
      if (!layer) return;

      this.addLayer(layer, beforeId);
    },

    removeComponentLayer(layer) {
      if (!layer) return;

      this.removeLayer(layer.id);
    },

    parseJSON(data) {
      try {
        if (data instanceof Object) return data;

        return JSON.parse(data);
      } catch (e) {
        return undefined;
      }
    },

    onLayerDataChanged() {
      if (!this.map || !this.layer) return;

      if (
        this.layer.source instanceof Object &&
        this.layer.source.type === "geojson"
      ) {
        const source = this.map.getSource(this.layer.id);

        if (!source) return;

        source.setData(this.layer.source.data);
      }
    },
    onZoomChange() {
      if (!this.map || !this.layer) return;
      const layer = this.map.getLayer(this.layer.id);

      if (!layer) return;

      this.map.setLayerZoomRange(
        this.layer.id,
        this.layer.minzoom || 0,
        this.layer.maxzoom || 0
      );
    },
    onLayerPaintChanged() {
      if (!this.map || !this.layer) return;

      for (const key in this.layer.paint) {
        const layer = this.map.getLayer(this.layer.id);

        if (!layer) continue;

        this.map.setPaintProperty(this.layer.id, key, this.layer.paint[key]);
      }
    },

    onLayerLayoutChanged() {
      if (!this.map || !this.layer) return;

      for (const key in this.layer.layout) {
        const layer = this.map.getLayer(this.layer.id);

        if (!layer) continue;

        this.map.setLayoutProperty(this.layer.id, key, this.layer.layout[key]);
      }
    }
  }
};
</script>
