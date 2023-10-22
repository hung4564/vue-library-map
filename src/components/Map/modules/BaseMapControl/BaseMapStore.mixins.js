import { EVENTBUS_TYPE, eventBus } from "@/utils/event-bus";
import {
  baseMaps,
  clearBaseMapForMap,
  getCurrentBaseMaps,
  setBaseMapForMap,
  setBaseMaps,
  setDefaultValueForMap
} from "@/store/store-baseMap";
export default {
  props: {
    mapId: String,
    title: {
      type: String,
      default: ""
    }
  },
  inject: {
    i_mapId: {
      from: /* injection key */ "mapId",
      default: null
    }
  },
  data: () => ({ current_baseMaps: {} }),
  computed: {
    c_mapId() {
      return this.i_mapId || (this.$map && this.$map.id);
    },
    c_baseMaps() {
      return baseMaps(this.c_mapId);
    }
  },
  mounted() {
    const vm = this;
    this.bindEvent = function (e) {
      vm.setCurrentBaseMap(e);
    };
    this.current_baseMaps = getCurrentBaseMaps(this.c_mapId);
    eventBus.on(EVENTBUS_TYPE.MAP.SET_BASEMAP, this.bindEvent);
  },
  beforeDestroy() {
    eventBus.off(EVENTBUS_TYPE.MAP.SET_BASEMAP, this.bindEvent);
  },
  methods: {
    setCurrentBaseMap({ mapId, baseMap }) {
      if (this.c_mapId === mapId) {
        this.current_baseMaps = baseMap;
      }
    },
    onDestroy() {
      this.clear();
    },
    setBaseMaps(baseMaps) {
      setBaseMaps(this.c_mapId, baseMaps);
    },
    setDefaultValueForMap(baseMaps) {
      setDefaultValueForMap(this.c_mapId, baseMaps);
    },

    clear() {
      clearBaseMapForMap(this.c_mapId);
    },
    loadItem(item) {
      setBaseMapForMap(this.c_mapId, item);
    }
  }
};
