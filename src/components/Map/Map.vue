<template>
  <div v-if="!isSupport" class="full-width full-height position-relative">
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
    <div class="map-viewer">
      <div ref="mapContainer" class="map-content"> </div>

      <portal-target
        class="right-bottom-container"
        multiple
        :name="rightBottomTo"
      />
      <portal-target
        class="left-bottom-container"
        multiple
        :name="leftBottomTo"
      />
      <portal-target class="right-top-container" multiple :name="rightTopTo" />
      <portal-target class="left-top-container" multiple :name="leftTopTo" />
      <draggable-map-contianer
        class="drag-container"
        :isShowSidebar.sync="isShowSidebar"
        :mapId="id"
      />
      <slot v-if="loaded" />
    </div>
  </div>
</template>

<script>
import { PortalTarget } from "portal-vue";
const DEFAULTOPTION = {
  center: [105.19084739818732, 15.827971829957548],
  zoom: 5.297175623863693,
  maxZoom: 22
};
import mapboxgl from "mapbox-gl";
import DraggableMapContianer from "@components/draggable/draggable-map-contianer.vue";
import { getGlyphs, getSprite } from "@constant";
import { getUUIDv4 } from "@utils";
import { setMap } from "./store/store-map";
import enLang from "@/lang/en/map";
export default {
  components: { DraggableMapContianer, PortalTarget },
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
      isShowSidebar: false,
      isSupport: true,
      loaded: false,
      id: getUUIDv4()
    };
  },
  computed: {
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
    return {
      getMap: this.getMap,
      mapId: this.id,
      trans: this.trans || this.transLocal
    };
  },

  created() {
    mapboxgl.accessToken = this.mapboxAccessToken;
  },

  mounted() {
    this.isSupport = mapboxgl.supported();
    if (this.isSupport) {
      this.$nextTick(() => {
        this.init();
      });
    }
  },

  destroyed() {
    this.destroy();
  },

  methods: {
    transLocal(key) {
      return getProp(this.getLocaleObject(this.locale), key, key);
    },
    getLocaleObject(locale) {
      if (typeof locale == "object") return locale;
      return { map: enLang };
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
        this.loaded = true;
        // Emit for parent component
        this.$emit("map-loaded", this.map);
        this.$nextTick(() => {
          this.map.resize();
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
