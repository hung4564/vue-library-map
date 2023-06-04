<template>
  <ModuleContainer v-bind="bindModule">
    <template #btn>
      <MapControlButton
        icon
        :title="
          !isFullScreen
            ? $map.trans('map.action.fullscreen-control-enter')
            : $map.trans('map.action.fullscreen-control-exit')
        "
        @click="onToggleFullScreen"
      >
        <SvgIcon
          :size="18"
          type="mdi"
          :path="isFullScreen ? path.exitFullscreen : path.fullscreen"
        />
      </MapControlButton>
    </template>
    <slot />
  </ModuleContainer>
</template>

<script>
import { mdiFullscreen, mdiFullscreenExit } from "@mdi/js";
import ModuleMixin from "@/components/Map/mixins/ModuleMixin";
import MapControlButton from "@/components/Map/control/MapControlButton.vue";
export default {
  components: { MapControlButton },
  props: { type: { type: String, default: "body" } },
  mixins: [ModuleMixin],
  data: () => ({ isFullScreen: false, onFullScreenChangeHandle: null }),
  created() {
    this.onFullScreenChangeHandle = this.onFullScreenChange.bind(this);
    if (document.addEventListener) {
      document.addEventListener(
        "fullscreenchange",
        this.onFullScreenChangeHandle,
        false
      );
      document.addEventListener(
        "mozfullscreenchange",
        this.onFullScreenChangeHandle,
        false
      );
      document.addEventListener(
        "MSFullscreenChange",
        this.onFullScreenChangeHandle,
        false
      );
      document.addEventListener(
        "webkitfullscreenchange",
        this.onFullScreenChangeHandle,
        false
      );
    }
  },
  beforeDestroy() {
    if (document.removeEventListener) {
      document.removeEventListener(
        "fullscreenchange",
        this.onFullScreenChangeHandle,
        false
      );
      document.removeEventListener(
        "mozfullscreenchange",
        this.onFullScreenChangeHandle,
        false
      );
      document.removeEventListener(
        "MSFullscreenChange",
        this.onFullScreenChangeHandle,
        false
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        this.onFullScreenChangeHandle,
        false
      );
    }
  },
  computed: {
    path() {
      return {
        fullscreen: mdiFullscreen,
        exitFullscreen: mdiFullscreenExit
      };
    }
  },
  methods: {
    onFullScreenChange() {
      this.isFullScreen =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement;
    },
    onInit() {},
    onToggleFullScreen() {
      if (document.fullscreenElement) {
        this.closeFullscreen();
      } else {
        let elm =
          this.type == "body"
            ? document.querySelector("body")
            : this.getMapContainer();
        this.openFullscreen(elm);
      }
      this.$nextTick(() => {
        this.callMap((map) => {
          map.resize();
        });
      });
    },

    getMapContainer(el = this.map.getContainer()) {
      if (el.classList.contains("map-container") || el.tagName === "BODY") {
        return el;
      } else {
        return this.getMapContainer(el.parentElement);
      }
    },

    /* View in fullscreen */
    openFullscreen(elem) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
      }
    },

    /* Close fullscreen */
    closeFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
    }
  }
};
</script>
