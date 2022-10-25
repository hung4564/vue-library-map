<template>
  <component
    v-bind:is="currentComponent"
    :id="idPopup"
    ref="popup"
    v-bind="$attrs"
    class="draggable-popup"
    :show.sync="c_show"
    :zIndex="p_zIndex"
    v-on="$listeners"
  >
    <template #extra-btn>
      <slot name="extra-btn" />
    </template>
    <template #title>
      <slot name="title">
        <span :title="title">{{ title }} </span>
      </slot>
    </template>
    <div class="fill-height"> <slot /> </div>
  </component>
</template>

<script>
import { getUUIDv4 } from "@utils";
import asyncComponent from "@components/async";
export default {
  components: {
    DraggablePopupDesktop: () =>
      asyncComponent(import("./draggable-popup-desktop.vue"), {
        disableLoading: true
      }),
    DraggablePopupMobile: () =>
      asyncComponent(import("./draggable-popup-mobile.vue"), {
        disableLoading: true
      }),
    DraggableSidebar: () =>
      asyncComponent(import("./draggable-sidebar.vue"), {
        disableLoading: true
      })
  },
  props: {
    show: Boolean,
    title: {
      type: String,
      default: ""
    }
  },
  inject: {
    registerPopup: { default: () => {} },
    registerPopupShow: { default: () => {} },
    unRegisterPopup: { default: () => {} },
    $isMobile: { default: () => false }
  },
  data: () => ({
    idPopup: "",
    p_zIndex: 0,
    p_show: false
  }),
  created() {
    this.idPopup = `popup-${getUUIDv4()}`;
    this.registerPopup(this.idPopup, {
      setIndex: this.onSetIndex.bind(this),
      getTitle: this.getTitle
    });
  },
  beforeDestroy() {
    this.unRegisterPopup(this.idPopup);
  },
  watch: {
    show: {
      handler(val) {
        this.c_show = val;
      },
      immediate: true
    }
  },
  computed: {
    isMobile() {
      return this.$isMobile();
    },
    c_show: {
      get() {
        return this.p_show;
      },
      set(val) {
        this.p_show = val;
        this.$emit("update:show", val);
        if (!val && this.$listeners["close"]) {
          this.$emit("close", val);
        }
        this.registerPopupShow(this.idPopup, val);
      }
    },
    currentComponent() {
      return this.isMobile
        ? "draggable-popup-mobile"
        : "draggable-popup-desktop";
    }
  },
  methods: {
    getTitle() {
      return this.title;
    },
    onSetIndex(index) {
      this.p_zIndex = index;
    },
    onToPopup() {
      this.p_show = false;
      this.$nextTick(() => {
        this.p_show = true;
        this.registerPopupShow(this.idPopup, true);
      });
    }
  }
};
</script>

<style scoped>
.draggable-popup {
  pointer-events: all;
}
</style>
<style>
.drag-container .vdr.active:before {
  outline: none;
}
</style>
