<template>
  <div class="map-image">
    <div class="map-image__sizer" style="padding-bottom: 100%"></div>
    <div class="map-image__image" :style="styleImage"></div>
    <div class="map-image__content"> <slot /> </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {}
  },
  data: () => ({}),
  computed: {
    styleImage() {
      return {
        "background-image": `url(${this.src})`
      };
    }
  },
  methods: {}
};
</script>

<style scoped>
.map-image {
  position: relative;
  overflow: hidden;
  flex: 1 0 auto;
  max-width: 100%;
  display: flex;
  z-index: 0;
}
.map-image__sizer {
  flex: 1 0 0px;
}
.map-image__content {
  flex: 1 0 0px;
  max-width: 100%;
}
.map-image__image {
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.map-image__sizer ~ .map-image__content {
  margin-left: -100%;
}
</style>
