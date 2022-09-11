<template>
  <ModuleContainer v-bind="bindModule">
    <template #btn>
      <div class="d-flex">
        <div v-if="helpText" class="tip-class button-container">
          {{ helpText }}
        </div>
        <MapControlGroupButton row v-if="!drawingMode">
          <MapControlButton
            :color="drawingMode == 'distance' ? 'primary' : null"
            :disabled="disabled"
            icon="mdi-ruler"
            :tooltip="trans('map.measurement.tools.distance')"
            @click="onMeasureDistance()"
          />
          <MapControlButton
            :color="drawingMode == 'area' ? 'primary' : null"
            :disabled="disabled"
            icon="mdi-ruler-square-compass"
            :tooltip="trans('map.measurement.tools.area')"
            @click="onMeasureArea()"
          />
          <MapControlButton
            v-if="geometry || markers.length > 0"
            :disabled="disabled"
            icon="mdi-delete"
            :tooltip="trans('actions.clear')"
            @click="onClear()"
          />
        </MapControlGroupButton>
        <MapControlGroupButton v-show="drawingMode" row>
          <MapControlButton
            :disabled="disabled"
            icon="mdi-content-save-outline"
            :tooltip="trans('actions.save')"
            @click="onCancel()"
          />
          <MapControlButton
            v-if="geometry || markers.length > 0"
            :disabled="disabled"
            icon="mdi-delete"
            :tooltip="trans('actions.clear')"
            @click="onClear()"
          />
          <MapControlButton
            v-else
            :disabled="disabled"
            icon="mdi-close"
            :tooltip="trans('actions.close')"
            @click="onClear()"
          />
        </MapControlGroupButton>
      </div>
    </template>
    <ShowGeometryControl color="#DA251D" disable-fill-bound :value="geometry">
      <ShowDataControl :layers="layerShows" :value="dataShow" />
    </ShowGeometryControl>

    <slot />
  </ModuleContainer>
</template>

<script>
/* eslint-disable no-unused-vars */
// import MapControlMenuButton from '@/components/Map/control/MapControlMenuButton.vue'
import MapControlButton from "@/components/Map/control/MapControlButton.vue";
import MapControlGroupButton from "@/components/Map/control/MapControlGroupButton.vue";
import ModuleMixin from "@/components/Map/mixins/ModuleMixin";
import ShowGeometryControl from "@/components/Map/modules/ShowControl/ShowGeometryControl.vue";
import ShowDataControl from "@/components/Map/modules/ShowControl/ShowDataControl.vue";
import {
  area,
  bearing,
  bearingToAzimuth,
  centroid,
  length,
  lineString,
  polygon
} from "@turf/turf";
import { formatNumber } from "@utils/Number";
import { Marker } from "mapbox-gl";
export default {
  components: {
    MapControlGroupButton,
    // MapControlMenuButton,
    MapControlButton,
    ShowGeometryControl,
    ShowDataControl
  },
  props: {
    disabled: Boolean,
    popUpPosition: {
      type: Object,
      default: () => ({
        top: 10,
        right: 49,
        width: "330px",
        height: "270px"
      })
    },
    color: { type: String, default: "#DA251D" }
  },
  mixins: [ModuleMixin],
  data: (vm) => ({
    geometry: null,
    drawingMode: undefined,

    layerShows: [
      {
        type: "circle",
        filter: ["==", "$type", "Point"],
        paint: {
          "circle-radius": 4,
          "circle-color": vm.color,
          "circle-stroke-color": "black",
          "circle-stroke-width": 0.5
        }
      },
      {
        type: "symbol",
        filter: ["==", "$type", "Point"],
        layout: {
          "text-field": "{text}",
          "text-font": ["Roboto Medium"],
          "text-offset": [0, 2],
          "text-size": 14,
          "text-allow-overlap": true
        },
        paint: {
          "text-color": "#000",
          "text-halo-blur": 1,
          "text-halo-color": "rgba(255,255,255,0.75)",
          "text-halo-width": 1
        }
      }
    ],
    dataShow: [],
    isShowSetting: false,
    coordinates: [],
    distanceUnits: ["meter", "kilometer"].map((x) => ({
      text: vm.trans("map.measurement.unit." + x),
      value: x
    })),

    areaUnits: ["square-meter", "hecta", "square-kilometer"].map((x) => ({
      text: vm.trans("map.measurement.unit." + x),
      value: x
    })),
    modelUnit: { distance: "kilometer", area: "square-kilometer" },

    helpText: ""
  }),
  created() {
    this.markers = [];
  },
  computed: {},
  watch: {
    modelUnit: {
      handler() {
        if (this.geometry) {
          this.updateLabels();
        }
      },
      deep: true
    }
  },

  methods: {
    onCancel() {
      this.map.getCanvas().classList.remove("cursor-crosshair");

      this.drawingMode = "";
      this.removeListenerMap("click", "map-" + this._uid);
      this.removeListenerMap("contextmenu", "map-" + this._uid);
      this.markers.forEach((marker) => {
        marker.setDraggable(false);
      });
      this.helpText = "";
    },
    onMapClick(event) {
      const newCoordinate = [event.lngLat.lng, event.lngLat.lat];
      const marker = this.bindMethodCreateMarker(
        newCoordinate,
        this.coordinates.length
      )
        .setLngLat(event.lngLat)
        .addTo(this.map);
      this.markers.push(marker);
      this.coordinates.push(newCoordinate);
      this.updateSource();
      this.updateLabels();
      marker.on("drag", () => {
        if (!this.drawingMode) return;
        const index = this.markers.indexOf(marker);
        const lngLat = marker.getLngLat();
        this.coordinates[index] = [lngLat.lng, lngLat.lat];
        this.updateSource();
        this.updateLabels();
      });
    },
    updateSource() {
      if (!this.drawingMode) {
        this.geometry = null;
        return;
      }
      let feature = this.bindMethodGetFeature(this.coordinates);
      this.geometry = feature ? feature.geometry : null;
    },
    updateLabels() {
      if (!this.bindMethodUpdateLabel) return;
      this.bindMethodUpdateLabel(this.coordinates);
    },
    async onInit() {},
    onDestroy() {
      this.onClear();
    },
    onMeasureDistance() {
      if (this.drawingMode == "distance") {
        this.onClear();
        return;
      }
      this.onStartMeasure("distance");
      this.bindMethodCreateMarker = (coordinate) =>
        getMarkerNode({ color: this.color });
      this.bindMethodGetFeature = (coordinates) =>
        coordinates.length > 1 ? lineString(coordinates) : null;
      this.bindMethodUpdateLabel = (coordinates) => {
        if (coordinates.length < 2) return;
        this.dataShow = coordinates.map((x, i, array) => {
          return {
            type: "Feature",
            properties: {
              text: this.formatDistanceText(
                i < 1 ? 0 : length(lineString(array.slice(0, i + 1)))
              )
            },
            geometry: { type: "Point", coordinates: x }
          };
        });
      };
    },
    onMeasureArea() {
      if (this.drawingMode == "area") {
        this.onClear();
        return;
      }
      this.onStartMeasure("area");
      this.bindMethodCreateMarker = (coordinate) =>
        getMarkerNode({ color: this.color });
      this.bindMethodGetFeature = (coordinates) => {
        return coordinates.length > 2
          ? polygon([[...coordinates, coordinates[0]]])
          : null;
      };
      this.bindMethodUpdateLabel = (coordinates) => {
        if (coordinates.length < 3) return;
        this.dataShow = [
          centroid(this.geometry, {
            properties: {
              text: this.formatAreaText(area(this.geometry))
            }
          })
        ];
      };
    },
    onStartMeasure(type) {
      this.onClear();
      this.map.getCanvas().classList.add("cursor-crosshair");
      this.addListenerMap(
        "click",
        "map-" + this._uid,
        this.onMapClick.bind(this)
      );

      this.addListenerMap(
        "contextmenu",
        "map-" + this._uid,
        this.onMapRightClick.bind(this)
      );
      this.helpText =
        "Nhấp chuột trái để chọn điểm trên bản đồ, chuột phải để dừng";
      this.drawingMode = type;
    },
    onMapRightClick(e) {
      e.originalEvent.preventDefault();
      e.originalEvent.stopPropagation();
      this.onCancel();
    },
    formatAreaText(value = 0) {
      switch (this.modelUnit.area) {
        case "square-meter":
          return `${formatNumber(value)} m²`;
        case "hecta":
          return `${formatNumber(value / 10000)} ha`;
        case "square-kilometer":
          return `${formatNumber(value / 1000000)} km²`;
        default:
          throw new Error("Not support unit " + this.modelUnit.area);
      }
    },
    formatDistanceText(value = 0) {
      switch (this.modelUnit.distance) {
        case "meter":
          return `${formatNumber(value * 1000)} m`;
        case "kilometer":
          return `${formatNumber(value)} km`;
        default:
          throw new Error("Not support unit " + this.modelUnit.distance);
      }
    },
    onClear() {
      this.onCancel();
      this.markers.forEach((m) => m.remove());
      this.geometry = null;
      this.bindMethodCreateMarker = null;
      this.bindMethodGetFeature = null;
      this.bindMethodUpdateLabel = null;
      this.markers = [];
      this.coordinates = [];
      this.dataShow = [];
      if (this.bindMethodClear) {
        this.bindMethodClear();
      }
      this.bindMethodClear = null;
    }
  }
};
function getMarkerNode({ color } = {}) {
  const node = document.createElement("div");
  node.style.width = "12px";
  node.style.height = "12px";
  node.style.borderRadius = "50%";
  node.style.background = "#fff";
  node.style.boxSizing = "border-box";
  node.style.border = `2px solid ${color}`;
  node.style.cursor = "pointer";
  return new Marker({
    element: node,
    draggable: true
  });
}
</script>

<style>
.tip-class {
  border: 1px #b6aeae solid;
  width: 250px;
  line-height: 30px;
  padding-left: 10px;
  background-color: #00000088;
  color: #fff;
  border-radius: 6px 6px 6px 0px;
  pointer-events: none;
}
.left-container {
  right: 60px;
}
.right-container {
  right: 60px;
}
.d-flex {
  display: flex;
}
</style>
