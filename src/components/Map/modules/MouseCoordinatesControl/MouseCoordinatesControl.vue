<template>
  <ModuleContainer v-bind="bindModule">
    <template #btn>
      <div
        class="button-container d-flex mapboxgl-ctrl-mouse-coordinates-container"
      >
        <div class="mapboxgl-ctrl-mouse-coordinates">
          <div
            class="mapboxgl-ctrl-mouse-coordinates-zoom flex-grow-0 d-flex pr-2"
          >
            <span title="Current Zoom">
              <SvgIcon
                :size="14"
                type="mdi"
                :path="path.zoom"
                v-if="!zoomIcon"
              />
              <i :class="[zoomIcon]" v-else title="Current Zoom" />
            </span>
            <div style="margin-left: 4px">{{ currentZoom }}</div>
          </div>
          <div class="mapboxgl-ctrl-mouse-coordinates-point">
            <span title="Add Marker" @click="onAddMarker">
              <SvgIcon :size="14" type="mdi" :path="path.icon" v-if="!icon" />
              <i class="icon-clickable" :class="icon" v-else />
            </span>

            <div
              style="margin-left: 4px"
              class="selectable"
              v-html="currentPoint"
              :style="{ 'min-width': isDMS ? '210px' : '100px' }"
            >
            </div>
            <i
              :title="
                isDMS
                  ? 'DMS <=> Latitude, Longitude'
                  : 'Latitude, Longitude <=> DMS'
              "
              style="margin-left: 4px"
              @click="changeDisplayTypePixelValue"
              class="icon-clickable"
            >
              <SvgIcon :size="14" type="mdi" :path="path.change" />
            </i>
          </div>
        </div>

        <div ref="scale" class="mapboxgl-ctrl-scale-custom"> </div>
      </div>
    </template>
  </ModuleContainer>
</template>

<script>
import { mdiCached, mdiMapMarkerOutline, mdiMagnify } from "@mdi/js";
import mapboxgl from "mapbox-gl";
import ModuleMixin from "@/components/Map/mixins/ModuleMixin";

import { deg_to_dms_string, latDMS, lngDMS } from "@utils/CRS";
import { debounce } from "@utils";

const defaultOptions = {
  unit: "metric"
};
export default {
  mixins: [ModuleMixin],

  props: {
    icon: {
      type: String,
      default: ""
    },

    zoomIcon: {
      type: String,
      default: ""
    }
  },

  computed: {
    path() {
      return { icon: mdiMapMarkerOutline, zoom: mdiMagnify, change: mdiCached };
    }
  },
  data() {
    return {
      lngLat: { latitude: 0, longitude: 0 },
      currentZoom: 0,
      currentPoint: undefined,
      isDMS: true
    };
  },

  methods: {
    changeDisplayTypePixelValue() {
      this.isDMS = !this.isDMS;
      this.changePixelValue();
    },
    changePixelValue() {
      if (this.isDMS)
        this.currentPoint =
          latDMS(+this.lngLat.latitude.toFixed(4)) +
          ", &nbsp;" +
          lngDMS(+this.lngLat.longitude.toFixed(4));
      else
        this.currentPoint =
          this.lngLat.latitude.toFixed(4) +
          ",&nbsp;&nbsp;" +
          this.lngLat.longitude.toFixed(4);
    },

    onInit() {
      this.bindedOnMouseMove = this.onMouseMove.bind(this);
      this.bindedOnZoomEnd = this.onZoomEnd.bind(this);
      this.bindedOnMapMove = this.onMapMove.bind(this);

      this.map.on("move", this.bindedOnMapMove);
      this.map.on("mousemove", this.bindedOnMouseMove);
      this.map.on("zoomend", this.bindedOnZoomEnd);

      this.options = Object.assign({}, defaultOptions);
      this.currentZoom = this.map.getZoom().toFixed(2);

      let center = this.map.getCenter();
      this.lngLat.latitude = center.lat;
      this.lngLat.longitude = center.lng;
      this.changePixelValue();
      this.$nextTick(() => {
        updateScale(this.map, this.$refs.scale, this.options);
      });
    },
    onDestroy() {
      this.map.off("zoomend", this.bindedOnZoomEnd);
      this.map.off("mousemove", this.bindedOnMouseMove);
      this.map.off("move", this.bindedOnMapMove);
    },
    onMapMove() {
      updateScale(this.map, this.$refs.scale, this.options);
    },
    onMouseMove: debounce(function (e) {
      // this.lngLat.latitude = e.lngLat.lat.toFixed(4)
      // this.lngLat.longitude = e.lngLat.lng.toFixed(4)
      let point = [e.lngLat.lng, e.lngLat.lat];
      this.lngLat.latitude = point[1];
      this.lngLat.longitude = point[0];
      this.changePixelValue();
    }, 15),

    onZoomEnd() {
      this.currentZoom = this.map.getZoom().toFixed(2);
    },

    addMarker(lngLat) {
      const text = window.document.createElement("div");
      text.className = "selectable";
      text.innerText = `${deg_to_dms_string(
        lngLat.lng.toFixed(8)
      )}, ${deg_to_dms_string(lngLat.lat.toFixed(8))}`;

      const removeMarkerButton = window.document.createElement("i");
      removeMarkerButton.className = "mdi mdi-delete";
      removeMarkerButton.title = "Remove Marker";
      removeMarkerButton.style.marginLeft = "4px";
      removeMarkerButton.style.cursor = "pointer";
      removeMarkerButton.style.fontSize = "14px";
      removeMarkerButton.style.width = "14px";
      removeMarkerButton.style.height = "14px";
      removeMarkerButton.style.lineHeight = "14px";
      removeMarkerButton.addEventListener("click", () => {
        this.removeMarker();
      });

      const container = window.document.createElement("div");
      container.style.display = "flex";
      container.style.alignItems = "center";

      container.append(text, removeMarkerButton);

      const popup = new mapboxgl.Popup({
        closeButton: false
      }).setDOMContent(container);

      this.marker = new mapboxgl.Marker()
        .setLngLat(lngLat)
        .setPopup(popup)
        .addTo(this.map);

      this.marker.getElement().style.cursor = "pointer";

      this.marker.togglePopup();
    },

    removeMarker() {
      if (!this.marker) return;

      this.marker.remove();
    },

    onMapClick(e) {
      this.addMarker(e.lngLat);
      this.changeCursor("");
    },

    changeCursor(cursor) {
      this.map.getCanvas().style.cursor = cursor;
    },
    onAddMarker() {
      this.removeMarker();

      this.changeCursor("crosshair");

      this.map.once("click", this.onMapClick.bind(this));
    }
  }
};

function updateScale(map, container, options) {
  // A horizontal scale is imagined to be present at center of the map
  // container with maximum length (Default) as 100px.
  // Using spherical law of cosines approximation, the real distance is
  // found between the two coordinates.
  const maxWidth = (options && options.maxWidth) || 100;

  const y = map._container.clientHeight / 2;
  const left = map.unproject([0, y]);
  const right = map.unproject([maxWidth, y]);
  const maxMeters = left.distanceTo(right);
  // The real distance corresponding to 100px scale length is rounded off to
  // near pretty number and the scale length for the same is found out.
  // Default unit of the scale is based on User's locale.
  if (options && options.unit === "imperial") {
    const maxFeet = 3.2808 * maxMeters;
    if (maxFeet > 5280) {
      const maxMiles = maxFeet / 5280;
      setScale(container, maxMiles, map._getUIString("ScaleControl.Miles"));
    } else {
      setScale(container, maxFeet, map._getUIString("ScaleControl.Feet"));
    }
  } else if (options && options.unit === "nautical") {
    const maxNauticals = maxMeters / 1852;
    setScale(
      container,
      maxNauticals,
      map._getUIString("ScaleControl.NauticalMiles")
    );
  } else if (maxMeters >= 1000) {
    setScale(
      container,
      maxMeters / 1000,
      map._getUIString("ScaleControl.Kilometers")
    );
  } else {
    setScale(container, maxMeters, map._getUIString("ScaleControl.Meters"));
  }
}

function setScale(container, maxDistance, unit) {
  const distance = getRoundNum(maxDistance);
  if (container) container.innerHTML = `${distance}&nbsp;${unit}`;
}

function getDecimalRoundNum(d) {
  const multiplier = Math.pow(10, Math.ceil(-Math.log(d) / Math.LN10));
  return Math.round(d * multiplier) / multiplier;
}

function getRoundNum(num) {
  const pow10 = Math.pow(10, `${Math.floor(num)}`.length - 1);
  let d = num / pow10;

  d =
    d >= 10
      ? 10
      : d >= 5
      ? 5
      : d >= 3
      ? 3
      : d >= 2
      ? 2
      : d >= 1
      ? 1
      : getDecimalRoundNum(d);

  return pow10 * d;
}
</script>

<style scoped>
.mapboxgl-ctrl-scale-custom {
  background-color: hsla(0, 0%, 100%, 0.7529411764705882);
  border-radius: 4px;
  min-width: 100px;
  font-size: 14px;
  color: #333;
  padding: 4px;
}
.mapboxgl-ctrl-mouse-coordinates {
  background-color: hsla(0, 0%, 100%, 0.7529411764705882);
  border-radius: 4px;
  min-width: 160px;
  font-size: 14px;
  color: #333;
  padding: 4px;
}
.mapboxgl-ctrl-mouse-coordinates > div:not(:last-child) {
  border-right: 1px solid #7c7c7c;
  padding-right: 4px;
}
.mapboxgl-ctrl-mouse-coordinates > div:not(:first-child) {
  padding-left: 4px;
}
.icon-clickable {
  cursor: pointer;
}

.icon-clickable:hover,
.icon-clickable:focus {
  filter: brightness(1.1);
}

.icon-clickable:active {
  filter: brightness(0.8);
}
</style>
