<template>
  <div :class="{ 'mobile-sidebar': isMobile }">
    <side-bar
      :right="right"
      :show.sync="c_show"
      :class="{ 'full-height full-width': isMobile }"
      :style="{
        zIndex: p_zIndex
      }"
    >
      <v-card
        class="full-width full-height d-flex flex-column overflow-hidden"
        flat
        tile
      >
        <v-toolbar
          class="flex-grow-0"
          color="primary lighten-2 pr-3"
          dark
          dense
          flat
          height="52px"
          short
        >
          <v-toolbar-title :title="title">
            <slot name="title">{{ title }}</slot>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <slot name="extra-btn"></slot>
          <v-btn v-if="count > 1" icon small @click="onToBack()">
            <v-icon small>mdi-arrange-send-backward</v-icon>
          </v-btn>
          <v-btn icon small @click="onClose()">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="flex-grow-1 overflow-auto">
          <slot></slot>
        </div>
      </v-card>
    </side-bar>
  </div>
</template>

<script>
import SideBar from "@components/sidebar/map-sidebar.vue";
import { getUUIDv4 } from "@utils";
export default {
  components: { SideBar },
  props: {
    id: { type: String, requred: true },
    show: Boolean,
    title: {
      type: String,
      default: ""
    },
    right: Boolean,
    prefix: { type: String, default: "mapbox" }
  },
  inject: {
    registerSidebar: { default: () => {} },
    registerSidebarShow: { default: () => {} },
    unRegisterSidebar: { default: () => {} },
    setSidebarToBack: { default: () => {} }
  },
  data: () => ({
    id_sidebar: "",
    p_zIndex: 0,
    p_show: false,
    is_first: false,
    count: 0
  }),
  created() {
    this.id_sidebar = `popup-${getUUIDv4()}`;
    this.registerSidebar(this.id_sidebar, {
      setIndex: this.onSetIndex.bind(this),
      getTitle: this.getTitle,
      right: this.right
    });
  },
  beforeDestroy() {
    this.unRegisterSidebar(this.id_sidebar);
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
    c_show: {
      get() {
        return this.p_show;
      },
      set(val) {
        this.p_show = val;
        this.$emit("update:show", val);
        this.registerSidebarShow(this.id_sidebar, val);
      }
    }
  },
  methods: {
    onSetIndex(index, { is_first, count }) {
      this.p_zIndex = index;
      this.is_first = is_first;
      this.count = count;
    },
    getTitle() {
      return this.title;
    },
    onClose() {
      this.c_show = false;
    },
    onToBack() {
      this.setSidebarToBack(this.id_sidebar);
    }
  }
};
</script>

<style scoped></style>

<style scoped>
.mobile-sidebar {
  height: 50%;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
