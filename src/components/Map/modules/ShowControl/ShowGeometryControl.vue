<template>
  <ModuleContainer v-bind="bindModule">
    <slot />
  </ModuleContainer>
</template>

<script>
import ModuleMixin from "@/components/Map/mixins/ModuleMixin";
import { createLayer, removeLayer } from "@/store/store-datasource";
import { toggleShow } from "@/helper/datastore";
import bbox from "@turf/bbox";
import { fitBounds } from "@/helper";
import { LayerBuild } from "@/model";

export default {
  components: {},
  mixins: [ModuleMixin],
  props: {
    value: { type: Object },
    color: { type: String, default: "#004e98" },
    hide: Boolean,
    disableFillBound: Boolean,
    padding: { default: () => ({ top: 50, bottom: 50, left: 450, right: 50 }) }
  },
  data: () => ({
    sourceId: undefined,
    layerId: undefined,
    layer_view: null
  }),
  watch: {
    hide: {
      handler(value) {
        if (this.layer_view) {
          this.layer_view.show = value;
          toggleShow(this.layer_view);
        }
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
        if (!this.c_mapId) return;
        this.callMap((map) => {
          let layerId = `${this.layerId}-areas-fill`;
          if (map.getLayer(layerId)) {
            map.setPaintProperty(layerId, "fill-color", value);
          }
          layerId = `${this.layerId}-areas-outline`;
          if (map.getLayer(layerId)) {
            map.setPaintProperty(layerId, "line-color", value);
          }
          layerId = `${this.layerId}-points`;
          if (map.getLayer(layerId)) {
            map.setPaintProperty(layerId, "circle-color", value);
          }
          layerId = `${this.layerId}-lines`;
          if (map.getLayer(layerId)) {
            map.setPaintProperty(layerId, "line-color", value);
          }
        });
      }
    }
  },
  methods: {
    initValue(value) {
      if (value) {
        this.redrawdrawGeoJSON(value);

        if (!this.disableFillBound) {
          fitBounds(value);
        }
      } else {
        this.redrawdrawGeoJSON([]);
      }
    },
    onInit() {
      this.layerId = `draw-controll-layer-${this._uid}`;
      this.sourceId = `draw-controll-source-${this._uid}`;
      this.metadata = { loading: false };
      let layer = new LayerBuild();
      layer.disableDelete();
      layer.disableOpacity();
      layer.setSource({
        id: this.sourceId,
        data: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: []
          }
        }
      });
      layer.setLayers([
        {
          id: `${this.layerId}-areas-fill`,
          type: "fill", // For fill
          source: this.sourceId,
          filter: ["==", "$type", "Polygon"],
          paint: {
            "fill-color": this.color,
            "fill-opacity": 0.3
          }
        },
        {
          id: `${this.layerId}-areas-outline`,
          type: "line", // For outline
          source: this.sourceId,
          filter: ["==", "$type", "Polygon"],
          paint: {
            "line-color": this.color,
            "line-width": 2
          }
        },
        {
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
        },
        {
          id: `${this.layerId}-lines`,
          type: "line",
          source: this.sourceId,
          filter: ["==", "$type", "LineString"],
          paint: {
            "line-color": this.color,
            "line-width": 2
          }
        }
      ]);
      layer.setMetadata(this.metadata);
      layer.setInfo({
        name: "Geojson show",
        menus: []
      });
      this.layer_view = createLayer(this.c_mapId, layer.build());

      if (this.value) {
        this.initValue(this.value);
      }
    },
    onDestroy() {
      if (this.layer_view) {
        removeLayer(this.c_mapId, this.layer_view);
      }
    },
    redrawdrawGeoJSON(value) {
      if (!this.c_mapId) return;
      if (this.metadata) {
        this.metadata.bounds = bbox(value);
      }

      this.callMap((map) => {
        const source = map.getSource(this.sourceId);
        if (source) {
          source.setData(value);
        }
      });
    }
  }
};
</script>
