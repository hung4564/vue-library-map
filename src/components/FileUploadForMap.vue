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
import { fitBounds } from "@components/Map/helper";

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
    return {};
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
        fitBounds(this.map, res);
      });
    }
  }
};
</script>
