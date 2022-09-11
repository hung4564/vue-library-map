<template>
  <ModuleContainer v-bind="bindModule">
    <slot />
  </ModuleContainer>
</template>

<script>
import ModuleMixin from "@/components/Map/mixins/ModuleMixin";
import { bbox } from "@turf/turf";
export default {
  components: {},
  mixins: [ModuleMixin],
  props: {
    value: { type: Object },
    color: { type: String, default: "#DA251D" },
    hide: Boolean,
    disableFillBound: Boolean,
    padding: { default: () => ({ top: 50, bottom: 50, left: 450, right: 50 }) }
  },
  data: () => ({
    sourceId: undefined,
    layerId: undefined,
    drawGeoJSON: {
      type: "FeatureCollection",
      features: []
    }
  }),
  watch: {
    hide: {
      handler(value) {
        this.actionAfterMapLoaded(() => {
          let arraylayer = [
            `${this.layerId}-areas-outline`,
            `${this.layerId}-points`,
            `${this.layerId}-areas-fill`,
            `${this.layerId}-layer`,
            `${this.layerId}-lines`
          ];
          arraylayer.forEach((key) => {
            if (this.map.getLayer(key)) {
              this.map.setLayoutProperty(
                key,
                "visibility",
                value ? "none" : "visible"
              );
            }
          });
        });
      },
      immediate: true
    },
    value: {
      handler: "initValue",
      immediate: true,
      deep: true
    },
    color: {
      handler(value) {
        if (!value) return;
        if (!this.map) return;
        let layerId = `${this.layerId}-areas-fill`;
        if (this.map.getLayer(layerId)) {
          this.map.setPaintProperty(layerId, "fill-color", value);
        }
        layerId = `${this.layerId}-areas-outline`;
        if (this.map.getLayer(layerId)) {
          this.map.setPaintProperty(layerId, "line-color", value);
        }
        layerId = `${this.layerId}-points`;
        if (this.map.getLayer(layerId)) {
          this.map.setPaintProperty(layerId, "circle-color", value);
        }
        layerId = `${this.layerId}-lines`;
        if (this.map.getLayer(layerId)) {
          this.map.setPaintProperty(layerId, "line-color", value);
        }
      }
    }
  },
  methods: {
    fitBounds(value) {
      if (this.disableFillBound) return;
      if (!value || !value.type) return;
      let bboxFil = undefined;
      if (["Feature", "FeatureCollection"].includes(value.type)) {
        bboxFil = bbox(value);
      } else {
        bboxFil = bbox({
          type: "Feature",
          properties: {},
          geometry: value
        });
      }

      if (bboxFil && this.map)
        this.map.fitBounds(bboxFil, {
          padding: this.padding,
          duration: 0
        });
    },
    initValue(value) {
      if (value) {
        this.redrawdrawGeoJSON([
          {
            type: "Feature",
            geometry: value
          }
        ]);

        this.fitBounds(value);
      } else {
        this.redrawdrawGeoJSON([]);
      }
    },
    onInit() {
      this.layerId = `draw-controll-layer-${this._uid}`;
      this.sourceId = `draw-controll-source-${this._uid}`;
      this.map.addSource(this.sourceId, {
        type: "geojson",
        data: this.drawGeoJSON
      });

      this.addLayer({
        id: `${this.layerId}-areas-fill`,
        type: "fill", // For fill
        source: this.sourceId,
        filter: ["==", "$type", "Polygon"],
        paint: {
          "fill-color": this.color,
          "fill-opacity": 0.3
        }
      });

      this.addLayer({
        id: `${this.layerId}-areas-outline`,
        type: "line", // For outline
        source: this.sourceId,
        filter: ["==", "$type", "Polygon"],
        paint: {
          "line-color": this.color,
          "line-width": 2
        }
      });
      this.addLayer({
        id: `${this.layerId}-points`,
        type: "circle",
        source: this.sourceId,
        filter: ["==", "$type", "Point"],
        paint: {
          "circle-radius": 12,
          "circle-color": this.color,
          "circle-stroke-color": "black",
          "circle-stroke-width": 0.5
        }
      });
      this.addLayer({
        id: `${this.layerId}-lines`,
        type: "line",
        source: this.sourceId,
        filter: ["==", "$type", "LineString"],
        paint: {
          "line-color": this.color,
          "line-width": 2
        }
      });
      if (this.value) {
        this.initValue(this.value);
      }
    },
    onDestroy() {
      let arraylayer = [
        `${this.layerId}-areas-outline`,
        `${this.layerId}-points`,
        `${this.layerId}-areas-fill`,
        `${this.layerId}-layer`,
        `${this.layerId}-lines`
      ];
      arraylayer.forEach((key) => {
        if (this.map.getLayer(key)) {
          this.map.removeLayer(key);
        }
      });

      if (this.map.getSource(this.sourceId)) {
        this.map.removeSource(this.sourceId);
      }
    },
    redrawdrawGeoJSON(features = []) {
      if (!this.map) return;
      this.drawGeoJSON.features = features;
      const source = this.map.getSource(this.sourceId);
      if (source) {
        source.setData(this.drawGeoJSON);
      }
    }
  }
};
</script>
