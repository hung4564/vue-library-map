import axios from "axios";

export const BASEMAP_PREFIX = "";
export default {
  data() {
    return {
      sourceIds: [],
      layerIds: [],
      current_baseMaps: null,
      isLoaded: false
    };
  },
  methods: {
    onDestroy() {
      this.clear();
    },
    clear() {
      if (!this.map) return;
      for (const layerId of this.layerIds) {
        if (this.map.getLayer(layerId)) {
          this.map.removeLayer(layerId);
        }

        if (this.map.getSource(layerId)) {
          this.map.removeSource(layerId);
        }
      }

      for (const sourceId of this.sourceIds) {
        if (this.map.getSource(sourceId)) {
          this.map.removeSource(sourceId);
        }
      }

      this.layerIds = [];
      this.sourceIds = [];
    },
    async loadItem(item) {
      if (!item) return;
      if (this.current_baseMaps && item.id === this.current_baseMaps.id) {
        return;
      }
      this.clear();
      this.isLoaded = false;
      this.current_baseMaps = item;

      await this.getLoader(item.type)(item);
      this.isLoaded = true;
    },

    getLoader(type) {
      switch (type) {
        case "vector":
          return this.loadVector;
        case "raster":
          return this.loadRaster;
        default:
          throw new Error(`Not support ${type}`);
      }
    },

    loadRaster(item) {
      if (!item) throw new Error("Not found item");

      let layerId = `${BASEMAP_PREFIX}-${item.id}-${item.title}-layer`;
      let sourceId = `${BASEMAP_PREFIX}-${item.id}-${item.title}-source`;
      this.map.addSource(sourceId, {
        type: "raster",
        tiles: item.links,
        maxzoom: item.maxzoom || 22,
        minzoom: item.minzoom || 0,
        tileSize: item.tileSize || 256
      });

      this.map.addLayer(
        {
          id: layerId,
          type: "raster",
          source: sourceId,
          metadata: {
            hidden: true
          }
        },
        this.getLowestLayerId()
      );
      this.sourceIds.push(sourceId);

      this.layerIds.push(layerId);
    },

    async loadVector(item) {
      if (!this.map) return;
      const res = await axios(item.links[0]);

      // Add sources
      for (const id in res.data.sources) {
        const sourceId = BASEMAP_PREFIX + id;

        this.map.addSource(sourceId, res.data.sources[id]);
        this.sourceIds.push(sourceId);
      }

      // Add layers
      const lowestLayerId = this.getLowestLayerId();
      for (const layer of res.data.layers) {
        const layerId = BASEMAP_PREFIX + layer.id;
        const sourceId = BASEMAP_PREFIX + layer.source;

        this.map.addLayer(
          Object.assign(layer, {
            id: layerId,
            source: sourceId,
            metadata: {
              hidden: true
            }
          }),
          lowestLayerId
        );
        this.layerIds.push(layerId);
      }
    },
    getLowestLayerId() {
      const layers = this.map.getStyle().layers;

      return layers.length > 0 ? layers[0].id : null;
    },
    onClick(item) {
      this.loadItem(item);
    },
    getIndexDefault() {
      let defaultIndexBaseMap = this.p_baseMaps.findIndex(
        (b) => b.default || b.title === this.defaultBaseMap
      );
      return defaultIndexBaseMap < 0 ? 0 : defaultIndexBaseMap;
    }
  }
};
