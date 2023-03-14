<template>
  <ModuleContainer v-bind="bindModule">
    <template #btn>
      <MapControlButton
        v-if="!print.show"
        :active="print.show"
        icon="mdi-printer-outline"
        :tooltip="$map.trans('map.print.title')"
        @click="onSaveAll()"
      />
      <template v-else>
        <MapControlGroupButton row>
          <MapControlButton
            icon="mdi-content-save-outline"
            :loading="print.loading"
            :tooltip="$map.trans('actions.save')"
            @click="onSave()"
          />
          <MapControlButton
            :disabled="print.loading"
            icon="mdi-close"
            :tooltip="$map.trans('actions.clear')"
            @click="onClosePrint()"
          />
        </MapControlGroupButton>
      </template>
    </template>
    <slot />
  </ModuleContainer>
</template>

<script>
import MapControlButton from "@/components/Map/control/MapControlButton.vue";
import MapControlGroupButton from "@/components/Map/control/MapControlGroupButton.vue";
import ModuleMixin from "@/components/Map/mixins/ModuleMixin";
import { saveAs } from "file-saver";

import { CrosshairManager, exportMapbox, PrintableAreaManager } from "./print";
import { initPrint } from "./store-print";
export default {
  components: { MapControlButton, MapControlGroupButton },
  mixins: [ModuleMixin],
  data: () => ({
    print: { show: false, loading: false }
  }),

  methods: {
    onDestroy() {
      this.onClosePrint();
    },
    async onSaveAll(cb) {
      this.print.loading = true;
      try {
        let image = await exportMapbox(this.map);
        if (cb) {
          cb(image);
        } else {
          await this.onDownload(image);
        }
      } finally {
        this.print.loading = false;
      }
    },
    async onSave(cb) {
      if (!this.printableArea) return;
      this.print.loading = true;
      try {
        let image = await exportMapbox(
          this.map,
          this.printableArea.getCutSize()
        );
        if (cb) {
          cb(image);
        } else {
          await this.onDownload(image);
        }
      } finally {
        this.print.loading = false;
      }
    },
    onShowPrint(options) {
      this.print.show = true;
      this.toggleCrosshair(this.print.show, options);
      this.togglePrintableArea(this.print.show, options);
      this.map.on("resize", this.mapResizeBind);
    },
    onClosePrint() {
      this.print.loading = false;
      this.print.show = false;
      this.toggleCrosshair(this.print.show);
      this.togglePrintableArea(this.print.show);
      if (this.map) this.map.off("resize", this.mapResizeBind);
    },
    togglePrintableArea(show, { ratio = 1 } = {}) {
      if (show === false) {
        if (this.printableArea !== undefined) {
          this.printableArea.destroy();
          this.printableArea = undefined;
        }
      } else {
        this.printableArea = new PrintableAreaManager(
          this.map.getCanvas(),
          ratio
        );
        this.printableArea.create();
      }
    },
    toggleCrosshair(show) {
      if (show === false) {
        if (this.crosshair !== undefined) {
          this.crosshair.destroy();
          this.crosshair = undefined;
        }
      } else {
        this.crosshair = new CrosshairManager(this.map.getCanvas());
        this.crosshair.create();
      }
    },
    onInit() {
      this.mapResizeBind = this.onMapResize.bind(this);
      initPrint(this.$map.mapId, {
        show: (options) => this.onShowPrint(options),
        close: () => this.onClosePrint(),
        save: (cb) => this.onSave(cb),
        saveAll: (cb) => this.onSaveAll(cb)
      });
    },
    onMapResize() {
      if (this.printableArea) {
        this.printableArea.mapResize();
      }
      if (this.crosshair) {
        this.crosshair.mapResize();
      }
    },
    async onDownload(data64) {
      if (this.$listeners["click:download"]) {
        this.$emit("click:download", data64);
        return;
      }
      saveAs(data64, "map.png");
    }
  }
};
</script>
<style>
.hidden-map {
  top: 0;
  right: 0;
  height: 0;
  width: 0;
  position: fixed;
}
</style>
