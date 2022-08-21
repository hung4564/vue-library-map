<template>
  <vue-drag-resize
    v-if="p_show"
    v-bind="$attrs"
    dragHandle=".drag"
    :h="p_height"
    is-active
    :minh="c_minHeight"
    :minw="c_minWidth"
    parent-limitation
    :parentH="c_parentHeight"
    :parentW="c_parentWidth"
    :sticks="sticks"
    :w="p_width"
    :x="p_x"
    :y="p_y"
    :z="zIndex"
    @resizing="onResize"
  >
    <map-card class="draggable-popup-desktop">
      <div class="draggable-popup-desktop-heading">
        <div class="draggable-popup-desktop-heading__content">
          <map-icon class="drag grabbing">mdi-drag</map-icon>
          <div class="draggable-popup-desktop-heading__title">
            <slot name="title"></slot>
          </div>
          <div class="map-spacer"></div>
          <slot name="extra-btn"></slot>
          <template v-if="countPopup > 1">
            <map-button :disabled="isFirst" icon small @click="onToBack()">
              <map-icon small>mdi-arrange-send-backward</map-icon>
            </map-button>
            <map-button :disabled="isLast" icon small @click="onToFront()">
              <map-icon small>mdi-arrange-bring-forward</map-icon>
            </map-button>
          </template>

          <map-button icon small @click="toggleExpanded">
            <map-icon small>{{
              isExpanded
                ? "mdi-arrow-up-drop-circle-outline"
                : "mdi-arrow-down-drop-circle-outline"
            }}</map-icon>
          </map-button>
          <map-button v-if="!disableClose" icon small @click="onClose">
            <map-icon small>mdi-close</map-icon>
          </map-button>
        </div>
      </div>
      <hr class="map-divider" />
      <div v-show="isExpanded" class="flex-grow-1 overflow-auto">
        <slot></slot>
      </div>
    </map-card>
  </vue-drag-resize>
</template>

<script>
import MapCard from "../../MapCard.vue";
import MapIcon from "../../MapIcon.vue";
import MapButton from "../../MapButton.vue";
import VueDragResize from "vue-drag-resize";
import { isNil } from "lodash";
import ModuleMixin from "./draggable-popup.mixin";
export default {
  mixins: [ModuleMixin],
  components: { MapCard, MapIcon, VueDragResize, MapButton },
  props: {
    minWidth: { type: Number, default: 200 },
    minHeigth: { type: Number, default: 50 },
    width: { type: Number, default: 200 },
    height: { type: Number, default: 200 },
    sticks: { type: Array, default: () => ["bl", "br"] },
    top: { type: Number, default: undefined },
    left: { type: Number, default: undefined },
    bottom: { type: Number, default: undefined },
    right: { type: Number, default: undefined }
  },
  data: () => ({ p_show: false, p_width: 200, p_height: 200, p_x: 0, p_y: 0 }),
  inject: {},

  created() {
    this.p_x = 0;
    this.p_y = 0;
    this.p_height = this.height;
    this.p_width = this.width;
  },
  watch: {
    height: {
      handler(val) {
        this.p_height = val;
      }
    },
    width: {
      handler(val) {
        this.p_width = val;
      }
    },
    show: {
      handler(val) {
        if (val) {
          if (!isNil(this.left)) {
            this.p_x = this.left;
          }
          if (!isNil(this.top)) {
            this.p_y = this.top;
          }
          if (!isNil(this.right)) {
            this.p_x = this.c_parentWidth - this.right - this.p_width;
          }
          if (!isNil(this.bottom)) {
            this.p_y = this.c_parentHeight - this.bottom - this.p_height;
          }
        }
        this.p_show = val;
      },
      immediate: true
    }
  },
  computed: {
    c_show: {
      get() {
        return this.p_show;
      },
      set(val) {
        this.p_show = val;
        this.$emit("update:show", val);
      }
    },
    isExpanded() {
      return this.p_height > 50;
    },
    c_minWidth() {
      return this.minWidth;
    },
    c_minHeight() {
      return this.minHeigth;
    }
  },
  methods: {
    toggleExpanded() {
      this.p_height = !this.isExpanded ? this.height : 50;
    },
    onClose() {
      this.c_show = false;
    },
    onResize(newRect) {
      this.p_width = newRect.width;
      this.p_height = newRect.height;
    }
  }
};
</script>

<style scoped>
.grabbing {
  cursor: -webkit-grabbing;
  cursor: grabbing;
}
.draggable-popup-desktop {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.draggable-popup-desktop-heading {
  flex-grow: 0;
  contain: layout;
  display: block;
  max-width: 100%;
}
.draggable-popup-desktop-heading__content {
  align-items: center;
  display: flex;
  position: relative;
  z-index: 0;
  flex: 1 1 auto;
}
.draggable-popup-desktop-heading,
.draggable-popup-desktop-heading__content {
  height: 48px;
}
.draggable-popup-desktop-heading >>> .map-control-button {
  background-color: unset;
}
.draggable-popup-desktop-heading__title {
  font-size: 1.25rem;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
