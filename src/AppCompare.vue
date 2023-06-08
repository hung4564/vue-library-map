<template>
  <div id="app">
    <MapCompare locale="en">
      <FileUploadForMap position="bottom-right" />
      <CompareSetting />
      <ZoomControl position="bottom-right"></ZoomControl>
      <BaseMapControl
        position="bottom-right"
        defaultBaseMap="Dark"
      ></BaseMapControl>
    </MapCompare>
  </div>
</template>

<script>
import { BaseMapControl, ZoomControl } from "@components/Map";
import { MapCompare, CompareSetting } from "@components/MapCompare";
import FileUploadForMap from "./components/FileUploadForMap.vue";
export default {
  name: "App",
  components: {
    MapCompare,
    FileUploadForMap,
    BaseMapControl,
    CompareSetting,
    ZoomControl
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
