<template>
  <ModuleContainer v-bind="$attrs">
    <template #btn>
      <div
        class="button-container mouse-coordinates-container"
        :class="{
          'mouse-coordinates-container-mobile': isMobile
        }"
      >
        <div class="mouse-coordinates">
          <div
            class="mouse-coordinates-zoom flex-grow-0 d-flex pr-2"
            v-if="!isMobile"
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
          <div class="mouse-coordinates-point">
            <div
              style="margin-left: 4px"
              class="selectable"
              v-html="currentPoint"
              :style="{ 'min-width': isDMS && isCrsDegree ? '220px' : '100px' }"
            >
            </div>
            <i
              v-if="isCrsDegree"
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
        <div class="zoom-coordinates" v-if="isMobile">
          <span title="Current Zoom">
            <SvgIcon :size="14" type="mdi" :path="path.zoom" v-if="!zoomIcon" />
            <i :class="[zoomIcon]" v-else title="Current Zoom" />
          </span>
          <div style="margin-left: 4px">{{ currentZoom }}</div>
        </div>
        <div class="crs-coordinates">
          <select v-model="crs" class="crs-select" style="width: 70px">
            <option
              :value="item.epsg"
              :key="item.epsg"
              v-for="item in crsItems"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
        <div ref="scale" class="scale-custom"> </div>
      </div>
    </template>
  </ModuleContainer>
</template>

<script>
import { mdiCached, mdiMapMarkerOutline, mdiMagnify } from "@mdi/js";
import ModuleMixin from "@/components/Map/mixins/ModuleMixin";

import { debounce } from "@utils";
import { getCrsItems, getCrs, setCrs } from "@/store/store-crs";

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
    },
    isMobile() {
      return this.$map.isMobile;
    },
    crsItems() {
      return getCrsItems(this.c_mapId);
    },
    crs: {
      get() {
        return this.p_crs;
      },
      set(value) {
        this.p_crs = value;
        this.crsItem = this.crsItems.find((x) => x.epsg == value);
        return setCrs(this.c_mapId, value);
      }
    },
    isCrsDegree() {
      return this.crsItem.unit === "degree";
    }
  },
  data() {
    return {
      lngLat: { latitude: 0, longitude: 0 },
      currentZoom: 0,
      currentPoint: undefined,
      isDMS: true,
      p_crs: "",
      crsItem: {}
    };
  },

  methods: {
    changeDisplayTypePixelValue() {
      this.isDMS = !this.isDMS;
      this.changePixelValue();
    },
    changePixelValue() {
      let point = this.formatCoordinate(this.lngLat, this.isDMS);
      this.currentPoint = point.longitude + ", &nbsp;" + point.latitude;
    },

    onInit() {
      this.p_crs = getCrs(this.c_mapId);
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
      if (this.isMobile) {
        let center = this.map.getCenter();
        this.lngLat.latitude = center.lat;
        this.lngLat.longitude = center.lng;
        this.changePixelValue();
      }
    },
    onMouseMove: debounce(function (e) {
      if (this.isMobile) return;
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

    removeMarker() {
      if (!this.marker) return;

      this.marker.remove();
    },

    changeCursor(cursor) {
      this.map.getCanvas().style.cursor = cursor;
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
.mouse-coordinates,
.scale-custom,
.zoom-coordinates,
.crs-coordinates {
  background-color: hsla(0, 0%, 100%, 0.7529411764705882);
  border-radius: 4px;
  min-width: 75px;
  font-size: 14px;
  color: #333;
  padding: 4px;
}
.mouse-coordinates > div:not(:last-child) {
  border-right: 1px solid #7c7c7c;
  padding-right: 4px;
}
.mouse-coordinates > div:not(:first-child) {
  padding-left: 4px;
}
.icon-clickable {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-left: 8px;
}

.icon-clickable:hover,
.icon-clickable:focus {
  filter: brightness(1.1);
}

.icon-clickable:active {
  filter: brightness(0.8);
}
.mouse-coordinates-point > div {
  text-align: center;
}
</style>
