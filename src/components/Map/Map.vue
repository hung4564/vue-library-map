<template>
  <div v-if="!isSupport" class="">
    <div class="not-support-map">
      <p class="">
        Trình duyệt của bạn không hỗ trợ hiển thị bản đồ, vui lòng đổi trình
        duyệt hoặc cập nhật bản mới để xem.
      </p>
    </div>
  </div>
  <div v-else class="map-container">
    <div
      class="map-viewer"
      :class="{
        'sidebar-left-show': sidebar_count.left_count > 0,
        'sidebar-right-show': sidebar_count.right_count > 0
      }"
    >
      <div ref="mapContainer" class="map-content"> </div>
      <template v-if="!dragIdCustom">
        <div class="right-bottom-container" :id="rightBottomTo" />
        <div class="left-bottom-container" :id="leftBottomTo" />
        <div class="right-top-container" :id="rightTopTo" />
        <div class="left-top-container" :id="leftTopTo" />
        <draggable-container
          class="drag-container"
          @init-done="onDragInitDone"
          @show-count:side-bar="onChangeSidebar"
        >
          <div :id="draggableTo" />
        </draggable-container>
      </template>
      <slot v-if="loaded" />
    </div>
  </div>
</template>

<script>
const DEFAULTOPTION = {
  center: [105.19084739818732, 15.827971829957548],
  zoom: 5.297175623863693,
  maxZoom: 22
};
import { latDMS, lngDMS } from "./helper/coordinate";
import mapboxgl from "mapbox-gl";
import { DraggableContainer } from "@hungpv97/vue-library-draggable";
import { getGlyphs, getSprite } from "@constant";
import { getUUIDv4 } from "@utils";
import { setMap, removeMap, setSideBarCount } from "@/store/store-map";
import { LangMixin } from "@/mixins/lang.mixins";
export default {
  components: { DraggableContainer },
  props: {
    mapboxAccessToken: {
      type: String,
      default: ""
    },
    initOptions: {
      type: Object,
      default: () => ({
        attributionControl: false,
        zoomControl: false
      })
    },
    dragIdCustom: { type: String },
    prefix: String
  },
  mixins: [LangMixin],

  data() {
    return {
      isSupport: true,
      loaded: false,
      id: getUUIDv4(),
      dragId: undefined,
      isMobile: false,
      sidebar_count: { left_count: 0, right_count: 0 }
    };
  },
  computed: {
    draggableTo() {
      return `map-draggable-${this.id}`;
    },
    rightBottomTo() {
      return `bottom-right-${this.id}`;
    },
    leftBottomTo() {
      return `bottom-left-${this.id}`;
    },
    rightTopTo() {
      return `top-right-${this.id}`;
    },
    leftTopTo() {
      return `top-left-${this.id}`;
    }
  },

  provide() {
    const $map = {};
    Object.defineProperty($map, "isMobile", {
      enumerable: true,
      get: () => this.isMobile
    });

    Object.defineProperty($map, "dragId", {
      enumerable: true,
      get: () => this.dragIdCustom || this.dragId
    });

    Object.defineProperty($map, "trans", {
      enumerable: true,
      get: () => this.trans || this.transLocal
    });
    Object.defineProperty($map, "id", {
      enumerable: true,
      get: () => this.id
    });
    Object.defineProperty($map, "locale", {
      enumerable: true,
      get: () => this.locale
    });
    Object.defineProperty($map, "prefix", {
      enumerable: true,
      get: () => this.prefix || this.id
    });

    Object.defineProperty($map, "formatCoordinate", {
      enumerable: true,
      get: () => this.formatCoordinate
    });

    return {
      getMap: this.getMap,
      dragId: this.dragId,
      $map,
      formatCoordinate: this.formatCoordinate
    };
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },

  created() {
    mapboxgl.accessToken = this.mapboxAccessToken;
  },

  mounted() {
    this.isSupport = mapboxgl.supported();
    if (this.isSupport) {
      this.$nextTick(() => {
        this.onResize();
        window.addEventListener("resize", this.onResize);
        this.init();
      });
    }
  },

  destroyed() {
    this.destroy();
  },

  methods: {
    formatCoordinate({ longitude, latitude } = {}, isDMS = false) {
      let currentPoint = { longitude: 0, latitude: 0 };
      if (isDMS) {
        currentPoint.longitude = lngDMS(+longitude);
        currentPoint.latitude = latDMS(+latitude);
      } else {
        currentPoint.longitude = longitude.toFixed(6);
        currentPoint.latitude = latitude.toFixed(6);
      }
      return currentPoint;
    },
    onChangeSidebar({ left_count, right_count }) {
      this.sidebar_count.left_count = left_count;
      this.sidebar_count.right_count = right_count;
      setSideBarCount(this.id, { left_count, right_count });
    },
    onResize() {
      let width = this.$el.clientWidth;
      this.isMobile = width && width <= 600;
    },
    onDragInitDone(drag) {
      this.dragId = drag.id;
    },
    init() {
      const initOptions = Object.assign({}, DEFAULTOPTION, this.initOptions);
      this.map = new mapboxgl.Map({
        container: this.$refs.mapContainer,
        style: {
          version: 8,
          metadata: {},
          sources: {},
          sprite: getSprite(),
          glyphs: getGlyphs(),
          layers: []
        },
        preserveDrawingBuffer: true,
        ...initOptions
      });
      this.map.id = this.id;
      setMap(this.id, this.map);
      this.map.once("load", () => {
        // Emit for parent component
        this.$nextTick(() => {
          this.map.resize();
          setTimeout(() => {
            this.loaded = true;
            this.$emit("map-loaded", this.map);
          }, 100);
        });
      });
    },

    getMap(callback) {
      if (this.loaded) {
        return callback(this.map);
      } else {
        this.$once("map-loaded", () => {
          callback(this.map);
        });
      }
    },

    destroy() {
      this.map.remove();
      this.map = null;
      removeMap(this.id);
      this.$emit("map-destroy", this.map);
    }
  }
};
</script>
<style scoped>
.mapboxgl-ctrl-logo {
  display: none !important;
  visibility: hidden;
}

.map-container {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #f7f5f2;
}
.not-support-map {
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  justify-items: center;
}

.main-container {
  position: relative;
  min-height: 0;
  min-width: 0;
  z-index: 0;
}

.map-viewer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
}

.map-content {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
