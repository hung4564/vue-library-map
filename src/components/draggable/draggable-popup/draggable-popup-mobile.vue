<template>
  <div
    v-show="c_show"
    class="popup-mobile-container"
    :class="{ 'full-height': isFullScreen }"
    :style="{ zIndex: zIndex, height: isFullScreen ? '100%' : '45%' }"
  >
    <map-card class="draggable-popup-mobile">
      <div class="draggable-popup-mobile-heading">
        <div class="draggable-popup-mobile-heading__title">
          <slot name="title"></slot>
        </div>
        <div class="draggable-popup-mobile-heading__content"> </div>
        <div class="map-spacer"></div>
        <slot name="extra-btn"></slot>

        <template v-if="countPopup > 1">
          <map-button :disabled="isFirst" icon small @click="onToBack()">
            <map-icon>mdi-arrange-send-backward</map-icon>
          </map-button>
          <map-button :disabled="isLast" icon small @click="onToFront()">
            <map-icon>mdi-arrange-bring-forward</map-icon>
          </map-button>
        </template>
        <map-button icon small @click="onFullScreen()">
          <map-icon v-if="isFullScreen">
            mdi-arrow-down-drop-circle-outline
          </map-icon>
          <map-icon v-else> mdi-arrow-up-drop-circle-outline </map-icon>
        </map-button>
        <map-button v-if="!disableClose" icon small @click="onClose">
          <map-icon>mdi-close</map-icon>
        </map-button>
      </div>

      <hr class="map-divider" />
      <div class="flex-grow-1 overflow-auto">
        <slot></slot>
      </div>
    </map-card>
  </div>
</template>

<script>
import MapCard from "../../MapCard.vue";
import MapIcon from "../../MapIcon.vue";
import MapButton from "../../MapButton.vue";
import ModuleMixin from "./draggable-popup.mixin";
export default {
  components: { MapIcon, MapButton, MapCard },
  mixins: [ModuleMixin],
  props: {},
  data: () => ({
    isFullScreen: false
  }),
  watch: {},
  computed: {},
  methods: {
    onFullScreen() {
      this.isFullScreen = !this.isFullScreen;
    },
    onClose() {
      this.c_show = false;
    }
  }
};
</script>

<style scoped>
.popup-mobile-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.draggable-popup-mobile {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.draggable-popup-mobile-heading {
  align-items: center;
  display: flex;
  position: relative;
  z-index: 0;
  flex-grow: 0;
  max-width: 100%;
  padding: 0 8px;
}
.draggable-popup-mobile-heading__content {
  contain: layout;
  display: block;
  flex: 1 1 auto;
}
.draggable-popup-mobile-heading,
.draggable-popup-mobile-heading__content {
  height: 48px;
}
.draggable-popup-mobile-heading >>> .map-control-button {
  background-color: unset;
}
.draggable-popup-mobile-heading__title {
  font-size: 1.25rem;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
