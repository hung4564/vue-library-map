<h1 align="center">Vue library map</h1>

# Vue library map

## Install

```
npm i @hungpv97/vue-library-map
```

```
yarn add @hungpv97/vue-library-map
```

## Usage

```vue
<template>
  <div id="app">
    <Map locale="vi">
      <BaseMapControl position="bottom-left" />
      <PrintControl />
      <GeoLocateControl />
      <HomeControl />
      <ZoomControl />

      <FullScreenControl />
      <MouseCoordinatesControl />
    </Map>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import {
  FullScreenControl,
  MouseCoordinatesControl,
  ZoomControl,
  HomeControl,
  GeoLocateControl,
  BaseMapControl,
  Map,
  PrintControl
} from "@hungpv97/vue-library-draggable";
import "@hungpv97/vue-library-map/map.css";

export default {
  name: "App",
  components: {
    FullScreenControl,
    MouseCoordinatesControl,
    ZoomControl,
    HomeControl,
    GeoLocateControl,
    BaseMapControl,
    Map,
    PrintControl
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
```

## Components

## Contributing

Any contribution to the code or any part of the documentation and any idea and/or suggestion are very welcome.

```bash
# serve with hot reload at localhost:8080
npm run serve

# distribution build
npm run build

```

## Feature

- [] Style edit control
  - [x] Line simple
  - [x] Area simple
  - [x] Point simple
  - [] symbol simple
  - [x] raster simple
  - [] icon label for layer
  - [] filter simple
  - [] option simple
  - [x] image
- [] Base map control
  - [x] Base map card
  - [] Add base map
  - [x] No base map
  - [] add to layer list control?
- [] Crs format
  - [] add Crs
- [x] setting center,zoom

## License

[MIT license](LICENSE)
