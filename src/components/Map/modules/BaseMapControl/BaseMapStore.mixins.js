import {
  baseMaps,
  clearBaseMapForMap,
  getCurrentBaseMaps,
  setBaseMapForMap,
  setBaseMaps,
  setDefaultValueForMap
} from "../../store/store-baseMap";

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
  computed: {
    c_mapId() {
      return this.i_mapId || (this.$map && this.$map.id);
    },
    c_baseMaps() {
      return baseMaps(this.c_mapId);
    },
    current_baseMaps: {
      get() {
        return getCurrentBaseMaps(this.c_mapId);
      }
    }
  },
  methods: {
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
