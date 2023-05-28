<template>
  <div v-if="!isSupport" class="position-relative">
    <v-overlay :value="!isSupport">
      <div class="not-support-map">
        <p class="">
          Trình duyệt của bạn không hỗ trợ hiển thị bản đồ, vui lòng đổi trình
          duyệt hoặc cập nhật bản mới để xem.
        </p>
      </div>
    </v-overlay>
  </div>
  <div v-else class="map-container mapbox-gl-viewer position-relative">
    <div
      class="map-viewer"
      :class="{
        'sidebar-left-show': sidebar_count.left_count > 0,
        'sidebar-right-show': sidebar_count.right_count > 0
      }"
    >
      <div ref="mapContainer" class="map-content"> </div>

      <div class="right-bottom-container" :id="rightBottomTo" />
      <div class="left-bottom-container" :id="leftBottomTo" />
      <div class="right-top-container" :id="rightTopTo" />
      <div class="left-top-container" :id="leftTopTo" />
      <draggable-contianer
        class="drag-container"
        @init-done="onDragInitDone"
        @show-count:side-bar="onChangeSidebar"
      >
        <div :id="draggableTo" />
      </draggable-contianer>
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
import mapboxgl from "mapbox-gl";
import { DraggableContianer } from "@hungpv4564/vue-library-draggable";
import { getGlyphs, getSprite } from "@constant";
import { getUUIDv4 } from "@utils";
import { setMap, removeMap, setSideBarCount } from "./store/store-map";
import { setMapLang, removeMapLang, mapLang } from "./store/store-lang";
import enLang from "@/lang/en/map";
import viLang from "@/lang/vi/map";
export default {
  components: { DraggableContianer },
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
    trans: { type: Function },
    locale: { type: [String, Object], default: "en" }
  },

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
    transText() {
      return mapLang(this.id);
    },
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
      get: () => this.dragId
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

    return {
      getMap: this.getMap,
      dragId: this.dragId,
      $map
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
    this.setLocale(this.locale);
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
  watch: {
    locale() {
      this.setLocale(this.locale);
    }
  },

  methods: {
    onChangeSidebar({ left_count, right_count }) {
      this.sidebar_count.left_count = left_count;
      this.sidebar_count.right_count = right_count;
      setSideBarCount(this.id, { left_count, right_count });
    },
    onResize() {
      let width = this.$el.clientWidth;
      this.isMobile = width && width <= 600;
    },
    async setLocale(locale) {
      if (typeof locale == "object") {
        setMapLang(this.id, locale);
      } else if (["en", "vi"].includes(locale)) {
        let res = locale == "en" ? enLang : viLang;
        setMapLang(this.id, { map: res });
      }
    },
    onDragInitDone(drag) {
      this.dragId = drag.id;
    },
    transLocal(key) {
      return getProp(this.transText, key, key);
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
      removeMapLang(this.id);
    }
  }
};
function getProp(object, path, defaultVal) {
  const _path = Array.isArray(path)
    ? path
    : path.split(".").filter((i) => i.length);

  if (!_path.length) {
    return object === undefined ? defaultVal : object;
  }
  if (object == null) return defaultVal;
  return getProp(object[_path.shift()], _path, defaultVal);
}
</script>
<style>
.mapboxgl-ctrl-logo {
  display: none !important;
  visibility: hidden;
}
</style>
<style lang="scss">
.drag-container {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 800;
  width: 100%;
}
.main-map-container {
  pointer-events: none;
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  & > div {
    position: relative;
  }
}
.button-container {
  clear: both;
  pointer-events: auto;
  -webkit-transform: translate(0);
  transform: translate(0);
}
.mapbox-gl-viewer {
  .button-container.button-group-container:not(:first-child) {
    margin-left: 10px;
  }
  .right-bottom-container,
  .right-top-container,
  .left-bottom-container,
  .left-top-container {
    pointer-events: none;
    z-index: 2;
    position: absolute;
    & > * {
      clear: both;
    }
  }
  .right-bottom-container {
    bottom: 0;
    right: 0;
    & > * {
      margin: 0 10px 10px 0;
      float: right;
      clear: both;
    }
  }
  .left-bottom-container {
    bottom: 0;
    left: 0;
    & > * {
      margin: 0 0 10px 10px;
      float: left;
    }
  }
  .left-top-container {
    top: 0;
    left: 0;
    & > * {
      margin: 10px 0 0 10px;
      float: left;
    }
  }
  .right-top-container {
    top: 0;
    right: 0;
    & > * {
      margin: 10px 10px 0 0;
      float: right;
    }
  }
}
</style>
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

<style>
/* Group Control */
.map-container .mapboxgl-ctrl .mapboxgl-ctrl:first-child {
  margin: 0;
}

.map-container .mapboxgl-ctrl .mapboxgl-ctrl:not(:first-child) {
  margin: 10px 0 0 0;
}

/* Map Canvas */
.mapboxgl-canvas:hover,
.mapboxgl-canvas:focus,
.mapboxgl-canvas:active {
  border: none;
  outline: none;
}
.map-container * {
  box-sizing: border-box;
}
.map-divider {
  display: block;
  flex: 1 1 0px;
  max-width: 100%;
  height: 0px;
  max-height: 0px;
  border: solid;
  border-width: thin 0 0 0;
  transition: inherit;
  border-color: #fff;
  opacity: 0.3;
}
.map-spacer {
  flex-grow: 1;
}
</style>

<style lang="scss">
.sidebar-left-show:not(.sidebar-left-close) {
  @media only screen and (min-width: 600px) and (max-width: 1264px) {
    .left-bottom-container {
      left: calc(320px + 10px);
    }

    .left-top-container {
      left: calc(320px + 10px);
    }
  }

  @media only screen and (min-width: 1264px) {
    .left-bottom-container {
      left: calc(400px + 10px);
    }

    .left-top-container {
      left: calc(400px + 10px);
    }
  }
}
.sidebar-right-show:not(.sidebar-left-close) {
  @media only screen and (min-width: 600px) and (max-width: 1264px) {
    .right-bottom-container {
      right: calc(320px + 10px);
    }

    .right-top-container {
      right: calc(320px + 10px);
    }
  }

  @media only screen and (min-width: 1264px) {
    .right-bottom-container {
      right: calc(400px + 10px);
    }

    .right-top-container {
      right: calc(400px + 10px);
    }
  }
}
</style>
