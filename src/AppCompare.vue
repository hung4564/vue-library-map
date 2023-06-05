<template>
  <div id="app">
    <MapCompare locale="en">
      <template #map-0>
        <BaseMapControl position="bottom-left"></BaseMapControl>
      </template>
      <template #map-1>
        <BaseMapControl
          position="bottom-right"
          defaultBaseMap="Dark"
        ></BaseMapControl>
      </template>
      <FileUploadForMap position="bottom-right" />
      <LayerControl position="top-left" />
    </MapCompare>
  </div>
</template>

<script>
import { BaseMapControl } from "@components/Map";
import { MapCompare } from "@components/MapCompare";
import LayerControl from "./components/LayerControl/LayerControl.vue";
import FileUploadForMap from "./components/FileUploadForMap.vue";
export default {
  name: "App",
  components: {
    MapCompare,
    LayerControl,
    FileUploadForMap,
    BaseMapControl
  }
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
}

body,
html,
#app {
  height: 100%;
}
</style>
