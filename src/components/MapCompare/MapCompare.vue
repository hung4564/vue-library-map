<template lang="">
  <div class="map-compare-container">
    <div class="map-compare__container">
      <template v-if="dragId">
        <Map
          v-for="key in count_map"
          :key="key"
          v-bind="$attrs"
          :trans="trans"
          :locale="locale"
          class="map-compare__item"
          :dragIdCustom="dragId"
          :prefix="id"
          @map-loaded="onMapLoad($event, key - 1)"
          @map-destroy="onMapDestroy($event, key - 1)"
        >
          <slot :name="`map-${key - 1}`" />
        </Map>
      </template>
    </div>

    <div class="right-bottom-container" :id="rightBottomTo" />
    <div class="left-bottom-container" :id="leftBottomTo" />
    <div class="right-top-container" :id="rightTopTo" />
    <div class="left-top-container" :id="leftTopTo" />

    <draggable-contianer class="drag-container" @init-done="onDragInitDone">
      <div :id="draggableTo" />
    </draggable-contianer>
    <slot v-if="dragId && loaded"></slot>
  </div>
</template>
<script>
import { DraggableContianer } from "@hungpv4564/vue-library-draggable";
import { getUUIDv4 } from "@/utils";
import Map from "../Map/Map.vue";
// import syncMove from "@mapbox/mapbox-gl-sync-move";
import { mapLang, removeMapLang } from "@/store/store-lang";
import { removeMap, setMap } from "@/store/store-map";
export default {
  props: {
    trans: { type: Function },
    locale: { type: [String, Object], default: "en" }
  },
  components: {
    Map,
    DraggableContianer
  },
  data() {
    return {
      id: getUUIDv4(),
      dragId: undefined,
      isMobile: false,
      loaded: false,
      count_map: 1,
      setting: { compare: false }
    };
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
    Object.defineProperty($map, "prefix", {
      enumerable: true,
      get: () => this.id
    });
    Object.defineProperty($map, "changeSetting", {
      enumerable: true,
      get: () => (e) => this.changeSetting(e)
    });
    Object.defineProperty($map, "setting", {
      enumerable: true,
      get: () => this.setting
    });

    return {
      getMap: this.getMap,
      dragId: this.dragId,
      $map
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
  created() {
    this.createMaps(this.count_map);
  },
  mounted() {
    this.$nextTick(() => {
      this.onResize();
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeDestroy() {
    this.destroy();
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    changeSetting(e = {}) {
      if (e.compare) {
        this.count_map = 2;
      } else {
        this.count_map = 1;
      }
      console.log("🚀 ~ changeSetting ~ e", e);
      console.log("🚀 ~ changeSetting ~ this", this.count_map);
      this.createMaps(this.count_map);
    },
    createMaps(max) {
      if (!this.maps) {
        this.maps = {};
      }
      for (let i = 0; i < max; i++) {
        if (!this.maps[i]) {
          this.$set(this.maps, i, null);
        }
      }
    },
    onMapLoad(map, index) {
      this.maps[index] = map;
      this.initCompare();
    },
    onMapDestroy(map, index) {
      console.log("🚀 ~ onMapDestroy ~ index", index);
      delete this.maps[index];
    },
    transLocal(key) {
      return getProp(this.transText, key, key);
    },
    onDragInitDone(drag) {
      this.dragId = drag.id;
    },
    onResize() {
      let width = this.$el.clientWidth;
      this.isMobile = width && width <= 600;
    },
    getMap(callback) {
      if (this.loaded) {
        return callback({ id: this.id, maps: [this.beforeMap, this.afterMap] });
      } else {
        this.$once("map-compare-loaded", () => {
          callback({ id: this.id, maps: [this.beforeMap, this.afterMap] });
        });
      }
    },
    initCompare() {
      let vm = this;
      if (!this.maps || Object.values(this.maps).some((x) => !x)) return;
      let maps = Object.values(vm.maps);
      // vm.clear = syncMove(vm.beforeMap, vm.afterMap);

      vm.$emit("map-compare-loaded", {
        id: vm.id,
        maps: maps
      });
      setMap(this.id, maps);
      this.loaded = true;
    },
    destroy() {
      if (this.clear) {
        this.clear();
      }
      this.maps = {};
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

<style lang="scss">
.map-compare-container {
  position: relative;
  min-height: 100%;
  height: 100%;
  width: 100%;
  flex-direction: column;
  box-sizing: border-box;
  flex: 1 1 auto;
  .map-compare__container {
    display: flex;
    height: 100%;
    width: 100%;
    .map-compare__item {
      flex: 1 1 auto;
      height: 100%;
    }
  }
}
</style>
