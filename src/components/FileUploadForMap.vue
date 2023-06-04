<template>
  <ModuleContainer v-bind="bindModule">
    <input
      ref="file"
      :accept="accept"
      hidden
      type="file"
      @change="onFileChange"
    />
    <template #btn>
      <MapControlButton @click="onUpload" tooltip="Upload">
        <SvgIcon :size="18" type="mdi" :path="path.home" />
      </MapControlButton>
    </template>
    <slot />
  </ModuleContainer>
</template>

<script>
import { mdiUpload } from "@mdi/js";
import ModuleMixin from "@/components/Map/mixins/ModuleMixin";
import MapControlButton from "@/components/Map/control/MapControlButton.vue";
import { Reader } from "@/utils/GeojsonIO/Reader/Reader";
import { createLayer } from "@/store/store-datasource";
import { LayerBuild } from "@/model";
import bbox from "@turf/bbox";
import { getUUIDv4 } from "@/utils";
export default {
  props: {
    accept: {
      type: String,
      default: ".geojson,.json,.csv"
    }
  },
  components: { MapControlButton },
  mixins: [ModuleMixin],

  data() {
    return {
      geojson: null
    };
  },
  computed: {
    path() {
      return { home: mdiUpload };
    }
  },

  methods: {
    onUpload() {
      this.$refs.file.click();
    },
    onFileChange(e) {
      let files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
      files = [...files];
      const input = this.$refs.file;
      if (input) {
        input.type = "text";
        input.type = "file";
        input.value = "";
      }
      const reader = new Reader();
      reader.read(files[0]).then((res) => {
        let layerId = `draw-controll-layer-${getUUIDv4()}`;
        let sourceId = `draw-controll-source-${getUUIDv4()}`;
        let color = "#004e98";
        let layer = new LayerBuild();
        layer.disableOpactiy();
        layer.setSource({
          id: sourceId,
          data: {
            type: "geojson",
            data: res
          }
        });
        layer.setLayers([
          {
            id: `${layerId}-areas-fill`,
            type: "fill", // For fill
            source: sourceId,
            filter: ["==", "$type", "Polygon"],
            paint: {
              "fill-color": color,
              "fill-opacity": 0.3
            }
          },
          {
            id: `${layerId}-areas-outline`,
            type: "line", // For outline
            source: sourceId,
            filter: ["==", "$type", "Polygon"],
            paint: {
              "line-color": color,
              "line-width": 2
            }
          }
        ]);
        layer.setMetadata({ bounds: bbox(res) });
        layer.setInfo({
          name: "Geojson show",
          menus: []
        });
        createLayer(this.c_mapId, layer.build());
      });
    }
  }
};
</script>
