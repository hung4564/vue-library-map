<template lang="">
  <div class="compare-map-container">
    <Map
      v-bind="$attrs"
      :trans="trans"
      :locale="locale"
      class="map-compare"
      :dragIdCustom="dragId"
      :prefix="id"
      @map-loaded="onMapBeforeLoad"
    >
      <slot name="map-before" />
    </Map>
    <Map
      v-bind="$attrs"
      :trans="trans"
      :locale="locale"
      class="map-compare"
      :dragIdCustom="dragId"
      :prefix="id"
      @map-loaded="onMapAfterLoad"
    >
      <slot name="map-after" />
    </Map>

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
import Map from "./Map.vue";
import syncMove from "@mapbox/mapbox-gl-sync-move";
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
      loaded: false
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
  mounted() {
    if (this.isSupport) {
      this.$nextTick(() => {
        this.onResize();
        window.addEventListener("resize", this.onResize);
      });
    }
  },
  beforeDestroy() {
    this.destroy();
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
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
    onMapBeforeLoad(map) {
      this.beforeMap = map;
      this.initCompare();
    },
    onMapAfterLoad(map) {
      this.afterMap = map;
      this.initCompare();
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
      if (!vm.beforeMap || !vm.afterMap) return;
      vm.clear = syncMove(vm.beforeMap, vm.afterMap);
      vm.$emit("map-compare-loaded", {
        id: vm.id,
        maps: [vm.beforeMap, vm.afterMap]
      });
      setMap(this.id, [this.beforeMap, this.afterMap]);
      this.loaded = true;
    },
    destroy() {
      if (this.clear) {
        this.clear();
      }
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
.compare-map-container {
  position: relative;
  min-height: 100%;
  height: 100%;
  width: 100%;
  flex-direction: column;
  box-sizing: border-box;
  flex: 1 1 auto;
  .map-compare:first-child {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
  }
  .map-compare:nth-child(2) {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 50%;
  }
}
</style>
