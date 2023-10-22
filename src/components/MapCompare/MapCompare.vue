<template lang="">
  <div class="map-compare-container">
    <div
      class="map-compare__container"
      :class="{ 'map-compare__split': isUseSwiper }"
    >
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
          ref="maps"
          @map-loaded="onMapLoad($event, key - 1)"
          @map-destroy="onMapDestroy($event, key - 1)"
        >
          <slot :name="`map-${key - 1}`" />
        </Map>
      </template>
      <div class="map-compare__swiper" v-if="isUseSwiper" ref="swiper">
        <div class="compare-swiper-vertical"></div>
      </div>
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
import { DraggableContianer } from "@hungpv97/vue-library-draggable";
import { getUUIDv4 } from "@/utils";
import Map from "../Map/Map.vue";
import syncMove from "@mapbox/mapbox-gl-sync-move";
import { removeMap, setMap } from "@/store/store-map";
import { MapCompareSwiper } from "@components/MapCompare/helper";
import { LangMixin } from "@/mixins/lang.mixins";
import { EVENTBUS_TYPE, eventBus } from "@/utils/event-bus";
export default {
  props: {},
  components: {
    Map,
    DraggableContianer
  },
  mixins: [LangMixin],
  data() {
    return {
      id: getUUIDv4(),
      dragId: undefined,
      isMobile: false,
      loaded: false,
      count_map: 1,
      setting: { compare: false, split: true, sync: true }
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
    Object.defineProperty($map, "multi", {
      enumerable: true,
      get: () => this.setting.compare
    });

    return {
      getMap: this.getMap,
      dragId: this.dragId,
      $map
    };
  },
  computed: {
    isUseSwiper() {
      return this.setting.compare && this.setting.split;
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
    this.setSetting(this.setting);
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
    setSetting(setting = {}) {
      setting = Object.assign(
        { compare: true, split: true, sync: true },
        setting
      );
      if (!setting.sync && this.clearSync) {
        this.clearSync();
      }
      if (setting.compare) {
        this.count_map = 2;
      } else {
        this.count_map = 1;
      }
      this.createMaps(this.count_map);
      this.$nextTick(() => {
        this.initCompare();
      });
    },
    changeSetting(e = {}) {
      this.setting = Object.assign({}, this.setting, e);
      this.setSetting(this.setting);
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
      delete this.maps[index];
    },
    onDragInitDone(drag) {
      this.dragId = drag.id;
    },
    onResize() {
      let width = this.$el.clientWidth;
      this.isMobile = width && width <= 600;
      if (this.resizeSplit) {
        this.resizeSplit();
      }
    },
    getMap(callback) {
      if (this.loaded) {
        return callback({ id: this.id, maps: Object.values(this.maps) });
      } else {
        this.$once("map-compare-loaded", () => {
          callback({ id: this.id, maps: Object.values(this.maps) });
        });
      }
    },
    initCompare() {
      let vm = this;
      if (!this.maps || Object.values(this.maps).some((x) => !x)) return;
      let maps = Object.values(vm.maps);
      if (this.clearSplit) {
        this.clearSplit();
      }
      if (this.clearSync) {
        this.clearSync();
      }
      maps.forEach((map) => map && map.resize());
      vm.$emit("map-compare-loaded", {
        id: vm.id,
        maps: maps
      });
      setMap(this.id, maps);
      this.loaded = true;
      if (this.setting.sync) {
        this.clearSync = syncMove(maps);
      }
      if (this.isUseSwiper) {
        let swiper = new MapCompareSwiper(
          this.$refs.swiper,
          this.$refs.maps[0].$el,
          this.$refs.maps[1].$el
        );
        this.clearSplit = swiper.clear;
        this.resizeSplit = swiper.resize;
      }
      eventBus.emit(EVENTBUS_TYPE.MAP.COMPARE, {
        map_id: this.id,
        is_compare: this.setting.compare
      });
    },
    destroy() {
      if (this.clearSplit) {
        this.clearSplit();
      }
      if (this.clearSync) {
        this.clearSync();
      }
      this.maps = {};
      removeMap(this.id);
    }
  }
};
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
    position: relative;
    display: flex;
    height: 100%;
    width: 100%;
    .map-compare__item {
      flex: 1 1 auto;
      height: 100%;
    }
  }
  .map-compare__split .map-compare__item {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}
.map-compare__swiper {
  background-color: #fff;
  position: absolute;
  width: 2px;
  height: 100%;
  z-index: 1;
}
.map-compare__swiper .compare-swiper-vertical {
  background-color: #3887be;
  box-shadow: inset 0 0 0 2px #fff;
  display: inline-block;
  border-radius: 50%;
  position: absolute;
  width: 40px;
  height: 40px;
  top: 50%;
  left: -20px;
  margin: -20px 1px 0;
  color: #fff;
  cursor: ew-resize;
  background-size: 40px;
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgd2lkdGg9IjYwIiAgIGhlaWdodD0iNjAiICAgdmVyc2lvbj0iMS4xIiAgIHZpZXdCb3g9IjAgMCA2MCA2MCIgICBpZD0ic3ZnNTQzNCIgICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkxK2RldmVsK29zeG1lbnUgcjEyOTExIiAgIHNvZGlwb2RpOmRvY25hbWU9Imwtci5zdmciPiAgPG1ldGFkYXRhICAgICBpZD0ibWV0YWRhdGE1NDQ0Ij4gICAgPHJkZjpSREY+ICAgICAgPGNjOldvcmsgICAgICAgICByZGY6YWJvdXQ9IiI+ICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4gICAgICAgIDxkYzp0eXBlICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU+ICAgICAgPC9jYzpXb3JrPiAgICA8L3JkZjpSREY+ICA8L21ldGFkYXRhPiAgPGRlZnMgICAgIGlkPSJkZWZzNTQ0MiIgLz4gIDxzb2RpcG9kaTpuYW1lZHZpZXcgICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIgICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IiAgICAgYm9yZGVyb3BhY2l0eT0iMSIgICAgIG9iamVjdHRvbGVyYW5jZT0iMTAiICAgICBncmlkdG9sZXJhbmNlPSIxMCIgICAgIGd1aWRldG9sZXJhbmNlPSIxMCIgICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwIiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIgICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTI4NiIgICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijc1MSIgICAgIGlkPSJuYW1lZHZpZXc1NDQwIiAgICAgc2hvd2dyaWQ9InRydWUiICAgICBpbmtzY2FwZTp6b29tPSI0IiAgICAgaW5rc2NhcGU6Y3g9IjI1Ljg4OTgzMSIgICAgIGlua3NjYXBlOmN5PSIzNC4zODE4MzMiICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMCIgICAgIGlua3NjYXBlOndpbmRvdy15PSIyMyIgICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjAiICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJzdmc1NDM0IiAgICAgaW5rc2NhcGU6b2JqZWN0LW5vZGVzPSJ0cnVlIiAgICAgaW5rc2NhcGU6c25hcC1zbW9vdGgtbm9kZXM9InRydWUiPiAgICA8aW5rc2NhcGU6Z3JpZCAgICAgICB0eXBlPSJ4eWdyaWQiICAgICAgIGlkPSJncmlkNTk4OSIgLz4gIDwvc29kaXBvZGk6bmFtZWR2aWV3PiAgPHBhdGggICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjFweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIiAgICAgZD0iTSAyNSAyNCBMIDE2IDMwIEwgMjUgMzYgTCAyNSAyNCB6IE0gMzUgMjQgTCAzNSAzNiBMIDQ0IDMwIEwgMzUgMjQgeiAiICAgICBpZD0icGF0aDU5OTUiIC8+PC9zdmc+);
}
</style>
