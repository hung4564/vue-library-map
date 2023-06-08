<template>
  <div class="layer-item-container">
    <div class="layer-item__info">
      <div class="layer-item__icon">
        <div v-if="loading">
          <SvgIcon size="14" type="mdi" :path="path.loading" class="spin" />
        </div>
        <div v-else>
          <SvgIcon size="14" type="mdi" :path="path.layer" />
        </div>
      </div>
      <span
        class="layer-item__title"
        :title="item.name"
        @click="$emit('click', item)"
      >
        <span>{{ item.name }}</span>
      </span>
      <div class="layer-item__title-action">
        <div
          @click="onAction(menu)"
          v-for="(menu, i) in item.extra_buttons"
          :key="i"
          class="layer-item__button"
          :disabled="loading"
          v-bind="menu.attr"
        >
          <SvgIcon size="14" type="mdi" :path="menu.icon" />
        </div>
        <div
          class="layer-item__button"
          v-if="item.metadata.bounds"
          @click.stop="onToBounds"
          :disabled="loading"
        >
          <SvgIcon size="14" type="mdi" :path="path.flyTo" />
        </div>
        <div
          class="layer-item__button"
          v-if="!item.disable_delete"
          :disabled="loading"
          @click.stop="onRemove"
        >
          <SvgIcon size="14" type="mdi" :path="path.delete" />
        </div>
        <slot name="extra-btn" :loading="loading" />
      </div>
    </div>
    <div class="layer-item__action">
      <div class="layer-item__opacity">
        <LayerItemSlider
          v-model.number="opacity"
          max="1"
          step="0.01"
          :disabled="loading"
          v-if="!item.disabled_opacity"
        />
      </div>
      <div class="v-spacer"></div>
      <div class="layer-item__compare">
        <button :class="{ active: isShow[0] }" @click="toggleShow(0)">
          L
        </button>
        <button :class="{ active: isShow[1] }" @click="toggleShow(1)">
          R
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import SvgIcon from "@jamescoyle/vue-icon";
import {
  mdiCrosshairsGps,
  mdiDelete,
  mdiEye,
  mdiEyeOff,
  mdiLayers,
  mdiLoading
} from "@mdi/js";
import get from "lodash.get";
import set from "lodash.set";
import LayerItemSlider from "../layer-item-slider.vue";
export default {
  components: { SvgIcon, LayerItemSlider },
  props: {
    item: {
      require: true,
      type: Object,
      default: () => ({
        name: "",
        metadata: { loading: false, bounds: null },
        opacity: 1,
        show: true,
        menus: [],
        extra_buttons: [],
        disabled_opacity: false,
        disable_delete: false
      })
    },
    isSelected: Boolean
  },
  computed: {
    path() {
      return {
        loading: mdiLoading,
        layer: mdiLayers,
        flyTo: mdiCrosshairsGps,
        show: mdiEye,
        hide: mdiEyeOff,
        delete: mdiDelete
      };
    },
    loading() {
      return this.item.metadata && this.item.metadata.loading;
    },
    isShow() {
      return this.item.show;
    },
    keyOpactiy() {
      return "opacity";
    },
    opacity: {
      get() {
        return get(this.item, this.keyOpactiy, 1);
      },
      set(value) {
        let item = this.item;
        set(item, this.keyOpactiy, value);
        this.$emit("update:item", item);
      }
    }
  },
  methods: {
    toggleShow(index) {
      let item = this.item;
      item.show[index] = !item.show[index];
      this.$forceUpdate();
      this.$emit("update:item", item);
    },
    onToBounds() {
      this.$emit("click:bounds", this.item);
    },
    onRemove() {
      this.$emit("click:remove", this.item);
      if (this.item.close) {
        this.item.close();
      }
    },
    onAction(menu) {
      this.$emit("click:action", { menu, item: this.item });
    }
  }
};
</script>
<style scoped>
.spin {
  animation: 2s linear 0s infinite normal none running spin;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
.layer-item-container {
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.layer-item__info,
.layer-item__action {
  display: flex;
  align-items: center;
}
.layer-item__action {
  padding-top: 4px;
}
.layer-item__opacity {
  flex: 1 1 auto;
  max-width: 75%;
  padding-top: 4px;
}
.layer-item__icon {
  flex-grow: 0;
  flex-shrink: 0;
  width: 25px;
}
.layer-item__icon > div {
  display: flex;
  align-items: center;
  justify-content: center;
}
.layer-item__title {
  display: inline-block;
  text-align: left;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.75rem !important;
  font-weight: 400;
  line-height: 1.25rem;
  letter-spacing: 0.0333333333em !important;
}
.layer-item__button {
  display: inline-block;
  padding: 0 4px;
  cursor: pointer;
}
.layer-item__title-action {
  display: flex;
  flex-grow: 0;
  align-items: center;
}
.layer-item__title-action .layer-item__button {
  display: flex;
  align-items: center;
  justify-content: center;
}
.layer-item__button[disabled="disabled"] {
  cursor: default;
  pointer-events: none;
  opacity: 0.25;
}
.layer-item__compare {
  flex-grow: 0;
  flex-shrink: 0;
}
.layer-item__compare button {
  font-size: 0.625rem;
  background-color: transparent;
  height: 20px;
  min-width: 30px;
  padding: 0 8.8888888889px;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  justify-content: center;
  outline: 0;
  position: relative;
  text-decoration: none;
  text-indent: 0.0892857143em;
  font-weight: 500;
  letter-spacing: 0.0892857143em;
  align-items: center;
  border: none;
}
.layer-item__compare button.active {
  color: #fff;
  caret-color: #004e98;
  background: #004e9830;
}
.v-spacer {
  flex: 1 1 auto;
}
</style>
